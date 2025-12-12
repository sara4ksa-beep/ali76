'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
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
    nameAr: string;
  };
  stock: number;
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

export function ProductsList() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, [category, sortBy, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      params.append('sortBy', sortBy);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getName = (product: Product) => {
    return language === 'ar' ? product.nameAr : product.name;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-96 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row gap-4"
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-5 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
        />
        <motion.select
          whileFocus={{ scale: 1.02 }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-5 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white font-medium"
        >
          <option value="newest">{t('products.newest')}</option>
          <option value="oldest">{t('products.oldest')}</option>
          <option value="priceLow">{t('products.priceLow')}</option>
          <option value="priceHigh">{t('products.priceHigh')}</option>
        </motion.select>
      </motion.div>

      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-gray-600 text-lg"
        >
          {t('common.noItems')}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link href={`/products/${product.id}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
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
                          alt={getName(product)}
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
                    {product.stock === 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {t('products.outOfStock')}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-bold text-[16px] md:text-[17px] mb-1 text-gray-800 group-hover:text-rose-600 transition-colors line-clamp-2 leading-tight">
                      {getName(product)}
                    </p>
                    <p className="text-orange-600 font-bold text-xl mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.stock > 0 ? (
                        <span className="text-orange-600 font-medium">{t('products.inStock')}</span>
                      ) : (
                        <span className="text-red-600 font-medium">{t('products.outOfStock')}</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}


