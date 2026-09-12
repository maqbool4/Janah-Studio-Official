import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { CONFIG } from "./data";
import AIParticlesBackground from "./components/AIParticlesBackground";
import Navbar from "./components/Navbar";
import OrderModal from "./components/OrderModal";
import Toast from "./components/Toast";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const triggerToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setIsToastVisible(true);
  };

  const handleOrderTrigger = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-200 relative">
        <AIParticlesBackground />
        
        <Navbar onTriggerToast={triggerToast} />

        <main className="min-h-screen pb-12">
          <Routes>
            <Route path="/" element={<Home handleOrderTrigger={handleOrderTrigger} />} />
            <Route path="/services" element={<Services handleOrderTrigger={handleOrderTrigger} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact triggerToast={triggerToast} />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-slate-200 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-xs">
            <div className="flex items-center gap-3">
              <img src={CONFIG.brand.logo} alt="Janah Studio" className="w-7 h-7 rounded-lg bg-slate-50 p-0.5 object-contain border border-slate-200" />
              <span>&copy; {new Date().getFullYear()} Janah Studio. All rights reserved.</span>
            </div>
            <p className="text-center md:text-right font-medium text-slate-500">
              Affordable · Modern · Practical Digital Solutions
            </p>
          </div>
        </footer>

        {/* Floating Action WhatsApp bubble */}
        <a
          href={`https://wa.me/${CONFIG.brand.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center bg-[#18c77c] text-white shadow-[0_10px_25px_rgba(24,199,124,0.3)] hover:scale-110 active:scale-95 hover:shadow-[0_15px_30px_rgba(24,199,124,0.45)] transition-all"
          aria-label="Direct WhatsApp Support Chat"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Interactive Forms & Dialog Modals */}
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedServiceTitle={selectedService}
          services={CONFIG.services}
          onTriggerToast={triggerToast}
        />

        {/* Status Toasts */}
        <Toast message={toastMessage} type={toastType} isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
      </div>
    </BrowserRouter>
  );
}
