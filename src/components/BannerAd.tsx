import React from 'react';

export default function BannerAd() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8">
      <div className="w-full h-[120px] md:h-[90px] rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
        <span className="text-slate-500 font-bold tracking-widest uppercase text-sm">
          [ Advertisement Banner Space ]
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
      </div>
    </div>
  );
}
