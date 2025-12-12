'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-24 md:py-32 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.1),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-500 bg-clip-text text-transparent mb-6"
          >
            {t('home.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-orange-700 mb-10 max-w-2xl mx-auto"
          >
            {t('home.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(22 163 74 / 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-orange-200 transition-all cursor-pointer"
              >
                {t('home.shopNow')}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* All Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-orange-900 mb-12 text-center"
          >
            {t('products.title') || 'All Products'}
          </motion.h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton h-96 rounded-2xl" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  custom={index}
                >
                  <Link href={`/products/${product.id}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-100 relative overflow-hidden">
                        {product.images[0] ? (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full relative"
                          >
                            <Image
                              src={product.images[0]}
                              alt={language === 'ar' ? product.nameAr : product.name}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6 text-center">
                        <p className="font-bold text-[16px] md:text-[17px] mb-1 text-gray-800 group-hover:text-rose-600 transition-colors line-clamp-2 leading-tight">
                          {language === 'ar' ? product.nameAr : product.name}
                        </p>
                        <p className="text-orange-600 text-2xl font-bold">${product.price.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 py-12"
            >
              {t('common.noItems')}
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}
