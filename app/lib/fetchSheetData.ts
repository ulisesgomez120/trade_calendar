// app/lib/fetchSheetData.ts
interface TradeData {
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

const SHEET_DATA_URL = "https://func-test-87251814162.us-central1.run.app";

export async function fetchSheetData(): Promise<TradeData[]> {
  const response = await fetch(SHEET_DATA_URL);
  const data = await response.json();
  const headers = data.data[0];
  const tradeData = data.data
    .slice(1)
    .filter((row) => row[1] !== "" && row[11] !== "")
    .map((row: string[]) => {
      return {
        id: row[0],
        stock: row[1],
        entryPrice: parseFloat(row[2]),
        exitPrice: parseFloat(row[3]),
        shares: parseInt(row[4]),
        pnl: parseFloat(row[9]),
        winLoss: parseInt(row[10]),
        closeDate: row[11],
        openDate: row[12],
        daysInTrade: parseInt(row[13]),
      };
    });
  return tradeData;
}
