'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  _count: {
    orders: number;
  };
}

export default function AdminUsersPage() {
  const { t, language } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    const formatted = new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    // Replace Arabic-Indic numerals with English numerals
    return formatted.replace(/[٠-٩]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 1632 + 48);
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.users') || 'Users'}</h1>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.users') || 'Users'}</h1>
        <div className="text-sm text-gray-600">
          {users.length} {t('admin.totalUsers') || 'Total Users'}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.userName') || 'Name'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.email') || 'Email'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.role') || 'Role'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.orders') || 'Orders'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.memberSince') || 'Member Since'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {t('admin.noUsers') || 'No users found'}
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.name || (
                        <span className="text-gray-400 italic">{t('admin.noName') || 'No name'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user._count.orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

