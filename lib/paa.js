import fetch from 'node-fetch';

// Stub for getPAA
export async function getPAA() {
  // Use DuckDuckGo Instant Answer API for related questions
  const response = await fetch('https://api.duckduckgo.com/?q=ai+tools&format=json');
  const data = await response.json();
  // Use RelatedTopics as PAA
  return (data.RelatedTopics || []).slice(0, 5).map(item => ({
    question: item.Text || "No question",
    smv: Math.floor(Math.random() * 1000),
    vids: Math.floor(Math.random() * 10) + 1
  }));
}
