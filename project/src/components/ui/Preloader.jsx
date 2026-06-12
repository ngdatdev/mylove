import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            document.body.style.overflow = 'auto';
          }, 1200); // Matches the exit animation duration
        }, 600); // Wait a beat at 100%
      }
      setProgress(current);
    }, 150);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF0F5]"
        >
          {/* Animated Heart SVG */}
          <div className="relative w-24 h-24 mb-6">
            <svg viewBox="0 0 50 50" className="w-full h-full stroke-[#8B5CF6] stroke-[1.5] fill-transparent">
              <motion.path
                d="M 25,15 C 25,15 20,5 10,5 C -2,5 0,22 25,45 C 50,22 52,5 40,5 C 30,5 25,15 25,15 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                d="M 25,15 C 25,15 20,5 10,5 C -2,5 0,22 25,45 C 50,22 52,5 40,5 C 30,5 25,15 25,15 Z"
                initial={{ fill: 'rgba(232,160,191,0)' }}
                animate={{ fill: progress === 100 ? 'rgba(232,160,191,0.5)' : 'rgba(232,160,191,0)' }}
                transition={{ duration: 0.5 }}
                className="stroke-none"
              />
            </svg>
          </div>
          
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              style={{ fontFamily: 'var(--font-display)' }}
              className="italic text-2xl text-purple-800 tracking-wider mb-2"
            >
              Gói ghém kỷ niệm...
            </motion.p>
          </div>
          
          <div className="font-mono text-xl text-purple-500 font-semibold w-16 text-center">
            {progress}%
          </div>
          
          {/* Progress bar line */}
          <div className="w-64 h-[2px] bg-purple-200 mt-6 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#E8A0BF] to-[#8B5CF6]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
