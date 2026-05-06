import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Coffee, PlayCircle, Star } from "lucide-react";
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
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden mesh-gradient">
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
            <Star className="text-secondary w-8 h-8 fill-secondary" />
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
            <Badge className="bg-white/80 backdrop-blur-sm text-primary border-primary/10 px-4 py-1 mb-8 shadow-sm">
              <Star className="w-4 h-4 mr-2 text-playground-yellow fill-playground-yellow" />
              SMART KIDS COFFEE & PLAYGROUND
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-primary mb-8 leading-[0.95] tracking-tight">
              Nơi Gắn Kết <br /> 
              <span className="text-playground-pink italic font-light">Cả</span> <span className="text-playground-blue">Gia Đình</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Trải nghiệm không gian cà phê tinh tế tại <span className="font-bold text-primary">Smart Kids Coffee</span> dành cho người lớn, 
              trong khi các bé thỏa sức khám phá khu vui chơi hiện đại, an toàn ngay bên cạnh.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button className="h-16 px-10 rounded-2xl bg-primary text-white text-lg font-bold shadow-xl hover:scale-105 transition-all group">
                Khám phá Menu
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-primary text-primary text-lg font-bold glass-premium hover:bg-primary/5 transition-all flex items-center gap-2">
                <PlayCircle className="w-6 h-6" />
                Xem Khu Vui Chơi
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-primary/10">
              {[
                { label: "Cà phê", value: "Hạng A" },
                { label: "Vui chơi", value: "An Toàn" },
                { label: "Dịch vụ", value: "5 Sao" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Animated Image Stack */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Animated Carousel */}
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-3 transition-transform group-hover:rotate-1"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/50 shadow-2xl aspect-[4/3]">
                  <Carousel 
                    plugins={[plugin.current]}
                    className="w-full h-full"
                  >
                    <CarouselContent className="h-full ml-0">
                      {heroImages.map((image, index) => (
                        <CarouselItem key={index} className="pl-0 h-full">
                          <div className="relative h-full w-full">
                            <img 
                              src={image.src} 
                              alt={image.tag} 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute top-6 left-6 glass-premium px-4 py-2 rounded-xl animate-in fade-in slide-in-from-left-4 duration-500">
                              <p className="text-xs font-bold text-primary uppercase tracking-widest">{image.tag}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
              
              {/* Secondary Image - Playground */}
              <div className="relative group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl -rotate-3 transition-transform group-hover:rotate-0"></div>
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/50 shadow-xl aspect-square">
                  <img 
                    src="/assets/KhongGian/z7797207317691_7a8a3b8af4448338094384902d4d6729.jpg" 
                    alt="Safe Playground" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-xs font-bold uppercase">Play Area</p>
                  </div>
                </div>
              </div>

              {/* Decorative Visual Card */}
              <div className="glass-premium rounded-3xl p-6 flex flex-col justify-center items-center text-center border-primary/5 shadow-xl hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 animate-bounce">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <p className="font-bold text-primary leading-tight">Chill Zone</p>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest font-bold">Parents' Paradise</p>
              </div>
            </div>

            {/* Floating Live Status */}
            <div className="absolute -bottom-8 -left-8 glass-premium p-6 rounded-2xl shadow-2xl border-white/40 hidden xl:block animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Khu vui chơi hoạt động</p>
                  <p className="text-xs text-muted-foreground">Camera giám sát thời gian thực</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative background text */}
      <div className="absolute -bottom-10 left-10 text-[12vw] font-black text-primary/5 pointer-events-none select-none tracking-tighter uppercase leading-none">
        Smart Kids
      </div>
    </section>
  );
};

export default HeroSection;
