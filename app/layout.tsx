import type { Metadata } from "next";
import { Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon"
});

export const metadata: Metadata = {
  title: "LUMEN | Capture Reality",
  description: "A premium cinematic experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pinyon.variable} font-sans bg-[#050505] antialiased`}>
        {children}
      </body>
    </html>
  );
}
