'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Record<string, { price: number }>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productData: Record<string, { price: number }> = {};
      for (const item of items) {
        try {
          const response = await fetch(`/api/products/${item.productId}`);
          const product = await response.json();
          productData[item.productId] = { price: product.price };
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      setProducts(productData);
    };
    if (items.length > 0) {
      fetchProducts();
    }
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/orders/${result.orderId}`);
      } else {
        alert(result.error || 'Checkout failed');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => {
    const product = products[item.productId];
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">{t('checkout.shippingInfo')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.fullName')}</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('fullName')}
              className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-2">{errors.fullName.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.email')}</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('email')}
              type="email"
              className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.address')}</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('address')}
              className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-2">{errors.address.message}</p>
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.city')}</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('city')}
                className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-2">{errors.city.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.country')}</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('country')}
                className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
              />
              {errors.country && (
                <p className="text-red-600 text-sm mt-2">{errors.country.message}</p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-semibold mb-2 text-gray-700">{t('checkout.postalCode')}</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('postalCode')}
              className="w-full px-5 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-green-200"
          >
            {loading ? t('common.loading') : t('checkout.placeOrder')}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">{t('checkout.orderSummary')}</h2>
        <div className="space-y-4 mb-6">
          {items.map((item, index) => {
            const product = products[item.productId];
            const itemTotal = product ? product.price * item.quantity : 0;
            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex justify-between items-center p-4 bg-green-50 rounded-xl"
              >
                <span className="font-medium text-gray-700">Item x{item.quantity}</span>
                <span className="font-bold text-green-600">${itemTotal.toFixed(2)}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="border-t-2 border-green-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">{t('common.total')}:</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

