'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/products', label: t('common.products') },
    { href: '/cart', label: t('common.cart') },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const getUserDisplayName = () => {
    if (!session?.user) return '';
    return session.user.name || session.user.email?.split('@')[0] || 'User';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass sticky top-0 z-50 border-b border-rose-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/misoonalogo.png"
                alt="Misoona Logo"
                width={180}
                height={60}
                className="h-16 w-auto object-contain"
                priority
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'ميسونا' : 'Misoona'}
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="relative text-gray-700 hover:text-rose-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-rose-50"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {session ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="relative"
                ref={dropdownRef}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold text-sm">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium hidden lg:block">
                    {getUserDisplayName()}
                  </span>
                  <motion.svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: userDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-56 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-rose-100">
                          <p className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-500 mt-1">{session.user.email}</p>
                        </div>
                        
                        <Link
                          href="/favorites"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="font-medium">{t('favorites.title')}</span>
                        </Link>

                        <div className="border-t border-rose-100 my-1" />
                        
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium">{t('common.profile')}</span>
                        </Link>

                        {(session.user as any)?.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{t('common.admin')}</span>
                          </Link>
                        )}

                        <div className="border-t border-rose-100 my-1" />
                        
                        <button
                          onClick={() => {
                            signOut();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="font-medium">{t('common.logout')}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link href="/login" className="text-gray-700 hover:text-rose-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-rose-50">
                  {t('common.login')}
                </Link>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-rose-50/50 p-1 rounded-xl"
            >
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'en'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'ar'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-white'
                }`}
              >
                AR
              </button>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-rose-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                {session && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-2 border-t border-rose-100"
                  >
                    <div className="px-4 py-3 mb-2">
                      <p className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500 mt-1">{session.user.email}</p>
                    </div>
                    <Link
                      href="/favorites"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{t('favorites.title')}</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                    >
                      {t('common.profile')}
                    </Link>
                    {(session.user as any)?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                      >
                        {t('common.admin')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                    >
                      {t('common.logout')}
                    </button>
                  </motion.div>
                )}
                {!session && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-2 border-t border-rose-100"
                  >
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                    >
                      {t('common.login')}
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
