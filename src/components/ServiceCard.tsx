import React from "react";
import { Globe, Cpu, ShoppingBag, Palette, Video, Database, Check } from "lucide-react";
import { Service } from "../types";

const iconMap: Record<string, any> = {
  Globe: Globe,
  Cpu: Cpu,
  ShoppingBag: ShoppingBag,
  Palette: Palette,
  Video: Video,
  Database: Database,
};

interface ServiceCardProps {
  key?: any;
  service: Service;
  onOrderTrigger: (serviceName: string) => void;
}

export default function ServiceCard({ service, onOrderTrigger }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <article
      id={`service-card-${service.id}`}
      className="group relative bg-gradient-to-br from-[#0c1627]/95 to-[#050914]/95 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:border-[rgba(57,167,255,0.22)] hover:shadow-[0_25px_60px_rgba(57,167,255,0.06)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Absolute faint glow in the top-right */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#39a7ff]/5 to-[#8c6cff]/5 rounded-full filter blur-2xl pointer-events-none group-hover:from-[#39a7ff]/10 group-hover:to-[#8c6cff]/10 transition-all duration-300" />

      <div>
        {/* Animated Icon frame */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#050b14] border border-[rgba(126,180,255,0.15)] flex items-center justify-center mb-6 group-hover:border-[#39a7ff]/40 group-hover:shadow-[0_0_20px_rgba(57,167,255,0.15)] transition-all">
          <IconComponent className="w-5 h-5 text-[#20e0dc] group-hover:scale-110 transition-all duration-300" />
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-[#39a7ff] transition-all">
          {service.title}
        </h3>
        <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
          {service.desc}
        </p>

        {/* Price Display */}
        <div className="mt-5 mb-6">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Starting from
          </p>
          <p className="text-2xl font-black text-[#20e0dc] tracking-tight">
            PKR {service.price.toLocaleString("en-PK")}{" "}
            <span className="text-xs font-normal text-slate-600">
              {service.unit}
            </span>
          </p>
        </div>

        {/* Items Checklist */}
        <ul className="space-y-2.5 border-t border-slate-200 pt-5 mb-8">
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#b8c7da] leading-tight">
              <div className="w-4 h-4 rounded-full bg-[#20e0dc]/10 border border-[#20e0dc]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-[#20e0dc]" />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trigger CTA */}
      <button
        onClick={() => onOrderTrigger(service.title)}
        className="w-full py-3.5 rounded-xl text-xs font-black tracking-wider uppercase text-slate-900 bg-slate-100 border border-slate-200 group-hover:bg-[#39a7ff] group-hover:text-[#03101d] group-hover:border-[#39a7ff] group-hover:shadow-[0_8px_20px_rgba(57,167,255,0.2)] transition-all duration-300 cursor-pointer text-center"
      >
        Order Service
      </button>
    </article>
  );
}
