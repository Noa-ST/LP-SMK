import React from 'react';

// ====================================================================
// FloatingToysBackground.jsx
// Component nền động "Thế giới đồ chơi trẻ thơ" theo chuẩn Soft UI Evolution.
// - pointer-events-none + z-index âm: không cản trở nội dung bên trên.
// - Opacity 10–30%: trang trí, không làm rối mắt.
// - Mỗi icon có duration/delay riêng: chuyển động tự nhiên, không đồng bộ.
// ====================================================================

// --- SVG Icons thuần (không cần thư viện ngoài) ---
// Sử dụng SVG inline để kiểm soát hoàn toàn màu sắc pastel và kích thước.

const StarIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const RocketIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5s4.5 2 4.5 8.5c0 2.5-1 4.8-2.2 6.5L12 19l-2.3-1.5C8.5 15.8 7.5 13.5 7.5 11 7.5 4.5 12 2.5 12 2.5zM9 22l1.5-2h3L15 22H9z" />
    <circle cx="12" cy="11" r="2" fill="white" opacity="0.6" />
  </svg>
);

const CloudIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 9.5a4.5 4.5 0 0 0-8.78-.78A3.5 3.5 0 0 0 5 12h13a3 3 0 0 0 .5-2.5z" />
    <path d="M5.5 12A3.5 3.5 0 0 0 9 15.5h8a3 3 0 0 0 0-6H5.5z" />
  </svg>
);

const GamepadIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="15" cy="11" r="1" fill={color} />
    <circle cx="17" cy="13" r="1" fill={color} />
    <path d="M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
  </svg>
);

const CarIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11l1.5-4.5h11L19 11H5z" />
    <rect x="2" y="11" width="20" height="5" rx="2" />
    <circle cx="6.5" cy="17.5" r="1.5" fill="white" />
    <circle cx="17.5" cy="17.5" r="1.5" fill="white" />
    <path d="M2 13h1M21 13h1" stroke="white" strokeWidth="1" />
  </svg>
);

const BalloonIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="9" rx="6" ry="7.5" />
    <path d="M12 16.5c0 2 1 4.5 0 4.5s0-2.5 0-4.5z" strokeWidth="1" fill={color} />
    <ellipse cx="10" cy="7" rx="1.5" ry="2" fill="white" opacity="0.3" />
  </svg>
);

const HeartIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const DiamondIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 22 12 12 22 2 12" />
  </svg>
);

// --- Danh sách icon với cấu hình vị trí, hoạt ảnh và màu sắc ---
// Mỗi item có: id, icon, màu pastel, kích thước, vị trí, duration, delay, góc xoay max.
const TOYS_CONFIG = [
  {
    id: 'star-1',
    Icon: StarIcon,
    color: '#FBBF24', // Vàng đậm hơn
    size: 64,
    opacity: 0.5,
    style: { top: '8%', left: '4%' },
    duration: 6.5,
    delay: 0,
    rotateMax: 20,
  },
  {
    id: 'rocket-1',
    Icon: RocketIcon,
    color: '#F472B6', // Hồng đậm hơn
    size: 52,
    opacity: 0.45,
    style: { top: '15%', right: '6%' },
    duration: 8,
    delay: -2.5,
    rotateMax: -15,
  },
  {
    id: 'cloud-1',
    Icon: CloudIcon,
    color: '#7DD3FC', // Xanh dương rõ hơn
    size: 80,
    opacity: 0.55,
    style: { top: '35%', left: '1%' },
    duration: 10,
    delay: -1,
    rotateMax: 8,
  },
  {
    id: 'car-1',
    Icon: CarIcon,
    color: '#34D399', // Xanh lá rõ hơn
    size: 60,
    opacity: 0.45,
    style: { top: '55%', right: '3%' },
    duration: 7.5,
    delay: -3,
    rotateMax: -10,
  },
  {
    id: 'gamepad-1',
    Icon: GamepadIcon,
    color: '#818CF8', // Tím rõ hơn
    size: 56,
    opacity: 0.4,
    style: { bottom: '20%', left: '7%' },
    duration: 9,
    delay: -4.5,
    rotateMax: 12,
  },
  {
    id: 'balloon-1',
    Icon: BalloonIcon,
    color: '#FB7185', // Đỏ hồng rõ hơn
    size: 48,
    opacity: 0.5,
    style: { top: '72%', right: '10%' },
    duration: 6,
    delay: -1.8,
    rotateMax: -18,
  },
  {
    id: 'heart-1',
    Icon: HeartIcon,
    color: '#EC4899', // Hồng đậm
    size: 42,
    opacity: 0.4,
    style: { top: '25%', left: '45%' },
    duration: 11,
    delay: -6,
    rotateMax: 25,
  },
  {
    id: 'star-2',
    Icon: StarIcon,
    color: '#4ADE80', // Xanh lá sáng
    size: 36,
    opacity: 0.4,
    style: { bottom: '35%', right: '20%' },
    duration: 7,
    delay: -2,
    rotateMax: -20,
  },
  {
    id: 'diamond-1',
    Icon: DiamondIcon,
    color: '#F59E0B', // Cam vàng
    size: 32,
    opacity: 0.35,
    style: { top: '48%', left: '20%' },
    duration: 8.5,
    delay: -3.5,
    rotateMax: 30,
  },
  {
    id: 'cloud-2',
    Icon: CloudIcon,
    color: '#F472B6',
    size: 60,
    opacity: 0.35,
    style: { bottom: '10%', left: '35%' },
    duration: 12,
    delay: -7,
    rotateMax: -5,
  },
];

// --- Component chính ---
const FloatingToysBackground = () => {
  return (
    // Container: fixed để phủ toàn bộ viewport, pointer-events-none để không chặn click
    // z-index: 0 (nằm trên nền nhưng dưới các phần tử relative/z-10)
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {TOYS_CONFIG.map((toy) => (
        <div
          key={toy.id}
          className="absolute"
          style={{
            ...toy.style,
            width: toy.size,
            height: toy.size,
            opacity: toy.opacity,
            // Animation 1: Float (Dùng div cha)
            animation: `toys-float ${toy.duration}s ease-in-out ${toy.delay}s infinite alternate`,
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              // Animation 2: Rotate (Dùng div con để tránh conflict transform)
              animation: `toys-spin-${toy.id.includes('star') ? 'slow' : 'medium'} ${toy.duration * 1.5}s ease-in-out ${toy.delay}s infinite alternate`,
              '--rotate-max': `${toy.rotateMax}deg`,
            }}
          >
            <toy.Icon color={toy.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingToysBackground;
