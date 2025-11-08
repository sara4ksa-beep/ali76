'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.1),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
            {t('privacy.title')}
          </h1>
          <p className="text-xl md:text-2xl text-rose-700 max-w-2xl mx-auto">
            {t('privacy.subtitle')}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
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
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.introduction')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('privacy.introContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('privacy.introContent2')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.informationWeCollect')}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('privacy.personalInfo')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('privacy.personalInfoContent')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('privacy.usageData')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('privacy.usageDataContent')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('privacy.cookies')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('privacy.cookiesContent')}
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
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.howWeUse')}
            </h2>
            <ul className="space-y-3 text-lg text-gray-700 leading-relaxed list-disc list-inside">
              <li>{t('privacy.useItem1')}</li>
              <li>{t('privacy.useItem2')}</li>
              <li>{t('privacy.useItem3')}</li>
              <li>{t('privacy.useItem4')}</li>
              <li>{t('privacy.useItem5')}</li>
            </ul>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.dataProtection')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('privacy.dataProtectionContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('privacy.dataProtectionContent2')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.yourRights')}
            </h2>
            <ul className="space-y-3 text-lg text-gray-700 leading-relaxed list-disc list-inside">
              <li>{t('privacy.rightItem1')}</li>
              <li>{t('privacy.rightItem2')}</li>
              <li>{t('privacy.rightItem3')}</li>
              <li>{t('privacy.rightItem4')}</li>
            </ul>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('privacy.contactUs')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('privacy.contactContent')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>{t('privacy.email')}:</strong> support@misoona.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

