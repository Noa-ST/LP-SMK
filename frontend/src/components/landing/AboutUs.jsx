'use client'

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Coffee, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutUs = () => {
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

  // Nhân đôi mảng ảnh để tạo hiệu ứng cuộn vô tận mượt mà
  const doubleImages = [...experienceImages, ...experienceImages];

  const features = [
    {
      title: "Cà Phê Nguyên Bản",
      desc: "Hạt cà phê tuyển chọn, rang xay tại chỗ mang lại hương vị đậm đà khó quên.",
      icon: Coffee,
      color: "bg-playground-yellow/10 text-playground-yellow"
    },
    {
      title: "Khu Vui Chơi An Toàn",
      desc: "Trang thiết bị hiện đại, được khử khuẩn định kỳ, đảm bảo an toàn tuyệt đối cho bé.",
      icon: ShieldCheck,
      color: "bg-playground-blue/10 text-playground-blue"
    },
    {
      title: "Gắn Kết Gia Đình",
      desc: "Không gian lý tưởng để cả nhà cùng tận hưởng những giây phút hạnh phúc bên nhau.",
      icon: Heart,
      color: "bg-playground-pink/10 text-playground-pink"
    },
    {
      title: "Dịch Vụ Tận Tâm",
      desc: "Đội ngũ nhân viên nhiệt tình, chu đáo luôn sẵn sàng hỗ trợ quý khách.",
      icon: Sparkles,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Content */}
          <div className="flex flex-col">
            <Badge className="w-fit bg-playground-pink/10 text-playground-pink border-none px-4 py-1 mb-6 uipro-pill">
              Về chúng tôi
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#0C4A6E] mb-8 leading-tight">
              Hơn cả một quán Cà phê, <br />
              đó là <span className="text-playground-blue">Hạnh phúc</span> của bé!
            </h2>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Smart Kids Coffee ra đời với mong muốn tạo ra một không gian giao thoa hoàn hảo. 
              Nơi Ba Mẹ có thể thư thả nhâm nhi tách cà phê thơm nồng, trong khi các bé được tự do bay bổng trí tưởng tượng.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", f.color)}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0C4A6E] mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured Image with Decoration */}
          <div className="relative group">
            <div className="absolute inset-0 bg-playground-blue/10 rounded-[3rem] rotate-3 transform scale-105"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl uipro-card-soft aspect-[4/3]"
            >
              <img 
                src="/assets/KhongGian/z7797206693514_98f9b4ed7ca82d93b3b7112b2e2e54e1.jpg" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Smart Kids Space"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Width Infinite Marquee - Trải nghiệm thực tế */}
      <div className="relative mt-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex overflow-hidden group">
          <motion.div 
            className="flex gap-6 py-4"
            animate={{
              x: [0, "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {doubleImages.map((src, i) => (
              <div 
                key={i} 
                className="w-[300px] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white flex-shrink-0"
              >
                <img 
                  src={src} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  alt={`Experience ${i}`} 
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm font-bold text-playground-blue uppercase tracking-[0.2em] animate-pulse">
            ✦ Trải nghiệm thực tế tại Smart Kids ✦
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
