import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { SessionProvider } from '@/components/providers/SessionProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConditionalNavigation, ConditionalFooter } from '@/components/ConditionalNavigation';
import { Toaster } from 'react-hot-toast';
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
  title: "Ali76",
  description: "Ali76 - Beautiful e-commerce store with orange theme",
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
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#1f2937',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                },
                success: {
                  iconTheme: {
                    primary: '#ea580c',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
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
