import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Ticket, Sparkles, MapPin, Car, Wind, ShieldCheck, Mountain, Briefcase, RotateCw, Play, Rocket, Smile, Ghost } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const KidsPlayground = () => {
  const allServices = [
    { name: "Mô hình giao thông", desc: "Bé làm quen với luật lệ & phương tiện", icon: Car },
    { name: "Sàn nhún lò xo", desc: "Giải tỏa năng lượng, phát triển chiều cao", icon: Wind },
    { name: "Khu vực mạo hiểm", desc: "Thử thách lòng dũng cảm cho bé", icon: ShieldCheck },
    { name: "Khu vực núi", desc: "Chinh phục đỉnh cao an toàn", icon: Mountain },
    { name: "Góc hướng nghiệp", desc: "Ươm mầm ước mơ nghề nghiệp tương lai", icon: Briefcase },
    { name: "Vòng quay ngựa gỗ", desc: "Ký ức tuổi thơ kỳ diệu", icon: RotateCw },
    { name: "Hồ hạt & Hồ cá", desc: "Khám phá thế giới tự nhiên sống động", icon: Play },
    { name: "Ống trượt siêu tốc", desc: "Cảm giác mạnh đầy phấn khích", icon: Rocket },
    { name: "Nhà bóng khổng lồ", desc: "Đại dương bóng đa sắc màu", icon: Smile },
    { name: "Phao khô mạo hiểm", desc: "Trải nghiệm trượt phao độc đáo", icon: Ghost }
  ];

  const khongGianImages = [
    { src: "/assets/KhongGian/z7797206704935_8934267ffab0a7dd5ca1812cd4a3868f.jpg", alt: "Toàn cảnh khu vui chơi hiện đại" },
    { src: "/assets/KhongGian/z7797207321049_e0a942061702e3d3af4cb39cf9de4607.jpg", alt: "Hệ thống ống trượt & nhà bóng" },
    { src: "/assets/KhongGian/z7797207331509_3e7a4cd36b66d2f98cc0ef8b6ce4c015.jpg", alt: "Khu vực vận động mạo hiểm" },
    { src: "/assets/KhongGian/z7797206693514_98f9b4ed7ca82d93b3b7112b2e2e54e1.jpg", alt: "Góc hướng nghiệp & sáng tạo" },
    { src: "/assets/KhongGian/z7797207317691_7a8a3b8af4448338094384902d4d6729.jpg", alt: "Khu vực sàn nhún & phao khô" }
  ];

  const experienceImages = [
    "/assets/TraiNghiem/z7797264479315_723ea9d0207074da049173134c3e4369.jpg",
    "/assets/TraiNghiem/z7797265656269_447c43832174ac888bf5cdabfa0dd2fc.jpg",
    "/assets/TraiNghiem/z7797266415445_563ffb834699ab9781a8f543b3c2d76b.jpg",
    "/assets/TraiNghiem/z7797266419078_7845f562ffc091b56525453e57e73171.jpg",
    "/assets/TraiNghiem/z7797267026231_a3c8b58de91db57cc3bc39a6df779e57.jpg",
    "/assets/TraiNghiem/z7797268132991_493bb4a29a08a40ed67e35519ab876a9.jpg",
    "/assets/TraiNghiem/z7797268329458_ab4eb5531ae4d729b6675e2045e63eb2.jpg",
    "/assets/TraiNghiem/z7797268869118_dba94c9458ac3175fe4be91a5d3870e5.jpg",
    "/assets/TraiNghiem/z7797268964793_68b90fe52648a7d6a19f47f23ce1adea.jpg",
    "/assets/TraiNghiem/z7797273445446_7e64eedd0e3baf2c3e8e10cbf08e7151.jpg"
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <section id="play" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-48 md:w-64 h-48 md:h-64 bg-playground-blue/5 rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>
            
            <div className="block-card p-1.5 md:p-2 rounded-[1.5rem] md:rounded-[2.5rem] bg-white relative z-10">
              <div className="rounded-[1.3rem] md:rounded-[2.2rem] overflow-hidden border-[3px] md:border-[4px] border-primary shadow-[8px_8px_0px_#0f172a] md:shadow-[15px_15px_0px_#0f172a]">
                <Carousel 
                  plugins={[plugin.current]}
                  className="w-full"
                >
                  <CarouselContent>
                    {khongGianImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-[4/3] relative group">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 glass-premium p-4 md:p-6 text-center">
                            <span className="font-bold text-xs md:text-base text-primary tracking-wide">{image.alt}</span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 md:left-6" />
                  <CarouselNext className="right-2 md:right-6" />
                </Carousel>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 glass-premium p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border-primary/5 hidden md:block animate-float-subtle">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="w-10 md:w-16 h-10 md:h-16 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 md:w-8 h-6 md:h-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-black text-primary">An toàn tuyệt đối</p>
                  <p className="text-[10px] md:text-sm text-muted-foreground">Khử khuẩn mỗi 4h & Giám sát</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-10 order-1 lg:order-2 text-center lg:text-left">
            <Badge className="bg-playground-pink hover:bg-playground-pink text-white px-5 py-1.5 mb-6 md:mb-8 rounded-full inline-flex items-center gap-2 w-fit">
              <Sparkles className="w-4 h-4" />
              Tổ hợp vui chơi lớn nhất khu vực
            </Badge>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-primary mb-6 md:mb-8 leading-[1.05] tracking-tight">
              Thế Giới <br />
              <span className="text-gradient-premium font-black">Vận Động</span> <br />
              Đa Trải Nghiệm
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
              {allServices.slice(0, 6).map((service, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-playground-blue/10 hover:border-playground-blue/30 transition-all uipro-card-soft group text-left">
                  <div className={cn(
                    "shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    i % 3 === 0 ? "bg-playground-blue/10 text-playground-blue" : 
                    i % 3 === 1 ? "bg-playground-pink/10 text-playground-pink" : 
                    "bg-playground-yellow/10 text-playground-yellow"
                  )}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-base md:text-lg text-[#0C4A6E] leading-tight">{service.name}</p>
                    {/* Tăng khoảng cách dòng (line-height) cho thiết bị di động */}
                    <p className="text-xs md:text-sm text-[#64748b] mt-1.5 leading-relaxed md:leading-normal">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="h-14 md:h-16 px-8 md:px-12 rounded-2xl bg-playground-blue text-white text-base md:text-lg font-bold shadow-xl hover:shadow-playground-blue/20 hover:scale-105 transition-all w-full sm:w-auto border-none">
              Khám phá toàn bộ 10+ khu vực
            </Button>
          </div>
        </div>

        {/* Experience Section - Infinite Scrolling Marquee */}
        <div className="mt-40 -mx-6 overflow-hidden">
          <div className="text-center mb-16 px-6">
            <h3 className="text-4xl md:text-5xl text-[#0C4A6E] font-black mb-4 uppercase tracking-tighter">
              Khoảnh khắc <span className="text-playground-pink italic font-light">Hạnh phúc</span>
            </h3>
            <p className="text-[#64748b] text-lg">Cùng Smart Kids lưu giữ những nụ cười rạng rỡ của bé và gia đình.</p>
          </div>

          <div className="relative flex overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div 
              className="flex gap-4 min-w-full"
              drag="x"
              dragElastic={0.1}
              animate={{ x: [0, "-100%"] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...experienceImages, ...experienceImages].map((src, i) => (
                <div 
                  key={i}
                  className="relative shrink-0 w-64 md:w-80 aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl"
                >
                  <img src={src} alt="Kids Experience" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pricing Card - Two Price Tiers Redesign */}
        <div className="mt-32 max-w-5xl mx-auto px-6">
          <div className="uipro-card-soft p-8 md:p-12 rounded-[3.5rem] border-none shadow-2xl relative overflow-hidden group bg-white">
            <Ticket className="absolute -right-10 -bottom-10 w-48 h-48 text-[#0C4A6E]/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            
            <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
              <div className="lg:col-span-2">
                <h4 className="text-3xl font-black text-[#0C4A6E] mb-6">Vé vui chơi trọn gói</h4>
                <p className="text-[#64748b] mb-8 text-lg leading-relaxed">
                  Bé thỏa sức trải nghiệm không giới hạn tất cả các trò chơi trong không gian máy lạnh mát mẻ, sạch sẽ và an toàn.
                </p>
                <ul className="space-y-4 mb-8">
                  {["Không giới hạn thời gian chơi", "Áp dụng cho tất cả khu vực", "Giảm 10% khi đặt tiệc sinh nhật"].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-sm text-[#0C4A6E]">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 py-3 px-4 bg-emerald-50 rounded-2xl border border-emerald-100 w-fit">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Khử khuẩn mỗi ngày</span>
                </div>
              </div>
              
              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                {/* Tier 1: Mon-Fri */}
                <div className="bg-[#0C4A6E] text-white p-8 rounded-[2.5rem] text-center shadow-xl hover:scale-[1.02] transition-transform">
                  <p className="text-playground-yellow font-bold uppercase tracking-widest text-[10px] mb-4">Thứ 2 - Thứ 6</p>
                  <div className="flex justify-center items-end gap-1 mb-4">
                    <span className="text-5xl font-black tracking-tighter">50K</span>
                    <span className="text-base mb-1 opacity-70">/ vé</span>
                  </div>
                  <div className="h-px bg-white/10 mb-4" />
                  <p className="text-[10px] opacity-80 leading-relaxed">
                    Ba mẹ miễn phí vé vào cổng <br />
                    Phục vụ trà đá miễn phí
                  </p>
                </div>

                {/* Tier 2: Sat-Sun & Holidays */}
                <div className="bg-playground-blue text-white p-8 rounded-[2.5rem] text-center shadow-xl hover:scale-[1.02] transition-transform">
                  <p className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">T7 - CN & Ngày Lễ</p>
                  <div className="flex justify-center items-end gap-1 mb-4">
                    <span className="text-5xl font-black tracking-tighter">70K</span>
                    <span className="text-base mb-1 opacity-70">/ vé</span>
                  </div>
                  <div className="h-px bg-white/10 mb-4" />
                  <p className="text-[10px] opacity-90 leading-relaxed">
                    Trọn gói tất cả trò chơi <br />
                    Không giới hạn thời gian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default KidsPlayground;
