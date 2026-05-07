import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Kids Coffee & Playground",
  description: "Nơi kết nối niềm vui gia đình. Không gian cà phê hiện đại kết hợp khu vui chơi trẻ em an toàn, sáng tạo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
