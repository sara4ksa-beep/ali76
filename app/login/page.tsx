'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-xl md:text-2xl font-bold text-orange-900 mb-6 text-center">
          {t('auth.loginTitle')}
        </h1>
        <LoginForm />
        <p className="mt-4 text-center text-gray-600">
          {t('auth.dontHaveAccount')}{' '}
          <Link href="/register" className="text-orange-600 hover:underline font-semibold">
            {t('common.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}


