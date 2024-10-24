// app/lib/processTradeData.ts
import { ProcessedTradeData, TradeData, DailyData, WeeklyData, MonthlyData } from "../types";

export function processTradeData(rawData: TradeData[]): ProcessedTradeData {
  const dailyData: { [key: string]: DailyData } = {};
  const monthlyData: { [key: string]: MonthlyData } = {};

  rawData.forEach((trade) => {
    const closeDate = new Date(trade.closeDate);
    let dateKey = closeDate.toISOString().split("T")[0];
    // In processTradeData function
    dateKey = `${closeDate.getFullYear()}-${String(closeDate.getMonth() + 1).padStart(2, "0")}-${String(
      closeDate.getDate()
    ).padStart(2, "0")}`;
    const monthKey = `${closeDate.getFullYear()}-${String(closeDate.getMonth() + 1).padStart(2, "0")}`;

    // Process daily data
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = { profit: 0, trades: 0 };
    }
    dailyData[dateKey].profit += trade.pnl;
    dailyData[dateKey].trades += 1;

    // Process monthly data
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { profit: 0, trades: 0, weeklyData: [] };
    }
    monthlyData[monthKey].profit += trade.pnl;
    monthlyData[monthKey].trades += 1;

    // Process weekly data within each month
    const weekNumber = Math.floor((closeDate.getDate() - 1) / 7);
    if (!monthlyData[monthKey].weeklyData[weekNumber]) {
      monthlyData[monthKey].weeklyData[weekNumber] = { profit: 0, trades: 0 };
    }
    monthlyData[monthKey].weeklyData[weekNumber].profit += trade.pnl;
    monthlyData[monthKey].weeklyData[weekNumber].trades += 1;
  });

  const winningTrades = rawData.filter((trade) => trade.winLoss > 0);
  const tradeWinPercentage = (winningTrades.length / rawData.length) * 100;

  const totalProfit = rawData.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalLoss = rawData.reduce((sum, trade) => (trade.pnl < 0 ? sum + Math.abs(trade.pnl) : sum), 0);
  const profitFactor = totalProfit / totalLoss;

  const winningDays = Object.values(dailyData).filter((day) => day.profit > 0).length;
  const dayWinPercentage = (winningDays / Object.keys(dailyData).length) * 100;

  return {
    tradeWinPercentage,
    profitFactor,
    dayWinPercentage,
    dailyData,
    monthlyData,
  };
}
