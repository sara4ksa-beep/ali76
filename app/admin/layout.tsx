'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, language, setLanguage } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Auto-open sidebar on desktop, closed on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force Arabic in admin panel
  useEffect(() => {
    if (language !== 'ar') {
      setLanguage('ar');
    }
  }, [language, setLanguage]);

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    
    if (!session) {
      router.push('/login');
      return;
    }
    
    if ((session.user as any)?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-indigo-600 font-medium">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated or not admin, show nothing (redirect is happening)
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center">
            <p className="text-indigo-600 font-medium">{t('admin.redirecting')}</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: t('admin.dashboard'), icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { href: '/admin/products', label: t('admin.products'), icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )},
    { href: '/admin/orders', label: t('admin.orders'), icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
    { href: '/admin/categories', label: t('admin.categories'), icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    )},
    { href: '/admin/users', label: t('admin.users') || 'Users', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-white flex" dir="rtl">
      {/* Right Sidebar */}
      <aside className={`fixed right-0 top-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 z-50 ${
        sidebarOpen 
          ? 'w-[280px] translate-x-0' 
          : 'w-20 -translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className={`mb-4 ${sidebarOpen ? 'px-4 py-3' : 'px-2 py-2'} bg-gray-50 rounded-xl`}>
              {sidebarOpen ? (
                <>
                  <p className="text-gray-900 text-sm font-medium mb-1 truncate">
                    {session.user?.name || session.user?.email}
                  </p>
                  <p className="text-gray-600 text-xs truncate">{session.user?.email}</p>
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-sm">
                    {(session.user?.name || session.user?.email || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Link
                href="/"
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors ${
                  !sidebarOpen && 'justify-center'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {sidebarOpen && <span className="text-sm font-medium">{t('admin.viewSite')}</span>}
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors ${
                  !sidebarOpen && 'justify-center'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {sidebarOpen && <span className="text-sm font-medium">{t('admin.logout')}</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-[280px] mr-0' : 'lg:mr-20 mr-0'}`}>
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 lg:hidden z-50 bg-white text-gray-700 p-4 rounded-full shadow-2xl border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  );
}

