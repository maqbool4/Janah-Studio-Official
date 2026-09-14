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
      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <div className="space-y-6 text-center flex flex-col items-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white"
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
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            Professional websites, bespoke desktop applications, graphic design, voice-synthesized AI video services, and high-speed data entry. Built cheaply, delivered instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-3 pt-4 w-full sm:max-w-md"
          >
            <Link
              to="/contact"
              className="px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] shadow-[0_10px_25px_rgba(57,167,255,0.25)] hover:shadow-[0_15px_35px_rgba(57,167,255,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-1 sm:gap-2 text-center leading-tight"
            >
              Start Project
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 hidden sm:block" />
            </Link>
            <Link
              to="/services"
              className="px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 transition-all flex items-center justify-center text-center leading-tight"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <BannerAd />
      </motion.div>

      {/* Recent Services */}
      <motion.section 
        className="pt-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">Recently Added Services</h2>
          <Link to="/services" className="text-sm font-bold text-blue-500 hover:text-blue-600">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentServices.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ServiceCard
                service={service}
                onOrderTrigger={() => handleOrderTrigger(service.title)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <BannerAd />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <FAQAccordion />
      </motion.div>
    </div>
  );
}
