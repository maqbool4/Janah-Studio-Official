import React, { useEffect, useRef } from "react";

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = "" }: BannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Create an isolated iframe to safely execute the Adsterra script and render the ad.
    // This ensures independent execution, zero ID collisions across multiple banner placements,
    // and prevents React Virtual DOM reconciliation issues during route navigation.
    const iframe = document.createElement("iframe");
    iframe.title = "Advertisement";
    iframe.style.width = "100%";
    iframe.style.maxWidth = "728px";
    iframe.style.height = "90px";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.background = "transparent";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameBorder", "0");
    iframe.setAttribute("allowTransparency", "true");

    el.innerHTML = "";
    el.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              * { box-sizing: border-box; margin: 0; padding: 0; }
              html, body {
                width: 100%;
                height: 100%;
                background: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }
              #container-4a72a9363ebd7283bb81befd644783c7 {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 90px;
              }
            </style>
          </head>
          <body>
            <script async="async" data-cfasync="false" src="https://pl31411689.profitableratecpmnetwork.com/4a72a9363ebd7283bb81befd644783c7/invoke.js"></script>
            <div id="container-4a72a9363ebd7283bb81befd644783c7"></div>
          </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 my-8 ${className}`}>
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 select-none">
          Advertisement
        </span>
        <div
          ref={containerRef}
          className="w-full min-h-[90px] max-w-[760px] rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center p-2 shadow-xs transition-all overflow-hidden"
        >
          <div id="container-4a72a9363ebd7283bb81befd644783c7" className="w-full flex justify-center items-center">
            {/* Fallback container for automated bots & crawlers */}
          </div>
        </div>
      </div>
    </div>
  );
}

