import "../styles/globals.css";
import Header from "@/components/layout/Header";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-headline",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-body antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}