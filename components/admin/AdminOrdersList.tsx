'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    email: string;
  };
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export function AdminOrdersList() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.orderId')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.customer')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.total')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.status')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.date')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-5 font-mono text-sm text-gray-600">{order.id.slice(0, 8)}...</td>
                <td className="p-5 text-gray-700">{order.user.email}</td>
                <td className="p-5 text-indigo-600 font-bold text-lg">${order.total.toFixed(2)}</td>
                <td className="p-5">
                  <motion.select
                    whileFocus={{ scale: 1.05 }}
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className={`px-4 py-2 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-semibold ${
                      statusColors[order.status] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <option value="PENDING">{t('admin.pending')}</option>
                    <option value="PROCESSING">{t('admin.processing')}</option>
                    <option value="SHIPPED">{t('admin.shipped')}</option>
                    <option value="DELIVERED">{t('admin.delivered')}</option>
                    <option value="CANCELLED">{t('admin.cancelled')}</option>
                  </motion.select>
                </td>
                <td className="p-5 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-5">
                  <Link href={`/admin/orders/${order.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      {t('common.view')}
                    </motion.button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}


