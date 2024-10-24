// app/components/MetricCard.tsx
"use client"; // Add this line at the top of the file

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number;
  type: "percentage" | "number";
}

export default function MetricCard({ title, value, type }: MetricCardProps) {
  const formattedValue = type === "percentage" ? `${value.toFixed(2)}%` : value.toFixed(2);
  const progressValue = type === "percentage" ? value : (value / 5) * 100; // Adjust for non-percentage values

  return (
    <Card className='p-4'>
      <h2 className='text-lg font-semibold mb-2'>{title}</h2>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Progress value={progressValue} className='w-full h-2 mb-2' />
      </motion.div>
      <p className='text-2xl font-bold'>{formattedValue}</p>
    </Card>
  );
}
