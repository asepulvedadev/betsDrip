import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./providers/CartProvider";
import FreeShippingNotice from "@/components/FreeShippingNotice";
import Header from "@/components/Header";
import { nflVikings } from "./fonts";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BestDrip Uniformes Sublimados",
  description: "tienda virtual BestDrip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nflVikings.variable} antialiased`}
      >
        <CartProvider>
          {/* <FreeShippingNotice />
          <Header />
          {children}
          <Footer /> */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
