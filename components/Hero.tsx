'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FloatingCircle = ({ className }: { className: string }) => {
  return (
    <motion.div
      className={`bg-yellow-400 rounded-full ${className}`}
      animate={{
        y: ["0%", "50%", "0%"],
      }}
      transition={{
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
    />
  );
};

const HeroSection = () => {
  const [repeatingTextCount, setRepeatingTextCount] = useState(7);

  useEffect(() => {
    const updateTextCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // lg
        setRepeatingTextCount(7);
      } else if (width >= 768) { // md
        setRepeatingTextCount(10);
      } else { // sm
        setRepeatingTextCount(20);
      }
    };

    updateTextCount();
    window.addEventListener('resize', updateTextCount);
    return () => window.removeEventListener('resize', updateTextCount);
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] bg-[#0a0f1c] overflow-hidden">
      {/* Background repeating text */}
      <div className="absolute inset-0 flex flex-col items-center 
                    px-4 md:px-8 lg:px-12
                    justify-start pt-0">
        {[...Array(repeatingTextCount)].map((_, index) => (
          <h2 
            key={index}
            className="text-[min(7vw,4rem)] md:text-[min(6vw,5rem)] lg:text-[min(5vw,6rem)] 
                       font-oswald text-white whitespace-nowrap tracking-wide
                       opacity-100 leading-tight"
          >
            HELLO, I'M PURV KABARIA
          </h2>
        ))}
      </div>

      {/* Floating circles with adjusted positions to prevent collisions */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingCircle className="absolute top-[5%] left-[5%] 
                                  w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20" />
        <FloatingCircle className="absolute top-[20%] right-[10%] 
                                  w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" />
        <FloatingCircle className="absolute bottom-[40%] left-[15%] 
                                  w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24" />
        <FloatingCircle className="absolute top-[60%] right-[20%] 
                                  w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18" />
        <FloatingCircle className="absolute bottom-[15%] right-[25%] 
                                  w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20" />
      </div>

      {/* Main content container */}
      <div className="relative h-full flex items-end md:items-end justify-center">
        <motion.div 
          className="relative w-[180%] h-[85%]
                     md:w-[500px] md:h-full lg:w-[600px]
                     -mx-[40%] md:mx-0" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/images/purv.png"
            alt="Purv Kabaria"
            fill
            className="object-contain object-bottom grayscale"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;