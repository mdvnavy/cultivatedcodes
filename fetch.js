import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTrending } from './lib/trending.js';
import { getGems } from './lib/gems.js';
import { getPAA } from './lib/paa.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function saveJSON(name, data) {
  const filePath = path.join(__dirname, 'data', `${name}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved ${name}.json`);
}

async function main() {
  try {
    console.log('Fetching data...');
    const [trending, gems, paa] = await Promise.all([
      getTrending(),
      getGems(),
      getPAA()
    ]);

    console.log('Saving data files...');
    await Promise.all([
      saveJSON('trending', trending),
      saveJSON('gems', gems),
      saveJSON('paa', paa)
    ]);

    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
