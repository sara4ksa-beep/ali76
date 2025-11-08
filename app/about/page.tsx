'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
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
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl text-rose-700 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('about.story')}
            </h2>
            <div className="mb-6 pb-4 border-b border-rose-100">
              <p className="text-sm text-gray-500 mb-2">
                {language === 'ar' ? 'تاريخ التأسيس' : 'Founded'}
              </p>
              <p className="text-lg font-semibold text-rose-700">
                {language === 'ar' ? '15 جمادى الأولى 1447 هـ' : '15 Jumada al-Awwal 1447 AH'}
              </p>
              <p className="text-base text-gray-600 mt-1">
                {language === 'ar' ? 'الموافق 6 نوفمبر 2025 م' : 'Corresponding to November 6, 2025'}
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('about.storyContent1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.storyContent2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-6">
              {t('about.mission')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t('about.missionContent')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-12">
              {t('about.values')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  variants={sectionVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-3xl font-bold text-white">{index}</span>
                  </div>
                  <h3 className="text-xl font-bold text-rose-900 mb-4 text-center">
                    {t(`about.value${index}Title`)}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {t(`about.value${index}Content`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

