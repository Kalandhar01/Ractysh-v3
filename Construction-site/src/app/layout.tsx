import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ractysh Construction",
  description: "Project command, site execution, quality visibility, and handover control by Ractysh Construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, bebasNeue.variable)}>
      <body>{children}</body>
    </html>
  );
}
