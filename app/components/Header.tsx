// app/components/Header.tsx
import MetricCard from "./MetricCard";
import { ProcessedTradeData } from "../types";

interface HeaderProps {
  data: ProcessedTradeData;
}

export default function Header({ data }: HeaderProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <MetricCard title='Trade Win %' value={data.tradeWinPercentage} type='percentage' />
      <MetricCard title='Profit Factor' value={data.profitFactor} type='number' />
      <MetricCard title='Day Win %' value={data.dayWinPercentage} type='percentage' />
    </div>
  );
}
