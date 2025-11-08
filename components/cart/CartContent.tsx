'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProduct {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  images: string[];
  stock: number;
}

export function CartContent() {
  const { language, t } = useLanguage();
  const { items, updateQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState<Record<string, CartProduct>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [items]);

  const fetchProducts = async () => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const productData: Record<string, CartProduct> = {};
      for (const item of items) {
        const response = await fetch(`/api/products/${item.productId}`);
        const product = await response.json();
        productData[item.productId] = product;
      }
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const product = products[item.productId];
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getName = (product: CartProduct) => {
    return language === 'ar' ? product.nameAr : product.name;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-gray-600 mb-6"
        >
          {t('cart.empty')}
        </motion.p>
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-200 transition-all"
          >
            {t('cart.continueShopping')}
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {items.map((item, index) => {
            const product = products[item.productId];
            if (!product) return null;

            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-gradient-to-r from-green-50 to-green-50 rounded-xl border-2 border-green-100"
              >
                {product.images[0] && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 relative bg-white rounded-xl overflow-hidden shadow-md"
                  >
                    <Image
                      src={product.images[0]}
                      alt={getName(product)}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2 text-gray-800">{getName(product)}</h3>
                  <p className="text-green-600 font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <label className="font-semibold text-gray-700">{t('common.quantity')}:</label>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-green-200 text-green-600 font-bold hover:bg-green-100 transition-colors"
                      >
                        -
                      </motion.button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 border-2 border-green-200 rounded-lg text-center font-semibold focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.productId, Math.min(product.stock, item.quantity + 1))}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-green-200 text-green-600 font-bold hover:bg-green-100 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-auto text-red-600 hover:text-red-800 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      {t('common.delete')}
                    </motion.button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-green-600">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t-2 border-green-200 pt-6"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-gray-800">{t('common.total')}:</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            ${getTotal().toFixed(2)}
          </span>
        </div>
        <Link href="/checkout">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-center font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-200"
          >
            {t('cart.proceedToCheckout')}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}


