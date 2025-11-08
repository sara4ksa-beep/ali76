'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ProductDetail } from '@/components/products/ProductDetail';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <ProductDetail productId={params.id} />
      </div>
    </div>
  );
}


