'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Hide navigation and footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Navigation />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return (
    <>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

