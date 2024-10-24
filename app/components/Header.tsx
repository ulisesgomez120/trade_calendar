// app/components/Header.tsx
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import MetricCard from "./MetricCard";

interface HeaderProps {
  data: {
    tradeWinPercentage: number;
    profitFactor: number;
    dayWinPercentage: number;
  };
}

export default function Header({ data }: HeaderProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <MetricCard
        title='Trade Win %'
        value={data.tradeWinPercentage}
        type='percentage'
        info={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className='h-4 w-4 ml-1' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of trades that result in a profit</p>
                <p>Formula: (Winning Trades / Total Trades) * 100</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      />
      <MetricCard
        title='Profit Factor'
        value={data.profitFactor}
        type='number'
        info={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className='h-4 w-4 ml-1' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ratio of gross profit to gross loss</p>
                <p>Formula: Gross Profit / Gross Loss</p>
                <p>A value greater than 1 indicates overall profitability</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      />
      <MetricCard
        title='Day Win %'
        value={data.dayWinPercentage}
        type='percentage'
        info={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className='h-4 w-4 ml-1' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of days with a net profit</p>
                <p>Formula: (Profitable Days / Total Trading Days) * 100</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      />
    </div>
  );
}
