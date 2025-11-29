'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { CartContent } from '@/components/cart/CartContent';

export default function CartPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-orange-900 mb-8 text-center">
          {t('cart.title')}
        </h1>
        <CartContent />
      </div>
    </div>
  );
}


