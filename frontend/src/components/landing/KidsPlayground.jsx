'use client'

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Car, Wind, ShieldCheck, Rocket, 
  Gamepad2, Sparkles, CheckCircle2, 
  Ticket, Calendar, Clock, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KidsPlayground = () => {
  const playgroundServices = [
    {
      title: "Đường Đua Siêu Tốc",
      desc: "Hệ thống xe chòi chân, xe đạp mini với đường đua vòng quanh khu vui chơi cực kỳ phấn khích.",
      icon: Car,
      color: "bg-orange-50 text-orange-500",
      delay: 0.1
    },
    {
      title: "Nhà Banh Khổng Lồ",
      desc: "Hàng ngàn quả bóng màu sắc kết hợp cầu trượt xoắn ốc giúp bé vận động linh hoạt.",
      icon: Wind,
      color: "bg-sky-50 text-sky-500",
      delay: 0.2
    },
    {
      title: "Khu Trò Chơi Trí Tuệ",
      desc: "Lắp ráp Lego, xếp hình khối gỗ và các trò chơi board game kích thích tư duy sáng tạo.",
      icon: Rocket,
      color: "bg-purple-50 text-purple-500",
      delay: 0.3
    },
    {
      title: "Thế Giới Công Nghệ",
      desc: "Khu vực game máy bay, đua xe mô phỏng và các trò chơi tương tác màn hình lớn hiện đại.",
      icon: Gamepad2,
      color: "bg-indigo-50 text-indigo-500",
      delay: 0.4
    }
  ];

  const safetyFeatures = [
    "Khử khuẩn đồ chơi bằng tia UV mỗi tối",
    "Sàn lót thảm xốp êm ái chống va đập",
    "Nhân viên giám sát trực tiếp tại khu vực",
    "Camera an ninh bao phủ toàn bộ không gian"
  ];

  return (
    <section id="play" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-playground-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-playground-pink/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 relative z-10">
          <Badge className="bg-playground-blue/10 text-playground-blue border-none px-6 py-2 mb-6 uipro-pill">
            Thiên đường của bé
          </Badge>
          <h2 className="text-4xl md:text-6xl text-[#0C4A6E] font-black uppercase tracking-tight text-center">
            Khu Vui Chơi <span className="text-playground-blue italic font-light">Thế Hệ Mới</span>
          </h2>
        </div>

        {/* Top Grid: Main Images & Safety */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden shadow-2xl uipro-card-soft aspect-[16/9]">
            <img 
              src="/assets/KhongGian/z7797207321049_e0a942061702e3d3af4cb39cf9de4607.jpg" 
              className="w-full h-full object-cover"
              alt="Playground Overview"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#0C4A6E]">An Toàn & Sạch Sẽ</h3>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
              Chúng tôi hiểu rằng an toàn là ưu tiên số một của Ba Mẹ. Smart Kids cam kết duy trì tiêu chuẩn vệ sinh khắt khe nhất mỗi ngày.
            </p>
            <div className="space-y-4">
              {safetyFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-bold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Grid: Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {playgroundServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay }}
              className="uipro-card-soft p-10 flex flex-col items-center text-center group bg-white border-2 border-transparent hover:border-playground-blue/10"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6", service.color)}>
                <service.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-[#0C4A6E] mb-4">{service.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section: Pricing - Redesigned with 2 tiers */}
        <div className="relative pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Badge className="bg-playground-pink text-white px-8 py-3 text-lg font-black uipro-pill shadow-xl animate-bounce">
              <Sparkles className="w-5 h-5 mr-2" />
              ƯU ĐÃI KHAI TRƯƠNG
            </Badge>
          </div>
          
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 grid md:grid-cols-2 lg:grid-cols-3">
            
            {/* Weekday Pricing */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center text-center group hover:bg-blue-50/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-[#0C4A6E] mb-2 uppercase tracking-wide">Thứ 2 - Thứ 6</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-playground-blue">50.000</span>
                <span className="text-xl font-bold text-playground-blue/60 underline">đ</span>
                <span className="text-slate-400 font-bold ml-2">/ vé</span>
              </div>
              <ul className="space-y-4 mb-10 text-left w-full">
                {['Không giới hạn thời gian', 'Tất cả các khu vực', 'Miễn phí 1 người lớn đi kèm'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20">
                MUA VÉ NGAY
              </Button>
            </div>

            {/* Weekend Pricing */}
            <div className="p-12 border-b md:border-b-0 lg:border-r border-slate-100 flex flex-col items-center text-center relative group hover:bg-playground-pink/5 transition-colors">
              <div className="absolute top-8 right-8">
                <Badge className="bg-playground-pink text-white uipro-pill px-3">Phổ biến</Badge>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-playground-pink flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-[#0C4A6E] mb-2 uppercase tracking-wide">T7 - CN & Lễ</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-playground-pink">70.000</span>
                <span className="text-xl font-bold text-playground-pink/60 underline">đ</span>
                <span className="text-slate-400 font-bold ml-2">/ vé</span>
              </div>
              <ul className="space-y-4 mb-10 text-left w-full">
                {['Không giới hạn thời gian', 'Tất cả các khu vực', 'Bao gồm 1 phần quà nhỏ cho bé'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-playground-pink text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-14 bg-playground-pink hover:bg-rose-600 text-white rounded-2xl font-black shadow-lg shadow-playground-pink/20">
                MUA VÉ NGAY
              </Button>
            </div>

            {/* Info Column */}
            <div className="p-12 flex flex-col justify-center bg-slate-900 text-white lg:col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <Ticket className="w-10 h-10 text-playground-yellow rotate-12" />
                <h4 className="text-2xl font-black leading-tight">Gói Thành Viên <br /> Smart Kids</h4>
              </div>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed font-medium">
                Đăng ký thẻ thành viên để nhận ưu đãi giảm giá 10% cho tất cả menu đồ uống và tích điểm đổi quà.
              </p>
              <div className="p-6 rounded-2xl bg-white/10 border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-4 h-4 text-playground-pink fill-playground-pink" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Cam kết chất lượng</span>
                </div>
                <p className="text-xs text-slate-300">Đồ chơi đạt chuẩn quốc tế, không chứa BPA, tuyệt đối an toàn cho trẻ em.</p>
              </div>
              <Button variant="outline" className="w-full h-14 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-2xl font-black transition-all">
                TÌM HIỂU THÊM
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsPlayground;
