'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Star, ArrowRight, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/landing/Logo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({ email: "", password: "" });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "" });

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');
    const full_name = formData.get('full_name');

    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phone, full_name }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
        if (result.error?.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: result.error }));
        } else {
          setErrors(prev => ({ ...prev, password: result.error }));
        }
      } else {
        if (isLogin) {
          if (result.session?.access_token && result.session?.refresh_token) {
            const supabase = createClient();
            await supabase.auth.setSession({
              access_token: result.session.access_token,
              refresh_token: result.session.refresh_token,
            });
            localStorage.setItem('user_role', result.user?.role || 'staff');
          }
          const userRole = result.user?.role || 'staff';
          toast.success(`Chào mừng trở lại! Đăng nhập với quyền ${userRole.toUpperCase()}.`);
          setTimeout(() => {
            window.location.href = userRole === 'admin' ? '/dashboard' : '/pos';
          }, 1500);
        } else {
          const assignedRole = result.role || 'staff';
          toast.success(`Đăng ký thành công với quyền ${assignedRole.toUpperCase()}! Bạn có thể đăng nhập ngay.`);
          setIsLogin(true);
        }
      }
    } catch (err) {
      toast.error("Không thể kết nối đến máy chủ API (Cổng 3000). Hãy kiểm tra lại backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-20 relative z-10 bg-white overflow-y-auto">
        <div className="lg:hidden absolute top-10 left-8">
          <Logo size="sm" align="start" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="mb-10">
            <Logo size="md" align="start" className="mb-8 hidden lg:flex" />
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {isLogin ? "Chào mừng trở lại! 👋" : "Gia nhập đội ngũ 🚀"}
            </h1>
            <p className="text-slate-500 font-medium">
              {isLogin
                ? "Vui lòng nhập thông tin để truy cập hệ thống POS."
                : "Tạo tài khoản mới để bắt đầu ca làm việc của bạn."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                Địa chỉ Email
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-playground-blue transition-colors">
                  <Mail size={18} />
                </div>
                <Input
                  id="email" name="email" type="email"
                  placeholder="name@smartkids.vn"
                  className={cn(
                    "h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl transition-all duration-200",
                    "focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue focus:bg-white outline-none",
                    errors.email && "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  )}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-bold mt-1 ml-1 block"
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-bold text-slate-700 ml-1">
                      Họ và Tên
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-playground-blue transition-colors">
                        <User size={18} />
                      </div>
                      <Input
                        id="full_name" name="full_name" type="text"
                        placeholder="Nguyễn Văn A"
                        className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue focus:bg-white outline-none transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">
                      Số điện thoại
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-playground-blue transition-colors">
                        <Phone size={18} />
                      </div>
                      <Input
                        id="phone" name="phone" type="tel"
                        placeholder="090 123 4567"
                        className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue focus:bg-white outline-none transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700">
                  Mật khẩu
                </Label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-playground-blue hover:text-blue-700 transition-colors">
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-playground-blue transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn(
                    "h-14 pl-12 pr-12 bg-slate-50 border-slate-200 rounded-2xl transition-all duration-200",
                    "focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue focus:bg-white outline-none",
                    errors.password && "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs font-bold mt-1 ml-1 block">{errors.password}</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-playground-blue hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? "Đăng nhập ngay" : "Tạo tài khoản"}
                  <ArrowRight size={20} />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button
                onClick={toggleAuthMode}
                className="text-playground-pink font-black hover:underline underline-offset-4 transition-all"
              >
                {isLogin ? "Đăng ký thành viên" : "Đăng nhập ngay"}
              </button>
            </p>
          </div>

          <div className="mt-auto pt-10 pb-8 text-center lg:text-left">
            <p className="text-xs text-slate-400 font-medium">
              © 2024 Smart Kids Coffee System. Version 2.0.1
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:w-[60%] relative bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/KhongGian/z7797207321049_e0a942061702e3d3af4cb39cf9de4607.jpg"
            alt="Smart Kids Playground"
            className="w-full h-full object-cover opacity-60 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-playground-yellow fill-playground-yellow" />
              ))}
              <span className="text-white/80 text-sm font-bold ml-2 uppercase tracking-widest">Hệ thống quản trị chuyên nghiệp</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-6 leading-tight">
              Chào mừng đến với <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-playground-pink to-playground-blue">
                ca làm việc của bạn!
              </span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-medium">
              Hãy mang đến nụ cười và những trải nghiệm tuyệt vời nhất cho các thiên thần nhỏ hôm nay nhé! ☕🎈
            </p>
            <div className="flex gap-10 mt-12">
              <div>
                <p className="text-white text-3xl font-black">100%</p>
                <p className="text-white/50 text-xs font-bold uppercase mt-1">An toàn vệ sinh</p>
              </div>
              <div>
                <p className="text-white text-3xl font-black">24/7</p>
                <p className="text-white/50 text-xs font-bold uppercase mt-1">Hỗ trợ kỹ thuật</p>
              </div>
              <div>
                <p className="text-white text-3xl font-black">Ready</p>
                <p className="text-white/50 text-xs font-bold uppercase mt-1">Trạng thái máy POS</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-10 right-10 z-20">
          <div className="glass-premium p-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-playground-pink/20 flex items-center justify-center text-playground-pink">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-white font-black text-sm">Smart Kids Premium</p>
              <p className="text-white/60 text-[10px] font-bold uppercase">Workstation Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
