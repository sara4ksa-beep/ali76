'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { CartContent } from '@/components/cart/CartContent';

export default function CartPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-rose-900 mb-8 text-center">
          {t('cart.title')}
        </h1>
        <CartContent />
      </div>
    </div>
  );
}


