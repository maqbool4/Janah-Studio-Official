import React from "react";
import PortfolioShowcase from "../components/PortfolioShowcase";
import BannerAd from "../components/BannerAd";

export default function About() {
  return (
    <div className="pt-24 pb-12 w-full max-w-7xl mx-auto space-y-16 px-4">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">About Janah Studio</h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Janah Studio is a modern digital agency focused on delivering affordable, high-quality websites, applications, and creative media. We blend cutting-edge AI technologies with solid engineering principles to build robust digital solutions quickly.
        </p>
      </div>

      <BannerAd />

      <PortfolioShowcase />
    </div>
  );
}
