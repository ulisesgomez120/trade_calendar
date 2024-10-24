"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProcessedTradeData, DailyData } from "../types";
import WeeklySummary from "./WeeklySummary";

interface MonthlyCalendarProps {
  data: ProcessedTradeData;
}

export default function MonthlyCalendar({ data }: MonthlyCalendarProps) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const availableMonths = useMemo(() => {
    const months: Date[] = [];
    const dates = Object.keys(data.dailyData).map((key) => new Date(key));
    dates.sort((a, b) => a.getTime() - b.getTime());

    if (dates.length > 0) {
      let currentMonth = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      while (currentMonth <= lastMonth) {
        months.push(new Date(currentMonth));
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }
    }

    return months;
  }, [data.dailyData]);

  const canGoBack = selectedDate > availableMonths[0];
  const canGoForward = selectedDate < availableMonths[availableMonths.length - 1];

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDayClass = (day: number) => {
    const dateKey = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString();
    const dailyData = data.dailyData[dateKey];
    if (!dailyData) return "bg-gray-100";
    return dailyData.profit > 0 ? "bg-green-100" : "bg-red-100";
  };

  const formatProfit = (profit: number) => {
    return profit.toFixed(2);
  };

  const handleMonthChange = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    setSelectedDate(new Date(year, month));
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

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <Card className='p-4 flex-grow'>
        <div className='flex justify-between items-center mb-4'>
          <Button onClick={goToPreviousMonth} disabled={!canGoBack}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Select value={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}`} onValueChange={handleMonthChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue>{selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((date) => (
                <SelectItem
                  key={`${date.getFullYear()}-${date.getMonth()}`}
                  value={`${date.getFullYear()}-${date.getMonth()}`}>
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
        <div className='grid grid-cols-7 gap-1'>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className='text-center font-medium'>
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className='h-16'></div>
          ))}
          {calendarDays.map((day) => {
            const dateKey = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString();
            const dailyData = data.dailyData[dateKey];
            return (
              <div key={day} className={`h-16 flex flex-col items-center justify-start p-1 ${getDayClass(day)}`}>
                <span className='text-sm font-medium'>{day}</span>
                {dailyData && (
                  <span className={`text-xs ${dailyData.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                    ${formatProfit(dailyData.profit)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
      <WeeklySummary data={data} selectedDate={selectedDate} />
    </div>
  );
}
