import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Layers, Smartphone, Globe, Sparkles, Download } from "lucide-react";
import { CONFIG } from "../data";

interface PortfolioShowcaseProps {
  onOrderTrigger: (serviceName: string) => void;
}

type TabType = "all" | "websites" | "apps" | "concepts";

export default function PortfolioShowcase({ onOrderTrigger }: PortfolioShowcaseProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredProjects = () => {
    switch (activeTab) {
      case "websites":
        return CONFIG.websites.map((w) => ({
          ...w,
          type: "Website Demo",
          badge: "Live Preview",
          tagIcon: Globe,
          img: w.img,
          desc: w.desc,
          primaryText: "Live Demo →",
          secondaryText: w.tech,
        }));
      case "apps":
        return CONFIG.apps.map((a) => ({
          title: a.title,
          desc: a.desc,
          img: a.icon, // using icon as image
          type: "Application",
          badge: a.paid ? "Premium" : "Free Download",
          tagIcon: Smartphone,
          primaryText: a.paid ? "Purchase & Info" : "Download Free",
          secondaryText: a.paid ? "Paid" : "Free Tools",
          link: a.url,
          isApp: true,
        }));
      case "concepts":
        return CONFIG.projects.map((p) => ({
          title: p.title,
          desc: p.desc,
          img: p.img,
          type: "Concept Design",
          badge: p.chips.join(" · "),
          tagIcon: Sparkles,
          primaryText: "Discuss Project →",
          secondaryText: "AI Assisted Concept",
          link: p.link,
        }));
      default:
        // Merge all beautifully
        const merged = [
          ...CONFIG.websites.map((w) => ({
            title: w.title,
            desc: w.desc,
            img: w.img,
            type: "Website Demo",
            badge: "Live Preview",
            tagIcon: Globe,
            primaryText: "Live Demo →",
            secondaryText: w.tech,
            link: w.link,
          })),
          ...CONFIG.apps.map((a) => ({
            title: a.title,
            desc: a.desc,
            img: a.icon,
            type: "Application",
            badge: a.paid ? "Premium Utility" : "Free Download",
            tagIcon: Smartphone,
            primaryText: a.paid ? "Purchase & Info" : "Download Free",
            secondaryText: a.paid ? "Paid" : "Free",
            link: a.url,
            isApp: true,
          })),
          ...CONFIG.projects.map((p) => ({
            title: p.title,
            desc: p.desc,
            img: p.img,
            type: "Concept Design",
            badge: p.chips.join(" · "),
            tagIcon: Sparkles,
            primaryText: "Discuss Project →",
            secondaryText: "Creative Brief",
            link: p.link,
          })),
        ];
        return merged;
    }
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "all", label: "Showcase All", icon: Layers },
    { id: "websites", label: "Websites Portfolio", icon: Globe },
    { id: "apps", label: "Ready Utilities", icon: Smartphone },
    { id: "concepts", label: "Design Concepts", icon: Sparkles },
  ];

  return (
    <div className="space-y-8">
      {/* Filtering Tab Group */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer border ${
                isActive
                  ? "bg-gradient-to-r from-[#20e0dc]/10 via-[#39a7ff]/10 to-[#8c6cff]/10 border-[#39a7ff]/40 text-slate-900 shadow-[0_10px_25px_rgba(57,167,255,0.08)]"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? "text-[#20e0dc]" : "text-slate-600"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid Container */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects().map((project, idx) => {
            const TagIcon = project.tagIcon;
            return (
              <motion.article
                key={project.title + idx}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gradient-to-br from-[#0c1627]/90 to-[#060b14]/95 border border-slate-200 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[rgba(57,167,255,0.25)] transition-all flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#0c1627]/50 shrink-0">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/20 to-transparent opacity-80" />

                  {/* Badge floating */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-[#060b14]/80 text-[#20e0dc] border border-[rgba(32,224,220,0.2)] backdrop-blur-md">
                    <TagIcon className="w-3 h-3" />
                    {project.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    {/* Tech details or price helper */}
                    <span className="text-[10px] font-black text-[#8c6cff] uppercase tracking-widest block">
                      {project.secondaryText || project.badge}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-[#39a7ff] transition-all tracking-tight line-clamp-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  {/* Action Link Row */}
                  <div className="pt-2 flex items-center justify-between gap-3 mt-auto">
                    {"isApp" in project && project.isApp ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-[#0c1627] text-[#20e0dc] border border-[rgba(32,224,220,0.2)] hover:bg-[#20e0dc]/5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {project.primaryText}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (project.type === "Website Demo") {
                            onOrderTrigger("Website Development");
                          } else {
                            onOrderTrigger(project.title);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {project.primaryText}
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
