'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ContactPage() {
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

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('contact.email'),
      value: 'info@saudiproductsmarket.com',
      link: 'mailto:info@saudiproductsmarket.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('contact.phone'),
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('contact.address'),
      value: t('contact.addressValue'),
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-100 via-green-100 to-green-200 py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.1),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-500 bg-clip-text text-transparent mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-green-700 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={sectionVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-500 rounded-full flex items-center justify-center mb-6 mx-auto text-white">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-4">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-700">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Business Hours */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8 text-center">
              {t('contact.businessHours')}
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {[
                { day: t('contact.monday'), hours: '9:00 AM - 6:00 PM' },
                { day: t('contact.tuesday'), hours: '9:00 AM - 6:00 PM' },
                { day: t('contact.wednesday'), hours: '9:00 AM - 6:00 PM' },
                { day: t('contact.thursday'), hours: '9:00 AM - 6:00 PM' },
                { day: t('contact.friday'), hours: '9:00 AM - 6:00 PM' },
                { day: t('contact.saturday'), hours: '10:00 AM - 4:00 PM' },
                { day: t('contact.sunday'), hours: t('contact.closed') },
              ].map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center py-3 border-b border-green-100 last:border-0"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {schedule.day}
                  </span>
                  <span className="text-lg text-gray-600">{schedule.hours}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

