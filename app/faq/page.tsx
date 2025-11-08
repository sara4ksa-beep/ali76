'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1'),
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2'),
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3'),
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4'),
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5'),
    },
    {
      question: t('faq.question6'),
      answer: t('faq.answer6'),
    },
    {
      question: t('faq.question7'),
      answer: t('faq.answer7'),
    },
    {
      question: t('faq.question8'),
      answer: t('faq.answer8'),
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            {t('faq.title')}
          </h1>
          <p className="text-xl md:text-2xl text-green-700 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-green-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 border-t border-green-100">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">{t('faq.stillHaveQuestions')}</h3>
            <p className="text-green-100 mb-6">{t('faq.contactUs')}</p>
            <a
              href="/contact"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
            >
              {t('faq.contactButton')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

