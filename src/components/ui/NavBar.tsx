"use client";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Menu, X as CloseIcon } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "id", label: "ID", flag: "🇮🇩" },
  { code: "ko", label: "KO", flag: "🇰🇷" },
  { code: "ja", label: "JA", flag: "🇯🇵" },
  { code: "zh", label: "ZH", flag: "🇨🇳" },
];

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <nav className="relative w-full flex flex-col items-center justify-center md:-mt-15 py-1 z-50">
      {/* Language Dropdown & Mobile Menu Toggle */}
      <div
        className="absolute top-4 right-4 md:right-8 z-50 flex items-center gap-2"
        ref={dropdownRef}
      >
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-black shadow hover:bg-white/90 transition flex items-center gap-1 border border-white/60"
        >
          {LANGUAGES.find((l) => l.code === currentLang)?.flag || "🏳️"}
          <span className="hidden sm:inline ml-1">
            {LANGUAGES.find((l) => l.code === currentLang)?.label ||
              currentLang.toUpperCase()}
          </span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/80 text-black shadow hover:bg-white/90 transition border border-white/60"
        >
          {mobileMenuOpen ? (
            <CloseIcon className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] animate-fade-in">
            {LANGUAGES.filter((lng) => lng.code !== currentLang).map((lng) => (
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
        className="h-12 md:h-16 mb-2 mt-2 md:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
      />

      {/* Desktop Navbar Link */}
      <motion.ul
        className="hidden md:flex flex-row gap-5 px-8 py-2 rounded-full backdrop-blur-xs bg-white/40 shadow-xl font-medium text-white items-center border border-white/50"
        variants={navBarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{ delay: 2 }}
        >
          {t("Home")}
        </motion.li>

        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{ delay: 2.5 }}
        >
          <a href="#gallery">{t("Gallery")}</a>
        </motion.li>

        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{ delay: 3 }}
        >
          <a href="#characters">{t("Characters")}</a>
        </motion.li>

        <motion.li
          className="px-4 py-1 rounded-full cursor-pointer hover:bg-white/20 transition"
          variants={itemVariants}
          transition={{ delay: 3.5 }}
        >
          <a href="#amv">{t("AMV")}</a>
        </motion.li>
      </motion.ul>

      {/* Mobile Navbar Link */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-[90%] mt-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            <ul className="flex flex-col items-center py-4 gap-4 text-white font-medium">
              <li
                className="w-full text-center py-2 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Home")}
              </li>
              <li
                className="w-full text-center py-2 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#gallery" className="block w-full">
                  {t("Gallery")}
                </a>
              </li>
              <li
                className="w-full text-center py-2 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#characters" className="block w-full">
                  {t("Characters")}
                </a>
              </li>
              <li
                className="w-full text-center py-2 hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#amv" className="block w-full">
                  {t("AMV")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
