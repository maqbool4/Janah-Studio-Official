import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, PhoneCall, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONFIG } from "../data";

const languages = [
  { code: "en", label: "English (US)", flag: "🇺🇸" },
  { code: "ur", label: "Urdu (PK)", flag: "🇵🇰" },
  { code: "hi", label: "Hindi (IN)", flag: "🇮🇳" },
  { code: "ar", label: "Arabic (IQ)", flag: "🇮🇶" },
  { code: "en", label: "English (UK)", flag: "🇬🇧" },
];

export default function Navbar({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY === 0) {
        setIsVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
        setLangMenuOpen(false); // close menus on scroll down
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
      } else {
        // Scrolling up
        setIsVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => {
          if (window.scrollY > 0) setIsVisible(false);
        }, 3000);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLangMenuOpen(false);
    document.cookie = `googtrans=/auto/${langCode}; path=/`;
    document.cookie = `googtrans=/auto/${langCode}; domain=${window.location.hostname}; path=/`;
    window.location.reload();
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-[0_4px_12px_rgba(57,167,255,0.2)] group-hover:scale-105 transition-transform">
              <img src={CONFIG.brand.logo} alt="Janah Studio" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Janah Studio</span>
          </Link>

          <div className="hidden md:flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-1 py-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    isActive ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="h-10 px-3 rounded-full flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <GlobeIcon />
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden py-1 z-50"
                  >
                    {languages.map((lang, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={`mailto:${CONFIG.brand.email}`}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Email Us"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${CONFIG.brand.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xl font-black text-slate-900 dark:text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase">Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="text-left px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 border border-slate-100 dark:border-slate-700"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase">Navigation</p>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold p-2 ${location.pathname === link.href ? "text-blue-500" : "text-slate-900 dark:text-white"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${CONFIG.brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(32,199,124,0.35)] bg-[rgba(24,199,124,0.06)] hover:bg-[rgba(24,199,124,0.14)] text-[#18c77c] shadow-[0_4px_15px_rgba(24,199,124,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 shrink-0" /> WhatsApp
              </a>
              <a
                href={`mailto:${CONFIG.brand.email}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(57,167,255,0.35)] bg-[rgba(57,167,255,0.06)] hover:bg-[rgba(57,167,255,0.14)] text-[#0284c7] dark:text-[#38bdf8] shadow-[0_4px_15px_rgba(57,167,255,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Mail className="w-5 h-5 shrink-0" /> Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple Globe Icon component since it wasn't exported directly in the import
function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  );
}
