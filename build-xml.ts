import fs from 'fs';
import { CONFIG } from './src/data';

const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&#39;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

const buildServicesHtml = () => CONFIG.services.map(s => `
  <div id="service-card-${escapeXml(s.id)}" class="group relative bg-gradient-to-br from-[#0c1627]/95 to-[#050914]/95 border border-[rgba(126,180,255,0.12)] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:border-[rgba(57,167,255,0.22)] hover:shadow-[0_25px_60px_rgba(57,167,255,0.06)] transition-all duration-500 flex flex-col justify-between h-full overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#39a7ff]/5 to-[#8c6cff]/5 rounded-full filter blur-2xl pointer-events-none group-hover:from-[#39a7ff]/10 group-hover:to-[#8c6cff]/10 transition-all duration-300"></div>
    <div>
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#050b14] border border-[rgba(126,180,255,0.15)] flex items-center justify-center mb-6 group-hover:border-[#39a7ff]/40 group-hover:shadow-[0_0_20px_rgba(57,167,255,0.15)] transition-all">
        <i data-lucide="${escapeXml(s.icon.toLowerCase())}" class="w-5 h-5 text-[#20e0dc] group-hover:scale-110 transition-all duration-300"></i>
      </div>
      <h3 class="text-xl font-black text-[#eef6ff] tracking-tight group-hover:text-[#39a7ff] transition-all">${escapeXml(s.title)}</h3>
      <p class="text-[#9aacc4] text-xs leading-relaxed mt-2.5">${escapeXml(s.desc)}</p>
      <div class="mt-5 mb-6">
        <p class="text-[10px] text-[#687b91] font-bold uppercase tracking-wider">Starting from</p>
        <p class="text-2xl font-black text-[#20e0dc] tracking-tight">PKR ${s.price.toLocaleString("en-PK")} <span class="text-xs font-normal text-[#9aacc4]">${escapeXml(s.unit)}</span></p>
      </div>
      <ul class="space-y-2.5 border-t border-[rgba(255,255,255,0.06)] pt-5 mb-8">
        ${s.items.map(item => `
          <li class="flex items-start gap-2.5 text-xs text-[#b8c7da] leading-tight">
            <div class="w-4 h-4 rounded-full bg-[#20e0dc]/10 border border-[#20e0dc]/20 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="check" class="w-2.5 h-2.5 text-[#20e0dc]"></i>
            </div>
            <span>${escapeXml(item)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    <button onclick="openModal('${escapeXml(s.title)}')" class="w-full py-3.5 rounded-xl text-xs font-black tracking-wider uppercase text-[#eef6ff] bg-white/5 border border-white/10 group-hover:bg-[#39a7ff] group-hover:text-[#03101d] group-hover:border-[#39a7ff] group-hover:shadow-[0_8px_20px_rgba(57,167,255,0.2)] transition-all duration-300 cursor-pointer text-center relative z-10">
      Order Service
    </button>
  </div>
`).join('');

const buildPricingHtml = () => CONFIG.pricing.map(plan => {
    const isHighlighted = plan.category === "Websites" || plan.category === "Applications";
    return `
    <div class="group relative bg-gradient-to-br from-[#0c1627]/95 to-[#050914]/95 border rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex flex-col justify-between h-full transition-all duration-300 ${isHighlighted ? 'border-[rgba(57,167,255,0.22)] shadow-[0_15px_40px_rgba(57,167,255,0.03)] hover:border-[#39a7ff]/50' : 'border-[rgba(126,180,255,0.12)] hover:border-[rgba(140,108,255,0.25)]'}">
      <div>
        <span class="text-[10px] font-black text-[#8c6cff] uppercase tracking-widest block mb-1">${escapeXml(plan.category)}</span>
        <h4 class="text-lg font-black text-[#eef6ff] group-hover:text-[#39a7ff] transition-all tracking-tight leading-snug">${escapeXml(plan.service)}</h4>
        <p class="text-[#9aacc4] text-xs leading-relaxed mt-2.5">${escapeXml(plan.desc)}</p>
        <div class="my-6">
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black text-[#eef6ff] tracking-tight">PKR ${plan.price.toLocaleString("en-PK")}</span>
            ${plan.unit ? `<span class="text-xs text-[#9aacc4] font-medium ml-1">${escapeXml(plan.unit)}</span>` : ''}
          </div>
        </div>
        <ul class="space-y-3 border-t border-[rgba(255,255,255,0.06)] pt-5 mb-8">
          ${plan.includes.map(inc => `
            <li class="flex items-start gap-2.5 text-xs text-[#b8c7da] leading-relaxed">
              <div class="w-4 h-4 rounded-full bg-[#39a7ff]/10 border border-[#39a7ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                <i data-lucide="check" class="w-2.5 h-2.5 text-[#39a7ff]"></i>
              </div>
              <span>${escapeXml(inc)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <button onclick="openModal('${escapeXml(plan.service)}')" class="w-full py-4 rounded-xl text-xs font-black tracking-wider uppercase text-[#03101d] bg-[#39a7ff] hover:bg-[#1bb0ff] shadow-[0_5px_15px_rgba(57,167,255,0.2)] hover:shadow-[0_8px_25px_rgba(57,167,255,0.35)] hover:-translate-y-0.5 transition-all cursor-pointer text-center relative z-10">
        Order Now
      </button>
    </div>
    `;
}).join('');

const buildPortfolioHtml = () => CONFIG.projects.map(proj => `
  <div class="portfolio-card group block relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(57,167,255,0.15)]" data-category="${escapeXml(proj.category)}">
    <div class="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/60 to-transparent opacity-80 z-10"></div>
    <img src="${escapeXml(proj.img)}" alt="${escapeXml(proj.title)}" class="w-full h-80 object-cover group-hover:scale-105 transition-all duration-700"/>
    <div class="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
      <div class="flex flex-wrap gap-2 mb-3">
        ${proj.chips.map(chip => `
          <span class="text-[9px] font-bold uppercase tracking-wider text-[#eef6ff] bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">${escapeXml(chip)}</span>
        `).join('')}
      </div>
      <h3 class="text-2xl font-black text-[#eef6ff] tracking-tight mb-2">${escapeXml(proj.title)}</h3>
      <p class="text-[#b8c7da] text-sm leading-relaxed">${escapeXml(proj.desc)}</p>
    </div>
  </div>
`).join('');

const pricesMap = {};
CONFIG.services.forEach(s => { pricesMap[s.title] = { price: s.price, isData: s.id === 'data' }; });
CONFIG.pricing.forEach(p => { pricesMap[p.service] = { price: p.price, isData: false }; });

const xmlTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' b:version='2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5' name='viewport'/>
  <title><data:view.title.escaped/></title>
  <b:include data='blog' name='all-head-content'/>
  
  <!-- Security Headers & Hardening -->
  <meta http-equiv='X-Frame-Options' content='SAMEORIGIN'/>
  <meta http-equiv='X-Content-Type-Options' content='nosniff'/>
  <meta http-equiv='Content-Security-Policy' content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; img-src 'self' https: data: blob:; connect-src 'self' https:; frame-src 'self' https:; object-src 'none'; base-uri 'self';"/>
  <meta http-equiv='X-XSS-Protection' content='1; mode=block'/>
  <meta name='referrer' content='strict-origin-when-cross-origin'/>
  <script src='https://cdn.tailwindcss.com'></script>
  <script src='https://unpkg.com/lucide@latest'></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
  
  <script>
  //<![CDATA[
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
        }
      }
    }
  //]]>
  </script>

  <b:skin><![CDATA[
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #030712; color: #eef6ff; margin: 0; padding: 0; overflow-x: hidden; }
    .glass-nav { background: rgba(8, 18, 33, 0.7); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(126, 180, 255, 0.1); }
    
    /* Blogger Widget Defaults Overrides */
    .widget { margin: 0; }
    .main-inner { padding: 0; }
    
    /* Custom Styling for Blogger Native Posts to match Dark Theme */
    #blog-content h2.title { font-size: 2.5rem; font-weight: 900; text-align: center; color: #eef6ff; margin-bottom: 3rem; }
    
    .blog-posts { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
    .item-view .blog-posts { display: block; max-width: 800px; margin: 0 auto; }
    
    .post-outer { background: rgba(12, 22, 39, 0.95); border: 1px solid rgba(126, 180, 255, 0.12); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.35); transition: all 0.3s; margin-bottom: 2rem; }
    .post-outer:hover { border-color: rgba(57, 167, 255, 0.22); transform: translateY(-4px); }
    
    .item-view .post-outer { padding: 3rem; background: #0c1627; transform: none !important; border-color: rgba(126, 180, 255, 0.12) !important; }
    
    .post-title { font-size: 1.5rem; font-weight: 900; color: #eef6ff; margin-bottom: 0.75rem; line-height: 1.2; }
    .item-view .post-title { font-size: 2.5rem; margin-bottom: 1.5rem; }
    
    .post-title a { color: #eef6ff; text-decoration: none; transition: color 0.3s; }
    .post-title a:hover { color: #39a7ff; }
    
    .date-header { font-size: 0.75rem; color: #9aacc4; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
    
    .post-body { font-size: 0.9rem; line-height: 1.8; color: #b8c7da; overflow: hidden; }
    .post-body img { max-width: 100%; height: auto; border-radius: 0.75rem; margin-bottom: 1rem; }
    .post-body a { color: #39a7ff; text-decoration: none; font-weight: 600; }
    
    .post-footer { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.8rem; color: #687b91; }
    .post-footer-line { margin-bottom: 0.5rem; }
    .post-footer a { color: #20e0dc; font-weight: bold; text-decoration: none; }
    .post-footer a:hover { color: #39a7ff; }
    
    .blog-pager { display: flex; justify-content: space-between; margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; }
    .blog-pager a { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: 999px; color: #eef6ff; font-weight: bold; text-decoration: none; font-size: 0.875rem; transition: all 0.3s; }
    .blog-pager a:hover { background: #39a7ff; color: #03101d; }
  ]]></b:skin>
</head>
<body class='bg-[#030712] text-[#eef6ff] antialiased relative' expr:class='data:view.isHomepage ? "is-home" : "is-item"'>

  <!-- AI Particles Canvas Background -->
  <canvas id="particles-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"></canvas>

  <!-- Navbar -->
  <div class="glass-nav fixed top-0 w-full z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <a href="/" class="flex items-center gap-3 relative z-10">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#20e0dc] to-[#39a7ff] p-[1px]">
            <div class="w-full h-full rounded-xl bg-[#0c1627] flex items-center justify-center">
              <i data-lucide="layers" class="w-5 h-5 text-[#20e0dc]"></i>
            </div>
          </div>
          <span class="text-xl font-black tracking-tight text-[#eef6ff]">Janah Studio</span>
        </a>
        <div class="hidden md:flex items-center gap-8">
          <a href="/#services" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Services</a>
          <a href="/#portfolio" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Portfolio</a>
          <a href="/#pricing" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Pricing</a>
          <a href="#blog-content" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Blog</a>
          <button onclick="openModal('General Inquiry')" class="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-[#eef6ff] hover:bg-[#39a7ff] hover:text-[#03101d] transition-all cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  </div>

  <b:if cond='data:view.isHomepage'>
    <!-- Hero Section -->
    <div class="relative pt-32 pb-20 px-4">
      <div class="max-w-4xl mx-auto text-center z-10 relative pt-10">
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest mb-6">
          <span class="w-2 h-2 rounded-full bg-[#20e0dc] animate-ping"></span>
          Premium Digital Agency
        </span>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-[#eef6ff] mb-6">
          We build <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]">Digital Empires</span>
        </h1>
        <p class="text-lg text-[#9aacc4] mb-10 max-w-2xl mx-auto leading-relaxed">
          High-performance websites, offline point-of-sale systems, and cutting-edge graphic design to scale your business into the future.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onclick="document.getElementById('services').scrollIntoView({behavior: 'smooth'})" class="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] hover:shadow-[0_0_30px_rgba(57,167,255,0.4)] hover:-translate-y-1 transition-all cursor-pointer">
            Explore Services
          </button>
          <a href="#portfolio" class="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[#eef6ff] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
            View Our Work
            <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
          </a>
        </div>

        <!-- Quick Service Finder -->
        <div class="space-y-3 pt-12 pb-2">
          <p class="text-xs font-black text-[#aabbd0] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#20e0dc]"></i>
            Quick Service Finder
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-5xl mx-auto">
            ${CONFIG.services.map(s => `
              <button onclick="handleQuickScroll('${escapeXml(s.id)}')" class="group flex flex-col items-center justify-center text-center p-3.5 rounded-2xl border border-[rgba(126,180,255,0.08)] bg-[#030914]/85 hover:bg-[#0c1e36] hover:border-[#39a7ff]/50 hover:shadow-[0_12px_25px_rgba(57,167,255,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer relative z-10">
                <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#20e0dc]/40 flex items-center justify-center mb-2.5 transition-all">
                  <i data-lucide="${escapeXml(s.icon.toLowerCase())}" class="w-4.5 h-4.5 text-[#20e0dc] group-hover:scale-110 transition-all duration-300"></i>
                </div>
                <span class="text-[11px] font-black text-[#eef6ff] group-hover:text-[#39a7ff] tracking-tight leading-tight whitespace-normal">${escapeXml(s.title)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Adsterra Banner Ad Unit (Top Placement) -->
    <div class="max-w-7xl mx-auto px-4 my-8 flex flex-col items-center justify-center relative z-10">
      <span class="text-[10px] uppercase font-bold tracking-widest text-[#687b91] mb-1.5 select-none">Advertisement</span>
      <div class="w-full max-w-[760px] min-h-[90px] rounded-2xl bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] p-2 flex items-center justify-center overflow-hidden">
        <script async="async" data-cfasync="false" src="https://pl31411689.profitableratecpmnetwork.com/4a72a9363ebd7283bb81befd644783c7/invoke.js"></script>
        <div id="container-4a72a9363ebd7283bb81befd644783c7"></div>
      </div>
    </div>

    <!-- Services Section -->
    <div id="services" class="py-24 relative px-4">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#eef6ff] tracking-tighter mb-4">Core Services</h2>
          <p class="text-[#9aacc4] text-lg">We provide end-to-end digital engineering and creative production.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${buildServicesHtml()}
        </div>
      </div>
    </div>

    <!-- Cost Calculator -->
    <div class="py-20 px-4 relative z-10">
      <div class="max-w-5xl mx-auto">
        <div class="w-full bg-[#081221]/80 border border-[rgba(126,180,255,0.15)] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden backdrop-blur-md">
          <div class="absolute top-0 right-0 w-64 h-64 bg-[#20e0dc]/5 rounded-full filter blur-[60px] pointer-events-none"></div>
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-5 space-y-4">
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <i data-lucide="database" class="w-3.5 h-3.5 text-[#20e0dc]"></i>
                Data Entry Calculator
              </span>
              <h3 class="text-2xl md:text-3xl font-black text-[#eef6ff] tracking-tight leading-tight">
                Estimate your <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] to-[#39a7ff]">data-entry cost.</span>
              </h3>
              <p class="text-[#9aacc4] text-sm leading-relaxed">
                Highly structured and rapid product cataloging. Base pricing starts at <b class="text-[#eef6ff]">PKR 200</b> per 100 items.
              </p>
            </div>
            
            <div class="lg:col-span-7 bg-[#050b14]/75 border border-[rgba(126,180,255,0.08)] rounded-2xl p-6 space-y-6">
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <label class="text-xs font-bold text-[#aabbd0] uppercase tracking-wider">Number of Products</label>
                  <span id="calc-count" class="text-sm font-black text-[#20e0dc] bg-[#20e0dc]/5 border border-[#20e0dc]/15 px-3 py-1 rounded-lg">500 Products</span>
                </div>
                <input type="range" id="calc-slider" min="100" max="10000" step="100" value="500" class="w-full h-2 bg-[#0c1627] rounded-lg appearance-none cursor-pointer accent-[#20e0dc] focus:outline-none relative z-20" />
              </div>
              
              <div class="space-y-1.5">
                <span class="text-[10px] font-bold text-[#687b91] uppercase tracking-wider block">Quick Presets</span>
                <div class="flex flex-wrap gap-2">
                  <button class="calc-preset px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1221] text-[#9aacc4] border border-[rgba(126,180,255,0.08)] hover:text-[#fff] hover:border-[rgba(57,167,255,0.2)] relative z-20" data-val="100">100</button>
                  <button class="calc-preset px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1221] text-[#9aacc4] border border-[rgba(126,180,255,0.08)] hover:text-[#fff] hover:border-[rgba(57,167,255,0.2)] relative z-20" data-val="500">500</button>
                  <button class="calc-preset px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1221] text-[#9aacc4] border border-[rgba(126,180,255,0.08)] hover:text-[#fff] hover:border-[rgba(57,167,255,0.2)] relative z-20" data-val="1000">1,000</button>
                  <button class="calc-preset px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1221] text-[#9aacc4] border border-[rgba(126,180,255,0.08)] hover:text-[#fff] hover:border-[rgba(57,167,255,0.2)] relative z-20" data-val="2500">2,500</button>
                  <button class="calc-preset px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1221] text-[#9aacc4] border border-[rgba(126,180,255,0.08)] hover:text-[#fff] hover:border-[rgba(57,167,255,0.2)] relative z-20" data-val="5000">5,000</button>
                </div>
              </div>

              <div class="h-[1px] bg-[rgba(255,255,255,0.05)]"></div>

              <div class="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p class="text-xs text-[#9aacc4] uppercase font-bold tracking-wider">Estimated Price</p>
                  <p id="calc-price" class="text-3xl md:text-4xl font-black text-[#eef6ff] mt-1 tracking-tight">PKR 1,000</p>
                  <p id="calc-desc" class="text-[10px] text-[#687b91] mt-1 flex items-center gap-1">Perfect for medium-scale grocery inventory.</p>
                </div>
                <button onclick="openModal('Business Data Entry')" class="px-6 py-3.5 rounded-xl font-bold text-sm text-[#03101d] bg-[#20e0dc] hover:bg-[#1bd1cc] shadow-[0_4px_20px_rgba(32,224,220,0.25)] hover:shadow-[0_6px_25px_rgba(32,224,220,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer shrink-0 relative z-20">
                  Order Data Entry <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio -->
    <div id="portfolio" class="py-24 px-4 relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-[#eef6ff] tracking-tighter mb-4">Selected Work</h2>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button class="portfolio-filter px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-[#39a7ff] text-[#03101d] shadow-[0_4px_15px_rgba(57,167,255,0.3)] relative z-20" data-filter="All">All Projects</button>
          <button class="portfolio-filter px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-[#0b1221] text-[#9aacc4] hover:text-[#fff] relative z-20" data-filter="Web">Websites</button>
          <button class="portfolio-filter px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-[#0b1221] text-[#9aacc4] hover:text-[#fff] relative z-20" data-filter="App">Applications</button>
          <button class="portfolio-filter px-5 py-2.5 rounded-full text-sm font-bold transition-all bg-[#0b1221] text-[#9aacc4] hover:text-[#fff] relative z-20" data-filter="AI">AI Media</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${buildPortfolioHtml()}
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div id="pricing" class="py-24 px-4 bg-[#050914] relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#eef6ff] tracking-tighter mb-4">Transparent Pricing</h2>
          <p class="text-[#9aacc4] text-lg">No hidden fees. Pick a category that suits your vision.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${buildPricingHtml()}
        </div>
      </div>
    </div>

    <!-- Adsterra Banner Ad Unit (Bottom Placement) -->
    <div class="max-w-7xl mx-auto px-4 my-8 flex flex-col items-center justify-center relative z-10">
      <span class="text-[10px] uppercase font-bold tracking-widest text-[#687b91] mb-1.5 select-none">Advertisement</span>
      <div class="w-full max-w-[760px] min-h-[90px] rounded-2xl bg-[#081221]/80 border border-[rgba(126,180,255,0.12)] p-2 flex items-center justify-center overflow-hidden">
        <script async="async" data-cfasync="false" src="https://pl31411689.profitableratecpmnetwork.com/4a72a9363ebd7283bb81befd644783c7/invoke.js"></script>
        <div id="container-4a72a9363ebd7283bb81befd644783c7"></div>
      </div>
    </div>
  </b:if>

  <!-- BLOGGER CMS NATIVE SECTION -->
  <!-- This is an empty widget that Blogger will auto-fill with the correct markup, guaranteeing no restore errors -->
  <div id="blog-content" class="py-24 px-4 relative z-10">
    <div class="max-w-7xl mx-auto">
      <b:if cond='data:view.isHomepage'>
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#eef6ff] tracking-tighter mb-4">Latest Updates</h2>
          <p class="text-[#9aacc4] text-lg">Insights, news, and our latest projects.</p>
        </div>
      </b:if>
      
      <b:section id='main-blog-area' class='main' showaddelement='yes'>
        <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='1' />
      </b:section>
    </div>
  </div>

  <!-- Footer -->
  <div class="bg-[#02050c] border-t border-[rgba(255,255,255,0.06)] py-12 px-4 relative z-10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20e0dc] to-[#39a7ff] p-[1px]">
          <div class="w-full h-full rounded-lg bg-[#0c1627] flex items-center justify-center">
            <i data-lucide="layers" class="w-4 h-4 text-[#20e0dc]"></i>
          </div>
        </div>
        <a href="https://maqbool4.blogspot.com" class="font-black text-[#eef6ff] tracking-tight hover:text-[#39a7ff] transition-all">Janah Studio</a>
      </div>
      <p class="text-sm text-[#5a6d85]">&#169; 2026 Janah Studio. All rights reserved.</p>
    </div>
  </div>

  <!-- Order Modal -->
  <div id="orderModal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4 overflow-y-auto">
    <div id="modalOverlay" class="fixed inset-0 bg-[#02050c]/85 backdrop-blur-md"></div>
    <div class="relative w-full max-w-2xl bg-[#081221]/95 border border-[rgba(57,167,255,0.18)] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden z-10 my-8">
      <div class="h-1.5 w-full bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]"></div>
      <button onclick="closeModal()" class="absolute top-5 right-5 p-2 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0c1627] text-[#9aacc4] hover:text-[#fff] hover:border-[rgba(57,167,255,0.3)] transition-all cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <div class="p-6 md:p-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500">
        <div class="mb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3">
            <span class="w-2 h-2 rounded-full bg-[#20e0dc] animate-ping"></span>
            Project Order
          </span>
          <h2 class="text-2xl md:text-3xl font-black text-[#eef6ff] tracking-tight">Let&#39;s design and build it.</h2>
          <p class="text-[#9aacc4] text-sm mt-1.5">Simply review your details, and we&#39;ll connect instantly on WhatsApp.</p>
        </div>
        
        <div class="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#06101f] border border-[rgba(57,167,255,0.2)] mb-6 flex justify-between items-center">
          <div>
            <p class="text-xs text-[#9aacc4] font-medium uppercase tracking-wider">Selected Service</p>
            <p id="modalServiceDisplay" class="text-lg font-black text-[#eef6ff] mt-0.5">Service</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-[#9aacc4] font-medium uppercase tracking-wider">Est. Cost</p>
            <p id="modalPriceDisplay" class="text-xl md:text-2xl font-black text-[#20e0dc] mt-0.5">PKR --</p>
          </div>
        </div>

        <form id="orderForm" onsubmit="handleFormSubmit(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-[#aabbd0]">Full Name <span class="text-[#ff4e4e]">*</span></label>
              <input id="formName" required="required" placeholder="e.g. Muhammad Ali" class="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-[#aabbd0]">Phone Number <span class="text-[#ff4e4e]">*</span></label>
              <input id="formPhone" required="required" placeholder="e.g. +92 300 1234567" class="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all" />
            </div>
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-[#aabbd0]">Change Service</label>
              <select id="formService" onchange="updateModalTotal()" class="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/90 text-[#fff] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all cursor-pointer">
                ${CONFIG.services.map(s => `<option value="${escapeXml(s.title)}" class="bg-[#0c1627]">${escapeXml(s.title)}</option>`).join('')}
                ${CONFIG.pricing.map(p => `<option value="${escapeXml(p.service)}" class="bg-[#0c1627]">${escapeXml(p.service)}</option>`).join('')}
                <option value="General Inquiry" class="bg-[#0c1627]">General Inquiry</option>
              </select>
            </div>
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-[#aabbd0]">Quantity / Products</label>
              <input id="formQty" type="number" min="1" value="1" oninput="updateModalTotal()" class="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all" />
            </div>
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-[#aabbd0]">Detailed Requirements</label>
              <textarea id="formReqs" rows="3" placeholder="Specify your features, design brief..." class="w-full px-4 py-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#020812]/70 text-[#fff] placeholder-[#5a6d85] text-sm focus:outline-none focus:border-[#39a7ff] focus:ring-4 focus:ring-[#39a7ff]/10 transition-all resize-none"></textarea>
            </div>
          </div>
          <button type="submit" class="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[#03101d] bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff] shadow-[0_10px_25px_rgba(57,167,255,0.25)] hover:shadow-[0_15px_35px_rgba(57,167,255,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all mt-4">
            <i data-lucide="send" class="w-5 h-5 shrink-0"></i> Submit via WhatsApp Securely
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold text-[#aabbd0] uppercase tracking-wider">Or Skip Form and Chat Instantly</p>
            <span class="text-[10px] text-[#18c77c] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#18c77c]/10 border border-[#18c77c]/20">Pre-Filled Ad Message</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            <button onclick="handleWhatsAppDirect()" type="button" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(32,199,124,0.35)] bg-[rgba(24,199,124,0.06)] hover:bg-[rgba(24,199,124,0.14)] text-[#18c77c] transition-all cursor-pointer">
              <i data-lucide="phone-call" class="w-4 h-4 shrink-0"></i> Direct WhatsApp Chat
            </button>
            <button onclick="handleEmailDirect()" type="button" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black border border-[rgba(57,167,255,0.25)] bg-[#0a1526] text-[#eef6ff] hover:bg-[#12243d] transition-all cursor-pointer">
              <i data-lucide="mail" class="w-4 h-4 shrink-0"></i> Send Instant Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
  //<![CDATA[
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let width, height;
      let waveAngle = 0;
      
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();
      
      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.radius = Math.random() * 2 + 1;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
      }
      
      for(let i=0; i<90; i++) particles.push(new Particle());
      
      const drawGlobe = (cx, cy, radius, time) => {
        ctx.save();
        ctx.strokeStyle = 'rgba(32, 224, 220, 0.15)';
        ctx.lineWidth = 1;
        for (let r = radius * 0.3; r <= radius; r += radius * 0.25) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (let angle = 0; angle < Math.PI; angle += Math.PI / 6) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, radius, Math.abs(radius * Math.sin(angle + time)), angle, 0, Math.PI * 2);
          ctx.stroke();
        }
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(32, 224, 220, 0.25)');
        grad.addColorStop(0.5, 'rgba(57, 167, 255, 0.1)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Tech dots grid
        ctx.fillStyle = 'rgba(57, 167, 255, 0.08)';
        for (let x = 40; x < width; x += 50) {
          for (let y = 40; y < height; y += 50) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        const time = Date.now() * 0.001;
        drawGlobe(width - 120, 150, 150, time * 0.5);
        drawGlobe(120, height - 120, 170, -time * 0.4);
        
        waveAngle += 0.015;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height * 0.4);
        for (let x = 0; x <= width; x += 50) {
          const y = height * 0.4 + Math.sin(x * 0.003 + waveAngle) * 60 + Math.cos(x * 0.005 - waveAngle * 0.7) * 40;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const waveGrad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        waveGrad.addColorStop(0, 'rgba(57, 167, 255, 0.12)');
        waveGrad.addColorStop(0.5, 'rgba(32, 224, 220, 0.06)');
        waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = waveGrad;
        ctx.fill();
        ctx.restore();
        
        particles.forEach(p => p.update());
        
        for(let i=0; i<particles.length; i++) {
          for(let j=i+1; j<particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 130) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = 'rgba(32, 224, 220, ' + (1 - dist/130)*0.25 + ')';
              ctx.stroke();
            }
          }
          ctx.beginPath();
          ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(32, 224, 220, 0.6)';
          ctx.fill();
        }
        requestAnimationFrame(animate);
      };
      animate();
    }

    lucide.createIcons();

    function handleQuickScroll(id) {
      const el = document.getElementById('service-card-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-[#20e0dc]', 'scale-[1.03]', 'shadow-[0_0_40px_rgba(32,224,220,0.25)]');
        setTimeout(() => el.classList.remove('ring-2', 'ring-[#20e0dc]', 'scale-[1.03]', 'shadow-[0_0_40px_rgba(32,224,220,0.25)]'), 1800);
      }
    }

    const pricesMap = ${JSON.stringify(pricesMap)};
    const modal = document.getElementById('orderModal');
    const serviceSelect = document.getElementById('formService');
    const displayService = document.getElementById('modalServiceDisplay');
    const displayPrice = document.getElementById('modalPriceDisplay');
    const formQty = document.getElementById('formQty');
    
    function updateModalTotal() {
      const s = serviceSelect.value;
      displayService.innerText = s;
      if (pricesMap[s]) {
         let cost = 0;
         const q = Number(formQty.value) || 1;
         if (pricesMap[s].isData) {
            cost = Math.ceil(q / 100) * 200;
         } else {
            cost = pricesMap[s].price * q;
         }
         displayPrice.innerText = 'PKR ' + cost.toLocaleString('en-PK');
      } else {
         displayPrice.innerText = 'Contact for pricing';
      }
    }

    function openModal(serviceName) {
      serviceSelect.value = serviceName;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      updateModalTotal();
    }
    
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    const filterBtns = document.querySelectorAll('.portfolio-filter');
    const projectCards = document.querySelectorAll('.portfolio-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#39a7ff]', 'text-[#03101d]', 'shadow-[0_4px_15px_rgba(57,167,255,0.3)]');
          b.classList.add('bg-[#0b1221]', 'text-[#9aacc4]');
        });
        btn.classList.remove('bg-[#0b1221]', 'text-[#9aacc4]');
        btn.classList.add('bg-[#39a7ff]', 'text-[#03101d]', 'shadow-[0_4px_15px_rgba(57,167,255,0.3)]');
        
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'All' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    function getAutoGreeting(serviceName) {
      const s = (serviceName || "").toLowerCase();
      if (s.includes("web") || s.includes("portal") || s.includes("landing")) return "Hello Janah Studio! I visited your website and I am highly interested in your Website Development service.";
      if (s.includes("app") || s.includes("pos") || s.includes("software") || s.includes("billing")) return "Hello Janah Studio! I visited your website and I am very interested in your Application and Software Development solutions.";
      if (s.includes("e-comm") || s.includes("shop") || s.includes("store")) return "Hello Janah Studio! I visited your website and I am highly interested in launching an E-commerce Online Store.";
      if (s.includes("design") || s.includes("art") || s.includes("graphic")) return "Hello Janah Studio! I saw your professional design portfolio and I am interested in your Graphic Design services.";
      if (s.includes("video") || s.includes("edit") || s.includes("thumbnail")) return "Hello Janah Studio! I saw your Video Editing services on your website.";
      if (s.includes("data") || s.includes("entry") || s.includes("catalog")) return "Hello Janah Studio! I am interested in your Business Data Entry and Product Cataloging service.";
      return 'Hello Janah Studio! I visited your website and I am interested in your "' + serviceName + '" service.';
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const service = document.getElementById('formService').value;
      const qty = document.getElementById('formQty').value;
      const reqs = document.getElementById('formReqs').value;
      const cost = displayPrice.innerText;
      
      const greeting = getAutoGreeting(service);
      const text = greeting + '\\n\\n📋 *DETAILED ORDER INFORMATION*:\\n' +
                   '🛒 *Service*: ' + service + '\\n' +
                   '🔢 *Quantity/Volume*: ' + qty + '\\n' +
                   '💰 *Estimated Cost*: ' + cost + '\\n\\n' +
                   '👤 *Client Name*: ' + name + '\\n' +
                   '📞 *Phone*: ' + phone + '\\n\\n' +
                   '📝 *Requirements*:\\n' + (reqs || 'Discuss on chat');
                   
      window.open('https://wa.me/923295430114?text=' + encodeURIComponent(text), '_blank');
      closeModal();
    }

    function handleWhatsAppDirect() {
      const service = document.getElementById('formService').value || "Digital Project";
      const body = getAutoGreeting(service);
      window.open('https://wa.me/923295430114?text=' + encodeURIComponent(body), '_blank');
    }

    function handleEmailDirect() {
      const service = document.getElementById('formService').value || "Digital Project";
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const body = 'Hello Janah Studio,\\n\\nI would like to discuss order/enquiry for "' + service + '".\\n\\nName: ' + name + '\\nPhone: ' + phone;
      window.open('mailto:janahstudio.official@gmail.com?subject=' + encodeURIComponent('Janah Studio Project Enquiry - ' + service) + '\\x26body=' + encodeURIComponent(body));
    }
    
    const calcSlider = document.getElementById('calc-slider');
    if (calcSlider) {
      calcSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        const batches = Math.ceil(val / 100);
        const cost = batches * 200;
        document.getElementById('calc-price').innerText = 'PKR ' + cost.toLocaleString('en-PK');
        document.getElementById('calc-count').innerText = val.toLocaleString() + ' Products';
        
        let subtext = "Designed for massive wholesale inventory, supermarkets, and large scale e-commerce catalogs.";
        if (val <= 200) subtext = "Ideal for small boutiques and local convenience store POS systems.";
        else if (val <= 1000) subtext = "Perfect for medium-scale grocery inventory or online fashion stores.";
        document.getElementById('calc-desc').innerText = subtext;
      });
      
      document.querySelectorAll('.calc-preset').forEach(btn => {
        btn.addEventListener('click', (e) => {
          calcSlider.value = e.target.getAttribute('data-val');
          calcSlider.dispatchEvent(new Event('input'));
        });
      });
    }
  //]]>
  </script>
</body>
</html>`;

fs.writeFileSync('janah-studio-blogger-theme.xml', xmlTemplate);
console.log('Successfully generated fixed bulletproof janah-studio-blogger-theme.xml');
