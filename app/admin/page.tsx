'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ 
    products: 0, 
    orders: 0, 
    categories: 0,
    totalRevenue: 0,
    pendingOrders: 0 
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          fetch('/api/products').then(r => r.ok ? r.json() : { products: [] }),
          fetch('/api/admin/orders').then(r => r.ok ? r.json() : { orders: [] }),
          fetch('/api/categories').then(r => r.ok ? r.json() : []),
        ]);

        const products = productsRes.products?.length || 0;
        const orders = ordersRes.orders || [];
        const categories = Array.isArray(categoriesRes) ? categoriesRes.length : 0;
        
        const totalRevenue = orders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);
        const pendingOrders = orders.filter((order: Order) => 
          order.status === 'PENDING' || order.status === 'PROCESSING'
        ).length;

        setStats({
          products,
          orders: orders.length,
          categories,
          totalRevenue,
          pendingOrders,
        });

        // Get recent 5 orders
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default values on error
        setStats({
          products: 0,
          orders: 0,
          categories: 0,
          totalRevenue: 0,
          pendingOrders: 0,
        });
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-amber-100 text-amber-700 border border-amber-300',
      PROCESSING: 'bg-blue-100 text-blue-700 border border-blue-300',
      SHIPPED: 'bg-indigo-100 text-indigo-700 border border-indigo-300',
      DELIVERED: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
      CANCELLED: 'bg-red-100 text-red-700 border border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border border-gray-300';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-indigo-600 font-medium">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">{t('admin.welcome')}</h2>
        <p className="text-indigo-100 text-lg">{t('admin.manageStore')}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t('admin.products')}</h3>
              <p className="text-3xl font-bold text-indigo-600">{stats.products}</p>
            </div>
            <div className="bg-indigo-100 rounded-full p-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t('admin.orders')}</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.orders}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t('admin.totalRevenue')}</h3>
              <p className="text-3xl font-bold text-indigo-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="bg-indigo-100 rounded-full p-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t('admin.pendingOrders')}</h3>
              <p className="text-3xl font-bold text-amber-600">{stats.pendingOrders}</p>
            </div>
            <div className="bg-amber-100 rounded-full p-3">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{t('admin.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center p-5 border-2 border-indigo-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 hover:shadow-md"
          >
            <div className="bg-indigo-100 rounded-full p-3 ml-3 rtl:mr-3 rtl:ml-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{t('admin.addProduct')}</p>
              <p className="text-sm text-gray-500">{t('admin.addNewProduct')}</p>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center p-5 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
          >
            <div className="bg-blue-100 rounded-full p-3 ml-3 rtl:mr-3 rtl:ml-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{t('admin.viewOrders')}</p>
              <p className="text-sm text-gray-500">{t('admin.manageOrders')}</p>
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="flex items-center p-5 border-2 border-indigo-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 hover:shadow-md"
          >
            <div className="bg-indigo-100 rounded-full p-3 ml-3 rtl:mr-3 rtl:ml-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{t('admin.categories')}</p>
              <p className="text-sm text-gray-500">{t('admin.manageCategories')}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{t('admin.recentOrders')}</h2>
          <Link
            href="/admin/orders"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            {t('admin.viewAll')} ←
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('common.noItems')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">{t('admin.orderId')}</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">{t('admin.customer')}</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">{t('admin.date')}</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">{t('admin.status')}</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">{t('admin.total')}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 font-mono">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {order.user.name || order.user.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {t(`admin.${order.status.toLowerCase()}`)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-right font-semibold text-indigo-600">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

