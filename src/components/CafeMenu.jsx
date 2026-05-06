import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Coffee, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CafeMenu = () => {
  const menuItems = [
    {
      name: "Cà Phê Kem Muối",
      price: "35.000đ",
      desc: "Vị đắng nhẹ của cà phê hòa quyện cùng lớp kem mặn béo ngậy.",
      image: "/assets/menu_salted_cream.png",
      tag: "Best Seller",
      tagColor: "bg-rose-500"
    },
    {
      name: "Trà Gừng Cam Quế",
      price: "32.000đ",
      desc: "Thức uống ấm nóng, tăng cường đề kháng cho cả gia đình.",
      image: "/assets/menu_ginger_tea.png",
      tag: "Healthy",
      tagColor: "bg-emerald-500"
    },
    {
      name: "Spaghetti Bò Bằm",
      price: "45.000đ",
      desc: "Sợi mì dai ngon cùng sốt bò bầm đậm đà, món khoái khẩu của bé.",
      image: "/assets/menu_spaghetti.png",
      tag: "For Kids",
      tagColor: "bg-blue-500"
    },
    {
      name: "Trà Chanh Trân Châu",
      price: "28.000đ",
      desc: "Giải nhiệt cực đã với trân châu dai giòn sần sật.",
      image: "/assets/menu_lemon_tea.png"
    }
  ];

  return (
    <section id="menu" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="bg-playground-yellow hover:bg-playground-yellow text-primary px-4 py-1 mb-6">
            Thưởng thức tinh hoa
          </Badge>
          <h2 className="text-4xl md:text-6xl text-primary font-black uppercase tracking-tight">Thực Đơn <span className="text-playground-pink italic font-light">Smart Kids</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] border-2 border-primary/10 overflow-hidden shadow-xl shadow-black/5 flex flex-col h-full"
            >
              <div className="aspect-[4/5] relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {item.tag && (
                  <Badge className={cn("absolute top-5 left-5 text-white border-none px-4 py-1", item.tagColor)}>
                    {item.tag}
                  </Badge>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-primary leading-tight">{item.name}</h3>
                  <span className="text-lg font-black text-playground-blue">{item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                <Button className="w-full bg-white border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all rounded-xl h-12 flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  Thêm vào đơn
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CafeMenu;
