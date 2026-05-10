import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akademický test",
  description:
    "Interaktívny test z akademického písania bakalárskej práce — 100 otázok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={inter.className}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
