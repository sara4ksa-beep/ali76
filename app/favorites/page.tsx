'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface FavoriteProduct {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  images: string[];
  stock: number;
  category: {
    name: string;
    nameAr: string;
  };
}

interface Favorite {
  id: string;
  product: FavoriteProduct;
  createdAt: string;
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

export default function FavoritesPage() {
  const { language, t } = useLanguage();
  const { data: session } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    fetchFavorites();
  }, [session, router]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (productId: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.product.id !== productId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const getName = (product: FavoriteProduct) => {
    return language === 'ar' ? product.nameAr : product.name;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-96 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-500 bg-clip-text text-transparent mb-8"
        >
          {t('favorites.title')}
        </motion.h1>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-16 text-center"
          >
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </motion.svg>
            <p className="text-gray-600 text-lg mb-2">{t('favorites.empty')}</p>
            <p className="text-gray-500 text-sm mb-6">{t('favorites.emptyDescription')}</p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all"
              >
                {t('favorites.browseProducts')}
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {favorites.map((favorite) => (
                <motion.div key={favorite.id} variants={itemVariants} layout>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group relative"
                  >
                    <Link href={`/products/${favorite.product.id}`}>
                      <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-100 relative overflow-hidden">
                        {favorite.product.images[0] ? (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full relative"
                          >
                            <Image
                              src={favorite.product.images[0]}
                              alt={getName(favorite.product)}
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
                        {favorite.product.stock === 0 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {t('products.outOfStock')}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link href={`/products/${favorite.product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {getName(favorite.product)}
                        </h3>
                      </Link>
                      <p className="text-orange-600 font-bold text-xl mb-2">
                        ${favorite.product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {favorite.product.stock > 0 ? (
                          <span className="text-orange-600 font-medium">{t('products.inStock')}</span>
                        ) : (
                          <span className="text-red-600 font-medium">{t('products.outOfStock')}</span>
                        )}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFavorite(favorite.product.id)}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {t('favorites.remove')}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

