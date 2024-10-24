// app/components/MetricCard.tsx
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number;
  type: "percentage" | "number";
  info: React.ReactNode;
}

export default function MetricCard({ title, value, type, info }: MetricCardProps) {
  const formattedValue = type === "percentage" ? `${value.toFixed(2)}%` : value.toFixed(2);
  const progressValue = type === "percentage" ? value : (value / 5) * 100; // Adjust for non-percentage values

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-2'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {info}
      </div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Progress value={progressValue} className='w-full h-2 mb-2' />
      </motion.div>
      <p className='text-2xl font-bold'>{formattedValue}</p>
    </Card>
  );
}
