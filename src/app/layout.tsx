import "../styles/globals.css";
import Header from "@/components/layout/Header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-gray-900 bg-gray-50">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}