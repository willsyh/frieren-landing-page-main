"use client";
import {motion} from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };
  const navBarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <nav className="relative w-full flex flex-col items-center justify-center -mt-15 py-1">

      {/* Logo di atas tengah */}
      <motion.img
        src="logo.webp"
        className="h-16 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
      />

      {/* Navbar Link */}
      <motion.ul
        className="flex flex-row gap-5 px-8 py-2 rounded-full backdrop-blur-xs bg-white/40 shadow-xl font-medium text-white items-center border border-white/50"
        variants={navBarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{delay: 2}}
        >
          {t('Home')}
        </motion.li>

        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{delay: 2.5}}
        >
          <a href="#gallery">{t('Gallery')}</a>
        </motion.li>

        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{delay: 3}}
        >
          <a href="#characters">{t('Characters')}</a>
        </motion.li>

        {/* Tambahan AMV di sini */}
        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{delay: 3.5}}
        >
          <a href="#amv">{t('AMV')}</a>
        </motion.li>
      </motion.ul>

      {/* Language Switcher */}
      <motion.div
        className="flex gap-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 4 } }}
      >
        <button
          onClick={() => changeLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            currentLang === 'en' ? 'bg-white/60 text-black' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage('id')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            currentLang === 'id' ? 'bg-white/60 text-black' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          ID
        </button>
      </motion.div>
    </nav>
  );
}
