import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, PhoneCall, Mail, Calculator } from "lucide-react";
import { Service } from "../types";
import { CONFIG } from "../data";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceTitle: string;
  services: Service[];
  onTriggerToast: (msg: string) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedServiceTitle,
  services,
  onTriggerToast,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    country: "",
    address: "",
    service: "",
    quantity: 1,
    requirements: "",
    details: "",
    attachment: "",
  });

  // Keep state in sync with pre-selected service
  useEffect(() => {
    if (selectedServiceTitle) {
      setFormData((prev) => ({ ...prev, service: selectedServiceTitle }));
    } else if (services.length > 0) {
      setFormData((prev) => ({ ...prev, service: services[0].title }));
    }
  }, [selectedServiceTitle, services, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getEstimatedTotal = () => {
    const matchedService = services.find((s) => s.title === formData.service);
    if (!matchedService) return "Contact for pricing";
    
    let total = matchedService.id === "data"
      ? Math.ceil(formData.quantity / 100) * 200
      : matchedService.price * formData.quantity;
      
    return `PKR ${total.toLocaleString("en-PK")}`;
  };

  const getAutoGreetingForService = (serviceName: string) => {
    const s = (serviceName || "").toLowerCase();
    
    if (s.includes("web") || s.includes("portal") || s.includes("landing")) {
      return `Hello Janah Studio! I visited your website and I am highly interested in your Website Development service. I would love to get more details and discuss building a high-quality website for my project. Please guide me on how we can get started!`;
    }
    if (s.includes("app") || s.includes("pos") || s.includes("software") || s.includes("billing") || s.includes("ledger")) {
      return `Hello Janah Studio! I visited your website and I am very interested in your Application & Software Development solutions. I would love to share my requirements and discuss how we can build a customized POS or workflow system for my business. Please provide more details.`;
    }
    if (s.includes("e-comm") || s.includes("shop") || s.includes("store")) {
      return `Hello Janah Studio! I visited your website and I am highly interested in launching an E-commerce Online Store with your seamless WhatsApp ordering flow. I would like to learn more about your packages, design styles, and features. Let's connect!`;
    }
    if (s.includes("design") || s.includes("art") || s.includes("graphic") || s.includes("poster") || s.includes("banner") || s.includes("card") || s.includes("menu")) {
      return `Hello Janah Studio! I saw your professional design portfolio on your website and I am interested in your Graphic Design services. I would love to collaborate on custom graphics and elevate my brand's visual identity. Please share more details!`;
    }
    if (s.includes("video") || s.includes("edit") || s.includes("thumbnail") || s.includes("avatar")) {
      return `Hello Janah Studio! I saw your Video Editing & AI Multimedia services on your website. I am interested in creating engaging short-form content/AI videos to capture more attention. Could you please provide details about pricing and turnaround times?`;
    }
    if (s.includes("data") || s.includes("entry") || s.includes("catalog") || s.includes("database")) {
      return `Hello Janah Studio! I am interested in your fast and highly accurate Business Data Entry & Product Cataloging service. I would like to get more information about uploading products and structuring entries. Let's connect!`;
    }
    
    // Default fallback
    return `Hello Janah Studio! I visited your website and I am interested in your "${serviceName}" service. Please provide me with more details and let's discuss this project further.`;
  };

  const getWhatsAppMessage = () => {
    const serviceName = formData.service || "Digital Project";
    const greeting = getAutoGreetingForService(serviceName);
    return `${greeting}\n\n` +
      `----------------------------------------\n` +
      `📋 *DETAILED ORDER INFORMATION*:\n` +
      `🛒 *Service*: ${serviceName}\n` +
      `🔢 *Quantity/Volume*: ${formData.quantity}\n` +
      `💰 *Estimated Cost*: ${getEstimatedTotal()}\n\n` +
      `👤 *Client Name*: ${formData.name}\n` +
      `📞 *Phone*: ${formData.phone}\n` +
      `💬 *WhatsApp*: ${formData.whatsapp || "Same as Phone"}\n` +
      `📧 *Email*: ${formData.email || "Not provided"}\n` +
      `🌍 *Country*: ${formData.country || "Not provided"}\n` +
      `📍 *Address*: ${formData.address || "Not provided"}\n\n` +
      `📝 *Requirements*:\n${formData.requirements || "I would like to discuss my requirements directly on Chat."}\n\n` +
      `✨ *Additional Notes*:\n${formData.details || "None"}\n\n` +
      `📎 *Reference Attachments Link*: ${formData.attachment || "None"}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      onTriggerToast("Please fill in the required fields (*).");
      return;
    }

    const text = getWhatsAppMessage();
    const waUrl = `https://wa.me/${CONFIG.brand.whatsapp}?text=${encodeURIComponent(text)}`;
    
    onTriggerToast("Order summary compiled. Opening WhatsApp...");
    setTimeout(() => {
      window.open(waUrl, "_blank", "referrer");
      onClose();
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const serviceName = formData.service || "Digital Project";
    const body = getAutoGreetingForService(serviceName);
    window.open(`https://wa.me/${CONFIG.brand.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "referrer");
  };

  const handleEmailDirect = () => {
    const serviceName = formData.service || "Digital Project";
    const body = `Hello Janah Studio,\n\nI would like to discuss order/enquiry for "${serviceName}". Please contact me to discuss the detailed guidelines and references.\n\nName: ${formData.name}\nPhone: ${formData.phone}`;
    window.open(`mailto:${CONFIG.brand.email}?subject=${encodeURIComponent("Janah Studio Project Enquiry - " + serviceName)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#02050c]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white/95 border border-[rgba(57,167,255,0.18)] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden z-10"
          >
            {/* Top Glow Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl border border-slate-200 bg-[#0c1627] text-slate-600 hover:text-slate-900 hover:border-[rgba(57,167,255,0.3)] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-widest bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#20e0dc] animate-ping" />
                  Project Order
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Let's design & build it.
                </h2>
                <p className="text-slate-600 text-sm mt-1.5">
                  No accounts or upfront cards required. Simply review your details, and we'll connect instantly.
                </p>
              </div>

              {/* Estimate Summary box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#06101f] border border-[rgba(57,167,255,0.2)] mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">
                    Selected Service
                  </p>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    {formData.service}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-600 font-medium uppercase tracking-wider flex items-center gap-1 md:justify-end">
                    <Calculator className="w-3.5 h-3.5 text-[#20e0dc]" />
                    Estimated Cost
                  </p>
                  <p className="text-xl md:text-2xl font-black text-[#20e0dc] mt-0.5">
                    {getEstimatedTotal()}
                  </p>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Full Name <span className="text-[#ff4e4e]">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Muhammad Ali"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Phone Number <span className="text-[#ff4e4e]">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      WhatsApp Number (optional)
                    </label>
                    <input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="e.g. +92 329 5430114"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Email Address (optional)
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ali@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Country
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Pakistan"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Change Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/90 text-slate-900 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all cursor-pointer"
                    >
                      {!services.find(s => s.title === formData.service) && formData.service && (
                        <option value={formData.service} className="bg-slate-100 text-slate-900">
                          {formData.service}
                        </option>
                      )}
                      {services.map((s) => (
                        <option
                          key={s.id}
                          value={s.title}
                          className="bg-slate-100 text-slate-900"
                        >
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity input */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500">
                      Quantity / Volume / Product Count
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                    <p className="text-[10px] text-slate-600">
                      * For Websites, 1 means 1 core website. For Data Entry, 100 means 100 products catalog.
                    </p>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500">
                      Address / Business Address (if physical print delivery required)
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Full delivery address for brand cards, print media or catalogs"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500">
                      Detailed Requirements
                    </label>
                    <textarea
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Specify your features, design brief, desired pages, product details, timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Additional notes */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500">
                      Additional Notes / Custom Instructions
                    </label>
                    <textarea
                      name="details"
                      rows={2}
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Any specific tools, platforms, or aesthetic directions to prioritize..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Reference Attachment URL */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500">
                      Reference Links / File Attachments URL
                    </label>
                    <input
                      name="attachment"
                      value={formData.attachment}
                      onChange={handleInputChange}
                      placeholder="Paste google drive folder, dropbox, figma draft, or image attachments"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Main Submit CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] shadow-[0_10px_25px_rgba(57,167,255,0.25)] hover:shadow-[0_15px_35px_rgba(57,167,255,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all mt-4"
                >
                  <Send className="w-5 h-5 shrink-0" />
                  Submit via WhatsApp Securely
                </button>
              </form>

              {/* Direct Fallback contact methods */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Or Skip Form & Chat Instantly
                  </p>
                  <span className="text-[10px] text-[#18c77c] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#18c77c]/10 border border-[#18c77c]/20">
                    Pre-Filled Ad Message
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Want to ask a quick question instead? Click below to instantly launch WhatsApp with a pre-filled message about <b>{formData.service}</b>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(32,199,124,0.35)] bg-[rgba(24,199,124,0.06)] hover:bg-[rgba(24,199,124,0.14)] text-[#18c77c] shadow-[0_4px_15px_rgba(24,199,124,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    Direct WhatsApp Chat
                  </button>
                  <button
                    onClick={handleEmailDirect}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(57,167,255,0.25)] bg-[#0a1526] text-slate-900 hover:bg-[#12243d] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    Send Instant Email
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
