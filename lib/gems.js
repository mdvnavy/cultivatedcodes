import fetch from 'node-fetch';

export async function getGems() {
  // Use YouTube trending videos RSS feed for unique ideas
  const response = await fetch('https://www.youtube.com/feeds/videos.xml?chart=mostPopular&regionCode=US');
  const xml = await response.text();
  // Simple XML parsing for demo purposes
  const matches = [...xml.matchAll(/<title>([^<]+)<\/title>/g)].slice(1, 6);
  return matches.map((m, i) => ({
    kw: m[1],
    smv: Math.floor(Math.random() * 1000) + 100,
    vids: Math.floor(Math.random() * 10) + 1,
    av: Math.floor(Math.random() * 500) + 50
  }));
}
