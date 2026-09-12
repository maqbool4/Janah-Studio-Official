import { useState } from "react";
import { Database, HelpCircle, Check, ArrowRight } from "lucide-react";

interface CostCalculatorProps {
  onOrderTrigger: (serviceName: string) => void;
}

export default function CostCalculator({ onOrderTrigger }: CostCalculatorProps) {
  const [productCount, setProductCount] = useState<number>(500);

  const calculateCost = (count: number) => {
    // PKR 200 per 100 products
    const batches = Math.ceil(count / 100);
    return batches * 200;
  };

  const getSubtext = (count: number) => {
    if (count <= 200) return "Ideal for small boutiques and local convenience store POS systems.";
    if (count <= 1000) return "Perfect for medium-scale grocery inventory or online fashion stores.";
    return "Designed for massive wholesale inventory, supermarkets, and large scale e-commerce catalogs.";
  };

  const presets = [100, 500, 1000, 2500, 5000];

  return (
    <div className="w-full bg-white/90 border border-[rgba(126,180,255,0.15)] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden backdrop-blur-md">
      {/* Decorative Glow Orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#20e0dc]/5 rounded-full filter blur-[60px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left copy */}
        <div className="lg:col-span-5 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-widest bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
            <Database className="w-3.5 h-3.5 text-[#20e0dc]" />
            Data Entry Calculator
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Estimate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] to-[#39a7ff]">data-entry cost.</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Highly structured and rapid product cataloging. Our base pricing starts at only <b className="text-slate-900">PKR 200</b> per 100 items and scales linearly according to your store database needs.
          </p>

          <div className="space-y-2 pt-2">
            {[
              "Product image uploading & compression",
              "Structured attribute tagging & categorization",
              "POS, Excel, or custom CSV exports",
              "Complete accuracy check & double verification",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#b8c7da]">
                <div className="w-4 h-4 rounded-full bg-[#20e0dc]/10 border border-[#20e0dc]/20 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#20e0dc]" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right calculator controls */}
        <div className="lg:col-span-7 bg-[#050b14]/75 border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Number of Products
              </label>
              <span className="text-sm font-black text-[#20e0dc] bg-[#20e0dc]/5 border border-[#20e0dc]/15 px-3 py-1 rounded-lg">
                {productCount.toLocaleString()} Products
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={productCount}
              onChange={(e) => setProductCount(Number(e.target.value))}
              className="w-full h-2 bg-[#0c1627] rounded-lg appearance-none cursor-pointer accent-[#20e0dc] focus:outline-none focus:ring-2 focus:ring-[#20e0dc]/20"
            />
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Selection Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setProductCount(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    productCount === preset
                      ? "bg-[#20e0dc]/15 text-[#20e0dc] border-[#20e0dc]/30"
                      : "bg-[#0b1221] text-slate-600 border-slate-200 hover:text-slate-900 hover:border-[rgba(57,167,255,0.2)]"
                  }`}
                >
                  {preset.toLocaleString()} Products
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-[rgba(255,255,255,0.05)]" />

          {/* Result cost */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-slate-600 uppercase font-bold tracking-wider">
                Estimated Price
              </p>
              <p className="text-3xl md:text-4xl font-black text-slate-900 mt-1 tracking-tight">
                PKR {calculateCost(productCount).toLocaleString("en-PK")}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                {getSubtext(productCount)}
              </p>
            </div>

            <button
              onClick={() => onOrderTrigger("Business Data Entry")}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-[#03101d] bg-[#20e0dc] hover:bg-[#1bd1cc] shadow-[0_4px_20px_rgba(32,224,220,0.25)] hover:shadow-[0_6px_25px_rgba(32,224,220,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              Order Data Entry
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
