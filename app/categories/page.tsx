'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string | null;
  descriptionAr: string | null;
  image: string | null;
  slug: string;
  _count: {
    products: number;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function CategoriesPage() {
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getName = (category: Category) => {
    return language === 'ar' ? category.nameAr : category.name;
  };

  const getDescription = (category: Category) => {
    return language === 'ar' ? category.descriptionAr : category.description;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-orange-900 mb-12 text-center"
        >
          {t('categories.title')}
        </motion.h1>

        {categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-600 text-lg"
          >
            {t('categories.noCategories')}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/products?category=${category.id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group cursor-pointer h-full flex flex-col"
                  >
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-100 relative overflow-hidden">
                      {category.image ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full relative"
                        >
                          <Image
                            src={category.image}
                            alt={getName(category)}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                        {getName(category)}
                      </h3>
                      {getDescription(category) && (
                        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                          {getDescription(category)}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-orange-100">
                        <span className="text-sm text-gray-500">
                          {category._count.products} {t('categories.products')}
                        </span>
                        <motion.span
                          whileHover={{ x: language === 'ar' ? -5 : 5 }}
                          className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors flex items-center gap-1"
                        >
                          {t('categories.viewProducts')}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

