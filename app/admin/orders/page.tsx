'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { AdminOrdersList } from '@/components/admin/AdminOrdersList';

export default function AdminOrdersPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('admin.orders')}</h2>
        <p className="text-gray-600">إدارة طلباتك</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <AdminOrdersList />
      </div>
    </div>
  );
}


