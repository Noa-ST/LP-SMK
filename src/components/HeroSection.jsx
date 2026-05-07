import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Coffee, PlayCircle, Star, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { motion } from "framer-motion";

const HeroSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const heroImages = [
    { src: "/assets/premium_coffee.png", tag: "Specialty Coffee" },
    { src: "/assets/TraiNghiem/z7797268132991_493bb4a29a08a40ed67e35519ab876a9.jpg", tag: "Happy Kids" },
    { src: "/assets/KhongGian/z7797207321049_e0a942061702e3d3af4cb39cf9de4607.jpg", tag: "Modern Space" },
    { src: "/assets/menu_salted_cream.png", tag: "Salted Cream Coffee" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              rotate: 0
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 15, 0],
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="text-playground-blue w-8 h-8 fill-playground-blue" />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Badge className="bg-white/80 backdrop-blur-sm text-playground-blue border-playground-blue/10 px-4 py-1 mb-8 shadow-sm uipro-pill">
              <Star className="w-4 h-4 mr-2 text-playground-yellow fill-playground-yellow" />
              SMART KIDS COFFEE & PLAYGROUND
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0C4A6E] mb-8 leading-[0.95] tracking-tight">
              Nơi Gắn Kết <br /> 
              <span className="text-playground-pink italic font-light">Cả</span> <span className="text-playground-blue">Gia Đình</span>
            </h1>
            
            <p className="text-xl text-[#475569] mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Trải nghiệm không gian cà phê tinh tế tại <span className="font-bold text-playground-blue">Smart Kids Coffee</span> dành cho người lớn, 
              trong khi các bé thỏa sức khám phá khu vui chơi hiện đại, an toàn ngay bên cạnh.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              {/* Nút chính (CTA) - Màu nền nổi bật */}
              <Button className="h-16 px-10 rounded-2xl bg-playground-blue text-white text-lg font-bold shadow-xl hover:shadow-playground-blue/20 hover:scale-105 transition-all group border-none">
                Khám phá Menu
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* Nút phụ - Outline/Nhạt */}
              <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-playground-blue/30 text-playground-blue text-lg font-bold bg-white/50 backdrop-blur-sm hover:bg-playground-blue/5 transition-all flex items-center gap-2">
                <PlayCircle className="w-6 h-6" />
                Xem Khu Vui Chơi
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-playground-blue/10">
              {[
                { label: "Cà phê", value: "Hạng A", Icon: Coffee },
                { label: "Vui chơi", value: "An Toàn", Icon: PlayCircle },
                { label: "Dịch vụ", value: "5 Sao", Icon: Heart }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-playground-blue/5 flex items-center justify-center text-playground-blue group-hover:scale-110 transition-transform">
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-lg font-black text-[#0C4A6E] leading-none">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Split Layout modern image display */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Image 1: Cafe Space (Main focus) */}
              <div className="col-span-8 relative group">
                <div className="absolute inset-0 bg-playground-blue/10 rounded-[2.5rem] rotate-3 transition-transform group-hover:rotate-1"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white shadow-2xl uipro-card-soft">
                  <Carousel 
                    plugins={[plugin.current]}
                    className="w-full"
                  >
                    <CarouselContent className="ml-0">
                      {heroImages.map((image, index) => (
                        <CarouselItem key={index} className="pl-0">
                          <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <img 
                              src={image.src} 
                              alt={image.tag} 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute top-6 left-6 glass-premium px-4 py-2 rounded-xl uipro-pill">
                              <p className="text-[10px] font-bold text-playground-blue uppercase tracking-widest">{image.tag}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
              
              {/* Column 2: Playground & Status */}
              <div className="col-span-4 flex flex-col gap-4">
                {/* Image 2: Playground focus */}
                <div className="relative group overflow-hidden rounded-[2rem] uipro-card-soft border-2 border-white shadow-xl aspect-square">
                  <img 
                    src="/assets/KhongGian/z7797207317691_7a8a3b8af4448338094384902d4d6729.jpg" 
                    alt="Safe Playground" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest">Khu vui chơi</p>
                  </div>
                </div>

                {/* Decorative Visual Card - Soft UI style */}
                <div className="uipro-card-soft p-6 flex flex-col justify-center items-center text-center bg-white/80 backdrop-blur-sm flex-grow">
                  <div className="w-12 h-12 rounded-2xl bg-playground-yellow/20 flex items-center justify-center mb-4 animate-bounce">
                    <Coffee className="w-6 h-6 text-playground-yellow" />
                  </div>
                  <p className="font-bold text-[#0C4A6E] leading-tight">Góc Thư Giãn</p>
                  <p className="text-[10px] text-[#64748b] mt-2 uppercase tracking-widest font-bold">Dành cho Ba Mẹ</p>
                </div>
              </div>
            </div>

            {/* Floating Live Status - Soft UI style */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-playground-blue/10 hidden xl:block animate-float-subtle">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0C4A6E]">Giám sát Camera 24/7</p>
                  <p className="text-[10px] text-[#64748b]">Yên tâm thưởng thức cà phê</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative background text */}
      <div className="absolute -bottom-10 left-10 text-[12vw] font-black text-playground-blue/5 pointer-events-none select-none tracking-tighter uppercase leading-none">
        Smart Kids
      </div>
    </section>
  );
};

export default HeroSection;
