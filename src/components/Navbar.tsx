import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, PhoneCall, Copy, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONFIG } from "../data";

export default function Navbar({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-[0_4px_12px_rgba(57,167,255,0.2)] group-hover:scale-105 transition-transform">
              <img src={CONFIG.brand.logo} alt="Janah Studio" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Janah Studio</span>
          </Link>

          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-1 py-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    isActive ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${CONFIG.brand.email}`}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
              title="Email Us"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${CONFIG.brand.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-900"
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
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <span className="text-xl font-black text-slate-900">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600 bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-4 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold p-2 ${location.pathname === link.href ? "text-blue-500" : "text-slate-900"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <a
                href={`https://wa.me/${CONFIG.brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
