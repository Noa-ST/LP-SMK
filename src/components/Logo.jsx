import React from 'react';
import { cn } from "@/lib/utils";

const Logo = ({ className, size = "md" }) => {
  const sizes = {
    sm: { container: "scale-[0.6] md:scale-75 origin-left", tag: "text-[7px]", main: "text-xl md:text-2xl" },
    md: { container: "scale-[0.7] md:scale-90 lg:scale-100", tag: "text-[8px] md:text-[10px]", main: "text-2xl md:text-3xl" },
    lg: { container: "scale-[0.8] md:scale-110 lg:scale-125", tag: "text-[9px] md:text-[12px]", main: "text-3xl md:text-4xl" }
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={cn("bubble-logo-container flex flex-col items-center", s.container, className)}>
      <div className="relative mb-0 flex justify-center w-full h-4">
        <span className={cn("bubble-tagline absolute whitespace-nowrap", s.tag)} style={{ transform: "translateY(2px)" }}>
          KHU VUI CHƠI TRẺ EM
        </span>
      </div>
      <div className="flex items-center gap-1.5 relative mt-1">
        <span className={cn("bubble-text-pink drop-shadow-md", s.main)}>SMART</span>
        <span className="text-pink-400 text-2xl mt-1">×</span>
        <span className={cn("bubble-text-blue drop-shadow-md", s.main)}>KIDS</span>
      </div>
    </div>
  );
};

export default Logo;
