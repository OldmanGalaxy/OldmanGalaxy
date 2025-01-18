import React from "react";
import Marquee from "react-fast-marquee";

interface MarqueeSectionProps {
  text: string;
  className?: string;
}

export default function MarqueeSection({
  text ,
  className = "py-8 h-max font-code font-bold text-3xl text-cyellow bg-cgray",
}: MarqueeSectionProps) {
  return (
    <div className={`marquee-container ${className}`}>
      <Marquee>{text} &nbsp;</Marquee>
    </div>
  );
}
