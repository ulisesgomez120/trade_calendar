// app/components/WeeklySummary.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { WeeklyData } from "../types";

interface WeeklySummaryProps {
  data: WeeklyData[];
}

export default function WeeklySummary({ data }: WeeklySummaryProps) {
  return (
    <Card className='p-4 w-full lg:w-64'>
      <h2 className='text-xl font-semibold mb-4'>Weekly stats</h2>
      {data.map((week, index) => (
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
