// app/page.tsx
import { Suspense } from "react";
import Header from "./components/Header";
import MonthlyCalendar from "./components/MonthlyCalendar";
import WeeklySummary from "./components/WeeklySummary";
import ChatButton from "./components/ChatButton";
import { fetchSheetData } from "./lib/fetchSheetData";
import { processTradeData } from "./lib/processTradeData";

export const metadata = {
  title: "Trading Dashboard",
  description: "View your trading performance and metrics",
};

export default async function Home() {
  const tradeData = await fetchSheetData();
  const processedData = processTradeData(tradeData);

  const headerData = {
    tradeWinPercentage: processedData.tradeWinPercentage,
    profitFactor: processedData.profitFactor,
    dayWinPercentage: processedData.dayWinPercentage,
  };

  return (
    <main className='container mx-auto p-4'>
      <Header data={headerData} />
      <div className='flex flex-col md:flex-row gap-4 mt-4'>
        <Suspense fallback={<div>Loading calendar...</div>}>
          <MonthlyCalendar data={processedData} />
        </Suspense>
        <Suspense fallback={<div>Loading summary...</div>}>
          <WeeklySummary data={processedData} />
        </Suspense>
      </div>
      <ChatButton />
    </main>
  );
}
