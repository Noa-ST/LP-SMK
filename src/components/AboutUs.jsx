import React from 'react';
import { Coffee, ShieldCheck, Stars } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutUs = () => {
  const features = [
    {
      title: "Cà phê chuẩn vị",
      desc: "Hạt cà phê rang xay nguyên chất, công thức kem muối độc bản từ chuyên gia.",
      icon: <Coffee className="w-8 h-8" />,
      color: "bg-primary text-secondary"
    },
    {
      title: "Vui chơi an toàn",
      desc: "Khu vực vui chơi được khử khuẩn mỗi ngày, có nhân viên giám sát 24/7.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "bg-playground-blue text-white"
    },
    {
      title: "Chủ đề Smart Kids",
      desc: "Không gian check-in đầy chất thơ với những đóa hồng và bầu trời đầy sao.",
      icon: <Stars className="w-8 h-8" />,
      color: "bg-accent text-white"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge variant="outline" className="border-primary text-primary px-4 py-1 mb-4">Câu chuyện của chúng tôi</Badge>
          <h2 className="text-4xl md:text-5xl text-primary mb-6">Sứ mệnh mang lại hạnh phúc</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            "Ba mẹ thảnh thơi nhâm nhi cà phê, con trẻ thỏa sức khám phá trong không gian an toàn và đầy cảm hứng."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <Card key={index} className="block-card group border-none shadow-none text-center sm:text-left">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 transform group-hover:rotate-6 transition-transform border-2 border-primary`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl text-primary font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 block-card p-8 md:p-16 bg-primary text-white flex flex-col lg:flex-row items-center gap-12 lg:gap-16 overflow-hidden relative border-none">
          {/* Background Illustration */}
          <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
             <Stars size={400} />
          </div>

          <div className="flex-1 relative z-10 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-secondary font-black leading-tight">Hơn cả một quán cà phê...</h2>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
              Chúng tôi hiểu rằng mỗi gia đình cần một không gian để gắn kết. Tại <strong className="text-secondary font-bold">Smart Kids Coffee</strong>, 
              mỗi góc nhỏ đều được thiết kế để khơi gợi trí tưởng tượng của trẻ và mang lại sự yên bình cho người lớn.
            </p>
            <div className="grid grid-cols-2 gap-8 text-left">
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="text-3xl md:text-5xl font-black text-secondary tracking-tighter">500m²</h4>
                <p className="text-[10px] md:text-xs opacity-70 uppercase tracking-widest mt-1">Tổng diện tích</p>
              </div>
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="text-3xl md:text-5xl font-black text-secondary tracking-tighter">20+</h4>
                <p className="text-[10px] md:text-xs opacity-70 uppercase tracking-widest mt-1">Khu vực giải trí</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-white/10 shadow-2xl">
              <img 
                src="/assets/KhongGian/z7797206693514_98f9b4ed7ca82d93b3b7112b2e2e54e1.jpg" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
