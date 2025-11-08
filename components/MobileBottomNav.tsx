'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';
import { useCart } from '@/hooks/useCart';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const { items } = useCart();
  
  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    {
      href: '/',
      label: t('common.home'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      badge: null,
    },
    {
      href: '/favorites',
      label: t('favorites.title'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      badge: null,
    },
    {
      href: '/cart',
      label: t('common.cart'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badge: cartCount,
    },
    {
      href: session ? '/profile' : '/login',
      label: session ? t('common.profile') : t('common.login'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-[0_-1px_2px_rgba(0,0,0,0.05)] z-50 md:hidden" dir="rtl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                isActive ? 'text-rose-600' : 'text-gray-700'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== null && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

