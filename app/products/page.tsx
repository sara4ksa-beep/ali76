'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProductsList } from '@/components/products/ProductsList';

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">
          {t('products.title')}
        </h1>
        <ProductsList />
      </div>
    </div>
  );
}


