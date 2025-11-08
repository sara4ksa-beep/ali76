'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  stock: number;
  featured: boolean;
  category: {
    name: string;
  };
}

export function AdminProductsList() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
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

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{t('admin.noProductsFound')}</p>
        <Link
          href="/admin/products/new"
          className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {t('admin.createYourFirstProduct')}
        </Link>
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
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.name')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.priceLabel')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.stockLabel')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.categoryLabel')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.featuredLabel')}</th>
              <th className="text-right p-5 font-semibold text-gray-700">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-5 font-medium text-gray-800">{product.nameAr}</td>
                <td className="p-5 text-indigo-600 font-semibold text-lg">${product.price.toFixed(2)}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 0 ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-5 text-gray-600">{product.category.name}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.featured ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}>
                    {product.featured ? t('admin.yes') : t('admin.no')}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex gap-3">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors text-sm shadow-md hover:shadow-lg"
                      >
                        {t('common.edit')}
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm shadow-md hover:shadow-lg"
                    >
                      {t('common.delete')}
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}


