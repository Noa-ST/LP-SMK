'use client'

import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Heart } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6 col-span-1 md:col-span-2 lg:col-span-1">
            <Logo size="lg" align="start" className="origin-left" />
            <p className="text-slate-400 mt-4 leading-relaxed font-medium">
              Smart Kids Coffee & Playground - Nơi kết nối niềm vui gia đình. 
              Không gian cà phê hiện đại kết hợp khu vui chơi trẻ em an toàn, sáng tạo.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-playground-blue hover:text-white transition-all hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Liên kết</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-playground-blue transition-colors">Trang chủ</a></li>
              <li><a href="#about" className="hover:text-playground-blue transition-colors">Về chúng tôi</a></li>
              <li><a href="#menu" className="hover:text-playground-blue transition-colors">Thực đơn</a></li>
              <li><a href="#play" className="hover:text-playground-blue transition-colors">Khu vui chơi</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Liên hệ</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-playground-blue" size={20} />
                </div>
                <p className="text-sm leading-relaxed">
                  123 Đường Sáng Tạo, <br />
                  Phường Hạnh Phúc, Quận 1, TP.HCM
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="text-playground-pink" size={20} />
                </div>
                <p className="text-sm font-bold">090 123 4567</p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="text-playground-yellow" size={20} />
                </div>
                <p className="text-sm">hello@smartkids.vn</p>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
            <h4 className="text-white font-black text-lg mb-6 uppercase tracking-widest">Giờ mở cửa</h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Thứ 2 - Thứ 6</span>
                <span className="text-playground-blue font-bold">07:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Thứ 7 - Chủ Nhật</span>
                <span className="text-playground-pink font-bold">07:00 - 22:00</span>
              </div>
              <p className="text-xs text-slate-500 italic mt-4">
                * Có phục vụ các dịp Lễ Tết đặc biệt.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © 2024 <span className="font-bold text-slate-300">Smart Kids Coffee</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-playground-pink fill-playground-pink" />
            <span>for Happy Families</span>
          </div>
        </div>
      </div>

      {/* Decorative text */}
      <div className="absolute -bottom-20 right-0 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter uppercase leading-none">
        PLAYGROUND
      </div>
    </footer>
  );
};

export default Footer;
