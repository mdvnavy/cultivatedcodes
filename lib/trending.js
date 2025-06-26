import googleTrends from 'google-trends-api';

// Stub for getTrending
export async function getTrending() {
  try {
    // Get daily trending searches in the US
    const results = await googleTrends.dailyTrends({ geo: 'US' });
    const data = JSON.parse(results).default.trendingSearchesDays[0].trendingSearches;
    const labels = data.map(item => item.title.query);
    const series = { "search interest": data.map(item => parseInt(item.formattedTraffic.replace(/[^0-9]/g, '')) || 0) };
    return { labels, series };
  } catch (err) {
    console.error('Google Trends API error or invalid response:', err);
    // Fallback demo data
    return {
      labels: ["Fallback 1", "Fallback 2", "Fallback 3"],
      series: { "search interest": [100, 200, 150] }
    };
  }
}
