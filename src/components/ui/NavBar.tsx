"use client";
import {motion} from "framer-motion";

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'id', label: 'ID', flag: '🇮🇩' },
  { code: 'ko', label: 'KO', flag: '🇰🇷' },
  { code: 'ja', label: 'JA', flag: '🇯🇵' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳' },
];

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
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
      {/* Language Dropdown (top right) */}
      <div className="absolute top-4 right-8 z-50" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-black shadow hover:bg-white/90 transition flex items-center gap-1 border border-white/60"
        >
          {LANGUAGES.find(l => l.code === currentLang)?.flag || '🏳️'}
          <span className="ml-1">{LANGUAGES.find(l => l.code === currentLang)?.label || currentLang.toUpperCase()}</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] animate-fade-in">
            {LANGUAGES.filter(lng => lng.code !== currentLang).map(lng => (
              <button
                key={lng.code}
                onClick={() => changeLanguage(lng.code)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
              >
                <span>{lng.flag}</span>
                <span>{lng.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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

      {/* End Language Switcher (now dropdown) */}
    </nav>
  );
}
