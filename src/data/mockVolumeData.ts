const generateMockData = (days: number, baseValue: number, volatility: number) => {
  const data = [];
  let currentValue = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some randomness to the value
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentValue = Math.max(0, currentValue * (1 + change));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue),
    });
  }

  return data;
};

export const mockVolumeData = {
  total: generateMockData(365, 5000000, 0.03),    // More stable, higher base
  monthly: generateMockData(30, 3000000, 0.05),   // Medium volatility
  daily: generateMockData(7, 1000000, 0.08),      // Higher volatility
};