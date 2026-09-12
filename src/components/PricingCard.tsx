import React from "react";
import { Check, Flame } from "lucide-react";
import { Pricing } from "../types";

interface PricingCardProps {
  key?: any;
  plan: Pricing;
  onOrderTrigger: (serviceName: string) => void;
  discountActive?: boolean;
  discountLabel?: string;
  discountPercent?: number;
}

export default function PricingCard({
  plan,
  onOrderTrigger,
  discountActive = false,
  discountLabel = "Promo Save",
  discountPercent = 0,
}: PricingCardProps) {
  const getDiscountedPrice = (price: number) => {
    if (!discountActive || discountPercent <= 0) return price;
    return Math.max(0, price * (1 - discountPercent / 100));
  };

  const finalPrice = getDiscountedPrice(plan.price);
  const hasDiscount = finalPrice < plan.price;

  return (
    <article
      className={`group relative bg-gradient-to-br from-[#0c1627]/95 to-[#050914]/95 border rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex flex-col justify-between h-full transition-all duration-300 ${
        plan.category === "Websites" || plan.category === "Applications"
          ? "border-[rgba(57,167,255,0.22)] shadow-[0_15px_40px_rgba(57,167,255,0.03)] hover:border-blue-300"
          : "border-slate-200 hover:border-[rgba(140,108,255,0.25)]"
      }`}
    >
      {/* Decorative active discount badge */}
      {discountActive && discountPercent > 0 && (
        <div className="absolute -top-3 right-6 flex items-center gap-1 bg-gradient-to-r from-[#18c77c] to-[#42e8a2] text-[#04120b] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_4px_15px_rgba(24,199,124,0.3)]">
          <Flame className="w-3 h-3 shrink-0 animate-pulse" />
          {discountLabel} (-{discountPercent}%)
        </div>
      )}

      <div>
        {/* Category identifier */}
        <span className="text-[10px] font-black text-[#8c6cff] uppercase tracking-widest block mb-1">
          {plan.category}
        </span>

        {/* Plan Title & Subtext */}
        <h4 className="text-lg font-black text-slate-900 group-hover:text-[#39a7ff] transition-all tracking-tight leading-snug">
          {plan.service}
        </h4>
        <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
          {plan.desc}
        </p>

        {/* Price Tag with optional discount math */}
        <div className="my-6">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm line-through text-slate-500 font-bold">
                PKR {plan.price.toLocaleString("en-PK")}
              </span>
            )}
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              PKR {finalPrice.toLocaleString("en-PK")}
            </span>
            {plan.unit && (
              <span className="text-xs text-slate-600 font-medium ml-1">
                {plan.unit}
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="text-[10px] text-[#18c77c] font-bold mt-1 uppercase tracking-wider">
              ✦ Special promotional save applied
            </p>
          )}
        </div>

        {/* Plan Feature checklist */}
        <ul className="space-y-3 border-t border-slate-200 pt-5 mb-8">
          {plan.includes.map((inc, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#b8c7da] leading-relaxed">
              <div className="w-4 h-4 rounded-full bg-[#39a7ff]/10 border border-[#39a7ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-[#39a7ff]" />
              </div>
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => onOrderTrigger(plan.service)}
        className="w-full py-4 rounded-xl text-xs font-black tracking-wider uppercase text-[#03101d] bg-[#39a7ff] hover:bg-[#1bb0ff] shadow-[0_5px_15px_rgba(57,167,255,0.2)] hover:shadow-[0_8px_25px_rgba(57,167,255,0.35)] hover:-translate-y-0.5 transition-all cursor-pointer text-center"
      >
        Order Now
      </button>
    </article>
  );
}
