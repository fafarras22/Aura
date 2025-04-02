
export const getMockWaterData = (days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    data.push({
      timestamp: date.toISOString(),
      ph: 6.0 + Math.random() * 1,
      ec: 1.2 + Math.random() * 0.6,
      tds: 500 + Math.random() * 100,
      do: 6.0 + Math.random() * 1.5,
      level: 75 + Math.random() * 15,
      temperature: 22 + Math.random() * 3
    });
  }
  
  return data.reverse();
};
