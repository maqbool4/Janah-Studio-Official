import React from "react";
import { CONFIG } from "../data";
import ServiceCard from "../components/ServiceCard";
import PricingCard from "../components/PricingCard";
import CostCalculator from "../components/CostCalculator";
import BannerAd from "../components/BannerAd";

export default function Services({ handleOrderTrigger }: { handleOrderTrigger: (serviceTitle: string) => void }) {
  return (
    <div className="pt-24 pb-12 px-4 w-full max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our Services</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Explore our wide range of professional digital services tailored for your brand.</p>
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              
              onOrderTrigger={() => handleOrderTrigger(service.title)}
            />
          ))}
        </div>
      </section>

      <BannerAd />

      <section>
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-black text-slate-900">Transparent Pricing</h2>
          <p className="text-slate-500">Pick the exact tier you need. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.pricing.map((tier, idx) => (
            <PricingCard key={idx} plan={tier}  onOrderTrigger={() => handleOrderTrigger(tier.service)} />
          ))}
        </div>
      </section>
      
      <BannerAd />

      <section>
         <CostCalculator onOrderTrigger={(serviceName) => handleOrderTrigger(serviceName)} />
      </section>
    </div>
  );
}
