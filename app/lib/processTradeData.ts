import { ProcessedTradeData, TradeData, DailyData, WeeklyData } from "../types";

export function processTradeData(trades: TradeData[]): ProcessedTradeData {
  // const trades: TradeData[] = rawData.slice(1).map((row) => ({
  //   id: row[0],
  //   stock: row[1],
  //   entryPrice: parseFloat(row[2]),
  //   exitPrice: parseFloat(row[3]),
  //   shares: parseInt(row[4]),
  //   pnl: parseFloat(row[9]),
  //   winLoss: parseInt(row[10]),
  //   closeDate: new Date(row[11]),
  //   openDate: new Date(row[12]),
  //   daysInTrade: parseInt(row[13]),
  // }));

  const dailyData: { [key: string]: DailyData } = {};
  const weeklyData: WeeklyData[] = [];

  trades.forEach((trade) => {
    const closeDate = new Date(trade.closeDate);
    const dateKey = closeDate.toISOString();
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = { profit: 0, trades: 0 };
    }
    dailyData[dateKey].profit += trade.pnl;
    dailyData[dateKey].trades += 1;

    const weekNumber = Math.floor((closeDate.getDate() - 1) / 7);
    if (!weeklyData[weekNumber]) {
      weeklyData[weekNumber] = { profit: 0, days: 0 };
    }
    weeklyData[weekNumber].profit += trade.pnl;
    weeklyData[weekNumber].days = Math.max(weeklyData[weekNumber].days, closeDate.getDate());
  });

  const winningTrades = trades.filter((trade) => trade.winLoss > 0);
  const tradeWinPercentage = (winningTrades.length / trades.length) * 100;

  const totalProfit = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalLoss = trades.reduce((sum, trade) => (trade.pnl < 0 ? sum + Math.abs(trade.pnl) : sum), 0);
  const profitFactor = totalProfit / totalLoss;

  const winningDays = Object.values(dailyData).filter((day) => day.profit > 0).length;
  const dayWinPercentage = (winningDays / Object.keys(dailyData).length) * 100;

  return {
    tradeWinPercentage,
    profitFactor,
    dayWinPercentage,
    dailyData,
    weeklyData,
  };
}
