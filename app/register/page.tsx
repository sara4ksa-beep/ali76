'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-50 to-green-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
          {t('auth.registerTitle')}
        </h1>
        <RegisterForm />
        <p className="mt-4 text-center text-gray-600">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link href="/login" className="text-green-600 hover:underline font-semibold">
            {t('common.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}


