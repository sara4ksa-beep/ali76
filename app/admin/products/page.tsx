'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AdminProductsList } from '@/components/admin/AdminProductsList';
import Link from 'next/link';

export default function AdminProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('admin.products')}</h2>
          <p className="text-gray-600">إدارة منتجاتك</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('admin.addProduct')}
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <AdminProductsList />
      </div>
    </div>
  );
}

