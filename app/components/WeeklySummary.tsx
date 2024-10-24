// app/components/WeeklySummary.tsx
import { Card } from "@/components/ui/card";
import { ProcessedTradeData } from "../types";

interface WeeklySummaryProps {
  data: ProcessedTradeData;
}

export default function WeeklySummary({ data }: WeeklySummaryProps) {
  return (
    <Card className='p-4 w-full md:w-64'>
      <h2 className='text-xl font-semibold mb-4'>Weekly stats</h2>
      {data.weeklyData.map((week, index) => (
        <div key={index} className='mb-2'>
          <p className='font-medium'>Week {index + 1}</p>
          <p className={`text-lg font-bold ${week.profit > 0 ? "text-green-600" : "text-red-600"}`}>
            ${week.profit.toFixed(2)}
          </p>
          <p className='text-sm text-gray-600'>{week.days} days</p>
        </div>
      ))}
    </Card>
  );
}
