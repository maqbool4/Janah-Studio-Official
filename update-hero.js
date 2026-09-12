import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Chunk 1: Hero left side
const oldLeft = `          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(57,167,255,0.16)] bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#20e0dc] animate-pulse" />
              <span className="text-xs font-semibold text-[#b9d9ff] uppercase tracking-widest">
                Affordable Digital & AI Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#eef6ff]"
            >
              Build Your Digital Presence{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]">
                with Janah Studio
              </span>
            </motion.h1>`;

const newLeft = `          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#eef6ff]"
            >
              Build Your Digital Presence{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20e0dc] via-[#39a7ff] to-[#8c6cff]">
                with Janah Studio
              </span>
            </motion.h1>`;

code = code.replace(oldLeft, newLeft);

// Chunk 2: Quick service & Live stats
const oldStats = `              <a
                href="#services"
                className="px-8 py-4 rounded-xl font-bold text-[#eaf5ff] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex items-center justify-center"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Quick Service Selection Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-3 pt-6 pb-2"
            >
              <p className="text-xs font-black text-[#aabbd0] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#20e0dc] animate-pulse" />
                Quick Service Finder / فوری سروس سلیکٹر
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {CONFIG.services.map((service) => {
                  const Icon =
                    service.icon === "Globe" ? Globe :
                    service.icon === "Cpu" ? Cpu :
                    service.icon === "ShoppingBag" ? ShoppingBag :
                    service.icon === "Palette" ? Palette :
                    service.icon === "Video" ? Video : Database;
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleQuickScroll(service.id)}
                      className="group flex flex-col items-center justify-center text-center p-3.5 rounded-2xl border border-[rgba(126,180,255,0.08)] bg-[#030914]/85 hover:bg-[#0c1e36] hover:border-[#39a7ff]/50 hover:shadow-[0_12px_25px_rgba(57,167,255,0.12)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#20e0dc]/40 flex items-center justify-center mb-2.5 transition-all">
                        <Icon className="w-4.5 h-4.5 text-[#20e0dc] group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <span className="text-[11px] font-black text-[#eef6ff] group-hover:text-[#39a7ff] tracking-tight leading-tight whitespace-normal">
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]"
            >
              {CONFIG.stats.map(([num, label]) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-[rgba(126,180,255,0.08)] bg-white/[0.02] backdrop-blur-sm"
                >
                  <p className="text-2xl font-black text-[#eef6ff] tracking-tight">{num}</p>
                  <p className="text-[10px] text-[#9aacc4] uppercase font-bold mt-1 tracking-wider">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>`;

const newStats = `              <a
                href="#services"
                className="px-8 py-4 rounded-xl font-bold text-[#eaf5ff] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex items-center justify-center"
              >
                Explore Services
              </a>
            </motion.div>
          </div>`;
          
code = code.replace(oldStats, newStats);

// Chunk 3: Animation to Image
const oldAnimation = `          {/* Hero Graphical Orbital Animation */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[340px] md:h-[480px]">
            {/* Pulsing Neural Center Orb */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#20e0dc]/10 via-[#39a7ff]/10 to-[#8c6cff]/5 border border-[rgba(32,224,220,0.15)] flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-[#20e0dc]" />
            </div>

            {/* Orbiting Ring lines */}
            <div className="absolute inset-8 rounded-full border border-[rgba(57,167,255,0.15)] animate-[spin_12s_linear_infinite] [transform-style:preserve-3d] rotate-x-45" />
            <div className="absolute inset-16 rounded-full border border-[rgba(140,108,255,0.12)] animate-[spin_18s_linear_infinite_reverse] [transform-style:preserve-3d] rotate-y-45" />
            <div className="absolute inset-24 rounded-full border border-[rgba(32,224,220,0.1)] animate-[spin_24s_linear_infinite] [transform-style:preserve-3d] rotate-z-45" />

            {/* Interactive Float Cards */}
            <div className="absolute top-12 right-6 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_5s_infinite_ease-in-out]">
              <span className="w-1.5 h-1.5 bg-[#20e0dc] rounded-full" />
              Website & App Design
            </div>
            <div className="absolute bottom-16 left-4 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_6s_infinite_ease-in-out_1s]">
              <span className="w-1.5 h-1.5 bg-[#8c6cff] rounded-full" />
              AI Synthesized Videos
            </div>
            <div className="absolute top-1/2 left-0 p-3 rounded-xl border border-[rgba(126,180,255,0.16)] bg-[#0b1627]/80 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#eef6ff] flex items-center gap-1.5 animate-[bounce_7s_infinite_ease-in-out_2s]">
              <span className="w-1.5 h-1.5 bg-[#39a7ff] rounded-full" />
              Data Catalog Entry
            </div>
          </div>`;

const newAnimation = `          {/* Hero Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src="/src/assets/images/developer_coding_1789224221156.jpg"
              alt="Developer coding on PC"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-[0_20px_50px_rgba(32,224,220,0.15)] border border-[rgba(57,167,255,0.15)] object-cover"
            />
          </div>`;
          
code = code.replace(oldAnimation, newAnimation);

// Chunk 4: Remove footer paragraph
const oldFooterText = `          <p className="text-center md:text-right font-medium text-[#687b91]">
            Affordable · Modern · Practical Digital Solutions
          </p>`;
const newFooterText = ``;

code = code.replace(oldFooterText, newFooterText);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
