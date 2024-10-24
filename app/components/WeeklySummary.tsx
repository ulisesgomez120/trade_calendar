// app/components/WeeklySummary.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { ProcessedTradeData } from "../types";

interface WeeklySummaryProps {
  data: ProcessedTradeData;
  selectedDate: Date;
}

export default function WeeklySummary({ data, selectedDate }: WeeklySummaryProps) {
  const getWeeklySummary = () => {
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    let weeklySummary: { profit: number; trades: number }[] = [];
    let currentWeek = { profit: 0, trades: 0 };
    let currentWeekNumber = 0;

    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString();
      const dailyData = data.dailyData[dateKey];

      if (dailyData) {
        const weekNumber = Math.floor((d.getDate() - 1) / 7);

        if (weekNumber !== currentWeekNumber) {
          if (currentWeek.trades > 0) {
            weeklySummary.push({ ...currentWeek });
          }
          currentWeek = { profit: 0, trades: 0 };
          currentWeekNumber = weekNumber;
        }

        currentWeek.profit += dailyData.profit;
        currentWeek.trades += dailyData.trades;
      }
    }

    if (currentWeek.trades > 0) {
      weeklySummary.push(currentWeek);
    }

    return weeklySummary;
  };

  const weeklySummary = getWeeklySummary();

  return (
    <Card className='p-4 w-full md:w-64'>
      <h2 className='text-xl font-semibold mb-4'>Weekly stats</h2>
      {weeklySummary.map((week, index) => (
        <div key={index} className='mb-4'>
          <p className='font-medium'>Week {index + 1}</p>
          <p className={`text-lg font-bold ${week.profit > 0 ? "text-green-600" : "text-red-600"}`}>
            ${week.profit.toFixed(2)}
          </p>
          <p className='text-sm text-gray-600'>{week.trades} trades</p>
        </div>
      ))}
    </Card>
  );
}
