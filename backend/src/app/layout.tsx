export const metadata = {
  title: 'Smart Kids API',
  description: 'Smart Kids Coffee API Server',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
