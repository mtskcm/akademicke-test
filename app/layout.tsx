import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skúškové testy · PdF Prešov",
  description:
    "Interaktívne testy pre prípravu na skúšky — akademické písanie, problémové správanie a ďalšie.",
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
