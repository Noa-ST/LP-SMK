import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Coffee, Menu, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Thực đơn', href: '#menu' },
    { name: 'Khu vui chơi', href: '#play' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-3 md:py-4",
        isScrolled ? "py-2 md:py-3" : "py-3 md:py-6"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-500",
          isScrolled 
            ? "glass-premium border-primary/5 px-4 md:px-6 shadow-lg" 
            : "bg-transparent px-0"
        )}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <a href="#" className="flex items-center group">
            <Logo size="md" className="group-hover:scale-105 transition-transform" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink 
                      href={link.href}
                      className={cn(
                        "px-4 py-2 text-sm font-bold transition-colors hover:text-accent rounded-lg",
                        isScrolled ? "text-primary" : "text-primary"
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-bold text-primary hover:bg-primary/5 rounded-xl">
              Đăng nhập
            </Button>
            <Button className="bg-primary text-white font-bold px-6 py-2 rounded-xl shadow-xl hover:scale-105 transition-transform">
              Xem Menu
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
        <div 
          className={cn(
            "absolute right-0 top-0 bottom-0 w-[80%] bg-white p-10 transition-transform duration-500 shadow-2xl",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col gap-8">
            <div className="flex justify-start mb-10">
              <Logo size="lg" />
            </div>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-3xl font-black text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-10 flex flex-col gap-4">
              <Button className="w-full h-14 bg-primary text-white font-bold text-lg rounded-2xl">
                Xem Menu
              </Button>
              <Button variant="outline" className="w-full h-14 border-2 border-primary text-primary font-bold text-lg rounded-2xl">
                Liên hệ ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
