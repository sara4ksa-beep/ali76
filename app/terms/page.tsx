'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const { t } = useLanguage();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-orange-100 to-orange-200 py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.1),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-500 bg-clip-text text-transparent mb-6">
            {t('terms.title')}
          </h1>
          <p className="text-xl md:text-2xl text-orange-700 max-w-2xl mx-auto">
            {t('terms.subtitle')}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.acceptance')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('terms.acceptanceContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('terms.acceptanceContent2')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.useOfService')}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('terms.eligibility')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('terms.eligibilityContent')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('terms.account')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('terms.accountContent')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.products')}
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('terms.productsContent1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('terms.productsContent2')}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.orders')}
            </h2>
            <ul className="space-y-3 text-lg text-gray-700 leading-relaxed list-disc list-inside">
              <li>{t('terms.orderItem1')}</li>
              <li>{t('terms.orderItem2')}</li>
              <li>{t('terms.orderItem3')}</li>
              <li>{t('terms.orderItem4')}</li>
            </ul>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.payment')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('terms.paymentContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('terms.paymentContent2')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.returns')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('terms.returnsContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('terms.returnsContent2')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.limitation')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('terms.limitationContent')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.changes')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('terms.changesContent')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-6">
              {t('terms.contact')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('terms.contactContent')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>{t('terms.email')}:</strong> info@ali76.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

