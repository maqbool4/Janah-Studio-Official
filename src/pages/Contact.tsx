import React, { useState, FormEvent } from "react";
import { User, PhoneCall, Mail, MapPin, ArrowRight } from "lucide-react";
import { CONFIG } from "../data";
import BannerAd from "../components/BannerAd";

export default function Contact({ triggerToast }: { triggerToast: (msg: string, type?: "success" | "error") => void }) {
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", country: "", message: "" });

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      triggerToast("Please fill in all required fields.", "error");
      return;
    }
    const text = `*New General Enquiry*\n\nName: ${contactForm.name}\nPhone: ${contactForm.phone}\nEmail: ${contactForm.email || "N/A"}\nCountry: ${contactForm.country || "N/A"}\nMessage: ${contactForm.message}`;
    const url = `https://wa.me/${CONFIG.brand.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    triggerToast("Enquiry message compiled. Opening WhatsApp...");
  };

  return (
    <div className="pt-24 pb-12 px-4 w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Contact Us</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Get in touch with us directly via WhatsApp. We aim to respond instantly.</p>
      </div>

      <form
        onSubmit={handleContactSubmit}
        className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#20e0dc]" /> Full Name *
            </label>
            <input
              name="name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
              placeholder="e.g. Muhammad Ali"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#20e0dc]" /> Phone / WhatsApp *
            </label>
            <input
              name="phone"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              required
              placeholder="e.g. +92 300 1234567"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#20e0dc]" /> Email Address
            </label>
            <input
              name="email"
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              placeholder="e.g. ali@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#20e0dc]" /> Country
            </label>
            <input
              name="country"
              value={contactForm.country}
              onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
              placeholder="e.g. Pakistan"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500">Message *</label>
            <textarea
              name="message"
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              placeholder="What can we design, develop, build or edit for you? Specify outline directions..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] hover:shadow-[0_15px_30px_rgba(57,167,255,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          Send Enquiry via WhatsApp
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </form>

      <BannerAd />
    </div>
  );
}
