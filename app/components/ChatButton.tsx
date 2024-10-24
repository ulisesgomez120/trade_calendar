// app/components/ChatButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ChatButton() {
  return (
    <motion.div className='fixed bottom-4 right-4' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        onClick={() => console.log("Chat button clicked")}
        className='rounded-full w-12 h-12 bg-blue-500 text-white flex items-center justify-center'>
        <span className='sr-only'>Open chat</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
          />
        </svg>
      </Button>
    </motion.div>
  );
}
