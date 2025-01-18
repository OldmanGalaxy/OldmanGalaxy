"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const container = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="show"
      variants={container}
      className="bg-cgray h-24">
      <div className="container mx-auto h-full px-6">
        <div className="hidden md:flex items-center justify-between h-full">
          <motion.div variants={item}>
            <button onClick={() => scrollToSection("hero")}>
              <Image
                src="/images/signature.png"
                alt="Signature"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </button>
          </motion.div>

          <motion.div
            className="flex items-center space-x-12 text-cyellow font-oswald uppercase text-xl"
            variants={container}>
            <motion.div variants={item}>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-cwhite duration-500">
                Contact Me
              </button>
            </motion.div>
            <motion.div variants={item}>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-cwhite duration-500">
                Projects
              </button>
            </motion.div>
            <motion.div variants={item}>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-cwhite duration-500">
                Home
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="md:hidden flex justify-center items-center h-full">
          <button onClick={() => scrollToSection("hero")}>
            <Image
              src="/images/signature.png"
              alt="Signature"
              width={48}
              height={48}
              className="cursor-pointer"
            />
          </button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
