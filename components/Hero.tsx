"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AnimatedCircle = ({
  className,
  delay,
}: {
  className: string;
  delay: number;
}) => {
  return (
    <motion.div
      className={`bg-yellow-400 rounded-full ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, 15, -15, 0],
        x: [0, -15, 15, 0],
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: delay,
        },
        opacity: {
          duration: 0.5,
          delay: delay,
        },
        y: {
          repeat: Infinity,
          duration: 8,
          ease: "linear",
          delay: delay,
        },
        x: {
          repeat: Infinity,
          duration: 8,
          ease: "linear",
          delay: delay,
        },
      }}
    />
  );
};

const HeroSection = () => {
  const [repeatingTextCount, setRepeatingTextCount] = useState(7);

  useEffect(() => {
    const updateTextCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setRepeatingTextCount(7);
      } else if (width >= 768) {
        setRepeatingTextCount(10);
      } else {
        setRepeatingTextCount(20);
      }
    };

    updateTextCount();
    window.addEventListener("resize", updateTextCount);
    return () => window.removeEventListener("resize", updateTextCount);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textItem = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div
      id="hero"
      className="relative h-[calc(100vh-96px)] bg-[#0a0f1c] overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute inset-0 flex flex-col items-center 
                    px-4 md:px-8 lg:px-12
                    justify-start pt-0">
        {[...Array(repeatingTextCount)].map((_, index) => (
          <motion.h2
            variants={textItem}
            key={index}
            className="text-[min(7vw,4rem)] md:text-[min(6vw,5rem)] lg:text-[min(5vw,6rem)] 
                       font-oswald text-white whitespace-nowrap tracking-wide
                       opacity-100 leading-tight">
            HELLO, I'M PURV KABARIA
          </motion.h2>
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <AnimatedCircle
          className="absolute top-[5%] left-[5%] 
                    w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20"
          delay={0.2}
        />
        <AnimatedCircle
          className="absolute top-[20%] right-[10%] 
                    w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
          delay={0.4}
        />
        <AnimatedCircle
          className="absolute bottom-[40%] left-[15%] 
                    w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"
          delay={0.6}
        />
        <AnimatedCircle
          className="absolute top-[60%] right-[20%] 
                    w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18"
          delay={0.8}
        />
        <AnimatedCircle
          className="absolute bottom-[15%] right-[25%] 
                    w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
          delay={1.0}
        />
      </div>

      <div className="relative h-full flex items-end md:items-end justify-center">
        <motion.div
          className="relative w-[180%] h-[85%]
                     md:w-[500px] md:h-full lg:w-[600px]
                     -mx-[40%] md:mx-0"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}>
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
