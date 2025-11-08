'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description: string | null;
  descriptionAr: string | null;
  image: string | null;
  createdAt: string;
  _count: {
    products: number;
  };
}

export default function AdminCategoriesPage() {
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const getName = (category: Category) => {
    return language === 'ar' ? category.nameAr : category.name;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.categories') || 'Categories'}</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.categories') || 'Categories'}</h1>
        <div className="text-sm text-gray-600">
          {categories.length} {t('admin.totalCategories') || 'Total Categories'}
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
                  {t('admin.image') || 'Image'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.categoryName') || 'Name'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.slug') || 'Slug'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.products') || 'Products'}
                </th>
                <th className="px-6 py-4 text-right rtl:text-right text-sm font-semibold text-gray-900">
                  {t('admin.createdAt') || 'Created At'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {t('admin.noCategories') || 'No categories found'}
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {category.image ? (
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={category.image}
                            alt={getName(category)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{getName(category)}</div>
                      {category.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {language === 'ar' ? category.descriptionAr : category.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {category._count.products}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(category.createdAt)}
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

