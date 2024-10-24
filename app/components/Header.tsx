// app/components/Header.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
import MetricCard from "./MetricCard";
import { ProcessedTradeData } from "../types";

interface HeaderProps {
  data: ProcessedTradeData;
}

export default function Header({ data }: HeaderProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <MetricCard
        title='Trade Win %'
        value={data.tradeWinPercentage}
        type='percentage'
        info={
          <Popover>
            <PopoverTrigger>
              <InfoIcon className='h-4 w-4 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <p className='font-semibold'>Trade Win Percentage</p>
              <p className='mt-2'>The percentage of trades that resulted in a profit.</p>
              <p className='mt-2'>Formula: (Number of Winning Trades / Total Number of Trades) * 100</p>
            </PopoverContent>
          </Popover>
        }
      />
      <MetricCard
        title='Profit Factor'
        value={data.profitFactor}
        type='number'
        info={
          <Popover>
            <PopoverTrigger>
              <InfoIcon className='h-4 w-4 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <p className='font-semibold'>Profit Factor</p>
              <p className='mt-2'>The ratio of gross profit to gross loss.</p>
              <p className='mt-2'>Formula: Total Gross Profit / Total Gross Loss</p>
              <p className='mt-2'>A value greater than 1 indicates overall profitability.</p>
            </PopoverContent>
          </Popover>
        }
      />
      <MetricCard
        title='Day Win %'
        value={data.dayWinPercentage}
        type='percentage'
        info={
          <Popover>
            <PopoverTrigger>
              <InfoIcon className='h-4 w-4 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <p className='font-semibold'>Day Win Percentage</p>
              <p className='mt-2'>The percentage of trading days that ended with a net profit.</p>
              <p className='mt-2'>Formula: (Number of Profitable Days / Total Number of Trading Days) * 100</p>
            </PopoverContent>
          </Popover>
        }
      />
    </div>
  );
}
