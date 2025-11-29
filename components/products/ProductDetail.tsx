'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  images: string[];
  stock: number;
  category: {
    name: string;
    nameAr: string;
  };
}

export function ProductDetail({ productId }: { productId: string }) {
  const { language, t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="skeleton h-96 rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-12 rounded-xl" />
          <div className="skeleton h-8 rounded-xl" />
          <div className="skeleton h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-red-600 text-lg"
      >
        {t('common.error')}
      </motion.div>
    );
  }

  const getName = () => language === 'ar' ? product.nameAr : product.name;
  const getDescription = () => language === 'ar' ? product.descriptionAr : product.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {product.images[0] && (
            <div className="aspect-square relative bg-gradient-to-br from-orange-100 to-orange-100 rounded-2xl overflow-hidden">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={getName()}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          )}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    selectedImage === index ? 'border-orange-600' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${getName()} ${index + 1}`} fill className="object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 flex flex-col justify-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {getName()}
            </h1>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {getDescription()}
            </p>
            {product.category && (
              <p className="text-sm text-gray-500 mb-4">
                {t('common.category')}: <span className="font-semibold text-orange-600">
                  {language === 'ar' ? product.category.nameAr : product.category.name}
                </span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
            <label className="font-semibold text-gray-700">{t('common.quantity')}:</label>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white border-2 border-orange-200 text-orange-600 font-bold hover:bg-orange-100 transition-colors"
              >
                -
              </motion.button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-2 border-2 border-orange-200 rounded-lg text-center font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg bg-white border-2 border-orange-200 text-orange-600 font-bold hover:bg-orange-100 transition-colors"
              >
                +
              </motion.button>
            </div>
            <span className="text-sm text-gray-600 ml-auto">
              {product.stock} {t('common.available')}
            </span>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
            >
              {t('common.addToCart')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={product.stock === 0}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
            >
              {t('common.buyNow')}
            </motion.button>
          </div>

          {product.stock === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 font-semibold text-center p-4 bg-red-50 rounded-xl"
            >
              {t('products.outOfStock')}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}


