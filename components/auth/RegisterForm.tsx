'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Registration failed');
      } else {
        router.push('/login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          {t('auth.name')}
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-5 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
          placeholder={t('auth.name')}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-red-600"
            >
              {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          {t('auth.email')}
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-5 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
          placeholder={t('auth.email')}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-red-600"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
          {t('auth.password')}
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-5 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
          placeholder={t('auth.password')}
        />
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-sm text-red-600"
            >
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-200"
      >
        {loading ? t('common.loading') : t('auth.register')}
      </motion.button>
    </motion.form>
  );
}


