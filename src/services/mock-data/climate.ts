
export const getMockClimateData = (days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    data.push({
      timestamp: date.toISOString(),
      temperature: 25 + Math.random() * 5 - 2.5,
      humidity: 65 + Math.random() * 20 - 10,
      co2: 400 + Math.random() * 50,
      light: i % 24 < 12 ? 800 + Math.random() * 200 : 50 + Math.random() * 50
    });
  }
  
  return data.reverse();
};
