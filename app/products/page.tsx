'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProductsList } from '@/components/products/ProductsList';

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-orange-900 mb-8 text-center">
          {t('products.title')}
        </h1>
        <ProductsList />
      </div>
    </div>
  );
}


