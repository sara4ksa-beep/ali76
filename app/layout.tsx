import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { SessionProvider } from '@/components/providers/SessionProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConditionalNavigation, ConditionalFooter } from '@/components/ConditionalNavigation';
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  title: "السوق السعودي للمنتجات",
  description: "Saudi Products Market - Beautiful e-commerce store with orange theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${cairo.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProvider>
          <LanguageProvider>
            <ConditionalNavigation />
            <main className="flex-grow pb-16 md:pb-0">
              {children}
            </main>
            <ConditionalFooter />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
