'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    nameAr: string;
    images: string[];
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string | null;
  createdAt: string;
  items: OrderItem[];
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  PROCESSING: 'bg-green-100 text-green-700',
  SHIPPED: 'bg-green-100 text-green-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  PENDING: 'profile.orderStatus.pending',
  PROCESSING: 'profile.orderStatus.processing',
  SHIPPED: 'profile.orderStatus.shipped',
  DELIVERED: 'profile.orderStatus.delivered',
  CANCELLED: 'profile.orderStatus.cancelled',
};

export default function ProfilePage() {
  const { language, t } = useLanguage();
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    fetchProfile();
    fetchOrders();
  }, [session, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditName(data.user.name || '');
        setEditEmail(data.user.email);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/user/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditing(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    // Use Gregorian calendar for both languages
    // 'ar-EG' uses Gregorian calendar with Arabic month names (not Hijri)
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    const formatted = new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    // Replace Arabic-Indic numerals (٠-٩) with English numerals (0-9)
    return formatted.replace(/[٠-٩]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 1632 + 48);
    });
  };

  const getName = (product: { name: string; nameAr: string }) => {
    return language === 'ar' ? product.nameAr : product.name;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="skeleton h-64 rounded-2xl" />
            <div className="skeleton h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-500 bg-clip-text text-transparent">
              {t('profile.title')}
            </h1>
            {!editing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-200"
              >
                {t('profile.edit')}
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t('profile.name')}
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder={t('profile.namePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t('profile.email')}
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder={t('profile.emailPlaceholder')}
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-200"
                  >
                    {saving ? t('common.loading') : t('common.save')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setEditing(false);
                      setEditName(user.name || '');
                      setEditEmail(user.email);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    {t('common.cancel')}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <p className="text-gray-500 text-sm mb-1">{t('profile.name')}</p>
                  <p className="text-2xl font-bold text-gray-800">{user.name || t('profile.noName')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">{t('profile.email')}</p>
                  <p className="text-2xl font-bold text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">{t('profile.memberSince')}</p>
                  <p className="text-xl font-semibold text-gray-700">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">{t('profile.role')}</p>
                  <p className="text-xl font-semibold text-green-600 uppercase">{user.role}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('profile.orderHistory')}</h2>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-600 text-lg mb-2">{t('profile.noOrders')}</p>
              <p className="text-gray-500 text-sm mb-6">{t('profile.noOrdersDescription')}</p>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-200 transition-all"
                >
                  {t('profile.startShopping')}
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('profile.orderId')}</p>
                      <p className="font-mono text-lg font-bold text-gray-800">{order.id.slice(0, 8)}...</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                      <p className="text-sm text-gray-500 mb-1">{t('profile.orderDate')}</p>
                      <p className="text-lg font-semibold text-gray-700">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                      <p className="text-sm text-gray-500 mb-1">{t('profile.orderTotal')}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${
                          statusColors[order.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {t(statusLabels[order.status] || 'profile.orderStatus.unknown')}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-green-100 pt-4 mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">{t('profile.orderItems')}</p>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{getName(item.product)}</p>
                            <p className="text-sm text-gray-600">
                              {t('common.quantity')}: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold text-green-600">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-green-100 pt-4 mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t('profile.shippingAddress')}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress}, {order.shippingCity}, {order.shippingCountry}
                      {order.shippingPostalCode && ` ${order.shippingPostalCode}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

