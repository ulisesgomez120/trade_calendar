// app/components/MonthlyCalendar.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProcessedTradeData, DailyData, WeeklyData } from "../types";

interface MonthlyCalendarProps {
  data: ProcessedTradeData;
}

export default function MonthlyCalendar({ data }: MonthlyCalendarProps) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const availableMonths = useMemo(() => {
    return Object.keys(data.monthlyData)
      .map((key) => {
        const [year, month] = key.split("-").map(Number);
        return new Date(year, month - 1, 1);
      })
      .sort((a, b) => a.getTime() - b.getTime());
  }, [data.monthlyData]);

  const canGoBack = selectedDate > availableMonths[0];
  const canGoForward = selectedDate < availableMonths[availableMonths.length - 1];

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDayClass = (day: number) => {
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const dailyData = data.dailyData[dateKey];
    if (!dailyData) return "bg-gray-100";
    return dailyData.profit > 0 ? "bg-green-100" : "bg-red-100";
  };

  const formatProfit = (profit: number) => {
    return profit.toFixed(2);
  };

  const handleMonthChange = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const goToPreviousMonth = () => {
    if (canGoBack) {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    }
  };

  const goToNextMonth = () => {
    if (canGoForward) {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    }
  };

  const goToCurrentMonth = () => {
    setSelectedDate(currentDate);
  };

  const currentMonthKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}`;
  const currentMonthData = data.monthlyData[currentMonthKey] || { profit: 0, trades: 0, weeklyData: [] };

  const getWeekNumber = (day: number) => {
    return Math.floor((day + firstDayOfMonth - 1) / 7);
  };

  const weeklyData = currentMonthData.weeklyData;

  return (
    <Card className='p-4 flex-grow'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <Button onClick={goToPreviousMonth} disabled={!canGoBack}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Select value={currentMonthKey} onValueChange={handleMonthChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue>{selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((date) => (
                <SelectItem
                  key={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`}
                  value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`}>
                  {date.toLocaleString("default", { month: "long", year: "numeric" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={goToNextMonth} disabled={!canGoForward}>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button onClick={goToCurrentMonth}>Current Month</Button>
        </div>
        <div className='text-lg font-bold'>Monthly P/L: ${formatProfit(currentMonthData.profit)}</div>
      </div>
      <div className='grid grid-cols-8 gap-1'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Weekly"].map((day) => (
          <div key={day} className='text-center font-medium'>
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className='h-20'></div>
        ))}
        {calendarDays.map((day) => {
          const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          const dailyData = data.dailyData[dateKey];
          const weekNumber = getWeekNumber(day);
          return (
            <React.Fragment key={day}>
              <div className={`h-20 flex flex-col items-center justify-start p-1 ${getDayClass(day)}`}>
                <span className='text-sm font-medium'>{day}</span>
                {dailyData && (
                  <span className={`text-xs ${dailyData.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                    ${formatProfit(dailyData.profit)}
                  </span>
                )}
              </div>
              {(day + firstDayOfMonth) % 7 === 0 && (
                <div className='h-20 flex flex-col items-center justify-center bg-gray-200'>
                  <span className='text-sm font-medium'>Week {weekNumber + 1}</span>
                  {weeklyData[weekNumber] && (
                    <>
                      <span
                        className={`text-xs ${weeklyData[weekNumber].profit > 0 ? "text-green-600" : "text-red-600"}`}>
                        ${formatProfit(weeklyData[weekNumber].profit)}
                      </span>
                      <span className='text-xs'>{weeklyData[weekNumber].trades} trades</span>
                    </>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
        {/* Fill in any remaining cells in the last row */}
        {Array.from({ length: (8 - ((daysInMonth + firstDayOfMonth) % 8)) % 8 }).map((_, index) => (
          <div key={`end-empty-${index}`} className='h-20'></div>
        ))}
      </div>
    </Card>
  );
}
