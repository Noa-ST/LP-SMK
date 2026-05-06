import React from 'react';
import { Separator as ShadSeparator } from "@/components/ui/separator";
import { MessageCircle, Camera, Share2, MapPin, Phone, Mail, ExternalLink, Star } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white pt-16 md:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20">
          <div className="col-span-1 sm:col-span-2 text-center sm:text-left">
            <div className="mb-8 flex justify-center sm:justify-start">
              <Logo size="lg" className="!items-center sm:!items-start" />
            </div>
            <p className="text-slate-400 max-w-sm mx-auto sm:mx-0 mb-10 text-base md:text-lg leading-relaxed">
              Nơi nuôi dưỡng tâm hồn trẻ thơ và mang lại những phút giây thư giãn quý giá cho gia đình Việt.
            </p>
            <div className="flex justify-center sm:justify-start gap-5">
              {[MessageCircle, Camera, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-secondary">Liên hệ</h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: "07 Lê Duẩn, Quy Nhơn, Bình Định" },
                { Icon: Phone, text: "039 313 1415" },
                { Icon: Mail, text: "smartkids.quynhon@gmail.com" }
              ].map((item, i) => (
                <li key={i} className="flex items-start justify-center sm:justify-start gap-4 group">
                  <item.Icon className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span className="text-slate-400 group-hover:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-secondary">Giờ mở cửa</h4>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Thứ 2 - Thứ 6</p>
                <p className="text-xl font-black text-secondary tracking-tight">07:00 - 22:00</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                <p className="text-xs font-bold text-secondary/60 uppercase mb-1">Thứ 7 - CN</p>
                <p className="text-xl font-black text-secondary tracking-tight">06:30 - 22:30</p>
              </div>
            </div>
            <div className="mt-10">
              <a 
                href="https://maps.app.goo.gl/W56XqJiAX4XnBZGt5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-secondary hover:text-white transition-colors font-bold group"
              >
                Chỉ đường trên Google Maps
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <ShadSeparator className="bg-white/10 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">
            @2026 Smart Kids
          </p>
          <div className="flex gap-10 text-xs text-slate-500 uppercase tracking-widest font-black">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
