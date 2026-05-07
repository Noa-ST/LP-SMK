'use client'

import React from 'react';
import { 
  Heart, Star, Rocket, Car, Gamepad2, 
  Puzzle, Ghost, Zap, Moon, Sun, 
  Diamond, Cloud, Coffee, Music, Wind
} from "lucide-react";

/**
 * Cấu hình các "đồ chơi" bay lơ lửng.
 * - Icon: Component từ lucide-react
 * - Color: Màu sắc từ bảng màu vibrant-pastel
 * - Size: Kích thước pixel
 * - Animation: Loại hiệu ứng (slow/medium)
 */
const TOYS_CONFIG = [
  { Icon: Star, color: "#eab308", size: 24, top: "10%", left: "5%", rotate: 15, animation: "toys-spin-slow", delay: "0s" },
  { Icon: Heart, color: "#ec4899", size: 30, top: "15%", left: "85%", rotate: -20, animation: "toys-spin-medium", delay: "1.5s" },
  { Icon: Rocket, color: "#3b82f6", size: 36, top: "45%", left: "92%", rotate: 45, animation: "toys-spin-medium", delay: "0.5s" },
  { Icon: Car, color: "#f97316", size: 32, top: "75%", left: "3%", rotate: -10, animation: "toys-spin-slow", delay: "2s" },
  { Icon: Gamepad2, color: "#8b5cf6", size: 28, top: "85%", left: "75%", rotate: 25, animation: "toys-spin-medium", delay: "3s" },
  { Icon: Cloud, color: "#06b6d4", size: 40, top: "5%", left: "50%", rotate: 0, animation: "toys-spin-slow", delay: "4s" },
  { Icon: Ghost, color: "#a855f7", size: 26, top: "60%", left: "15%", rotate: 15, animation: "toys-spin-medium", delay: "1s" },
  { Icon: Diamond, color: "#2dd4bf", size: 22, top: "30%", left: "20%", rotate: 30, animation: "toys-spin-slow", delay: "2.5s" },
  { Icon: Zap, color: "#facc15", size: 24, top: "40%", left: "70%", rotate: -15, animation: "toys-spin-medium", delay: "0.2s" },
  { Icon: Moon, color: "#6366f1", size: 28, top: "90%", left: "25%", rotate: 10, animation: "toys-spin-slow", delay: "3.5s" },
  { Icon: Sun, color: "#fb923c", size: 34, top: "25%", left: "35%", rotate: -5, animation: "toys-spin-medium", delay: "5s" },
  { Icon: Puzzle, color: "#10b981", size: 26, top: "65%", left: "80%", rotate: 20, animation: "toys-spin-slow", delay: "0.8s" },
  { Icon: Coffee, color: "#78350f", size: 28, top: "2%", left: "15%", rotate: -10, animation: "toys-spin-medium", delay: "2.2s" },
  { Icon: Music, color: "#d946ef", size: 24, top: "55%", left: "45%", rotate: 15, animation: "toys-spin-slow", delay: "1.2s" },
  { Icon: Wind, color: "#94a3b8", size: 30, top: "82%", left: "40%", rotate: -25, animation: "toys-spin-medium", delay: "4.5s" },
];

const FloatingToysBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {TOYS_CONFIG.map((toy, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: toy.top,
            left: toy.left,
            // Sử dụng CSS Custom Property để truyền độ xoay tối đa vào Keyframes
            '--rotate-max': `${toy.rotate}deg`,
            animation: `toys-float 6s ease-in-out infinite alternate`,
            animationDelay: toy.delay,
          }}
        >
          {/* Div lồng nhau để tách biệt animation Float và Spin */}
          <div
            style={{
              animation: `${toy.animation} 8s ease-in-out infinite alternate`,
              animationDelay: toy.delay,
            }}
          >
            <toy.Icon 
              size={toy.size} 
              color={toy.color}
              // Tăng nhẹ opacity để các icon hiện đại hơn nhưng vẫn chìm dưới nền
              style={{ 
                opacity: 0.45,
                filter: `drop-shadow(0 4px 6px ${toy.color}44)` 
              }} 
            />
          </div>
        </div>
      ))}

      {/* Layer mờ nhẹ ở trên cùng để làm dịu các icon */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
    </div>
  );
};

export default FloatingToysBackground;
