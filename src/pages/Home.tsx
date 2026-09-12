import React from "react";
import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFIG } from "../data";
import BannerAd from "../components/BannerAd";
import FAQAccordion from "../components/FAQAccordion";
import ServiceCard from "../components/ServiceCard";

export default function Home({ handleOrderTrigger }: { handleOrderTrigger: (serviceTitle: string) => void }) {
  // Recent 4 services
  const recentServices = CONFIG.services.slice(0, 4);

  return (
    <div className="pt-20 pb-8 px-4 w-full max-w-7xl mx-auto space-y-12">
      {/* Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
          >
            Build Your Digital Presence{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]">
              with Janah Studio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Professional websites, bespoke desktop applications, graphic design, voice-synthesized AI video services, and high-speed data entry. Built cheaply, delivered instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] shadow-[0_10px_25px_rgba(57,167,255,0.25)] hover:shadow-[0_15px_35px_rgba(57,167,255,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 rounded-xl font-bold text-slate-800 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src="/src/assets/images/developer_coding_1789224221156.jpg"
            alt="Developer coding on PC"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-[0_20px_50px_rgba(32,224,220,0.15)] border border-[rgba(57,167,255,0.15)] object-cover"
          />
        </div>
      </div>

      <BannerAd />

      {/* Recent Services */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">Recently Added Services</h2>
          <Link to="/services" className="text-sm font-bold text-blue-500 hover:text-blue-600">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentServices.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              
              onOrderTrigger={() => handleOrderTrigger(service.title)}
            />
          ))}
        </div>
      </section>

      <BannerAd />

      <FAQAccordion />
    </div>
  );
}
