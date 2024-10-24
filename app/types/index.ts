// app/types/index.ts

export interface DailyData {
  profit: number;
  trades: number;
}

export interface WeeklyData {
  profit: number;
  days: number;
}

export interface ProcessedTradeData {
  tradeWinPercentage: number;
  profitFactor: number;
  dayWinPercentage: number;
  dailyData: { [key: string]: DailyData };
  weeklyData: WeeklyData[];
}

export interface TradeData {
  id: string;
  stock: string;
  entryPrice: number;
  exitPrice: number;
  shares: number;
  pnl: number;
  winLoss: number;
  closeDate: string;
  openDate: string;
  daysInTrade: number;
}
