// fetch.js
import fs  from 'fs';
import { getTrending } from './lib/trends.js';
import { getGems }     from './lib/gems.js';
import { getPAA }      from './lib/paa.js';

(async()=>{
  try {
    // your implementations return:
    // getTrending() -> { labels: [...], series: { kw1:[..], kw2:[..], ... } }
    // getGems()     -> [ { kw, smv, vids, av }, … ]
    // getPAA()      -> [ { question, smv, vids }, … ]

    const [trending, gems, paa] = await Promise.all([
      getTrending(),
      getGems(),
      getPAA()
    ]);

    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync('data/trending.json', JSON.stringify(trending,null,2));
    fs.writeFileSync('data/gems.json',     JSON.stringify(gems,null,2));
    fs.writeFileSync('data/paa.json',      JSON.stringify(paa,null,2));
    console.log('🗄️  Data refreshed.');
  } catch (err) {
    console.error('❌ Error refreshing data:', err);
    process.exit(1);
  }
})();