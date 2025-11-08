'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">
          {t('checkout.title')}
        </h1>
        <CheckoutForm />
      </div>
    </div>
  );
}


