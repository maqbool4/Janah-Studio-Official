import { AppConfig } from "./types";

export const CONFIG: AppConfig = {
  brand: {
    name: "Janah Studio",
    logo: "https://i.ibb.co/1YkBtgtZ/page-4.png",
    whatsapp: "923295430114",
    whatsappDisplay: "+92 329 543 0114",
    email: "janahstudio.official@gmail.com",
    socialUsername: "Janah.studio",
    blogUrl: "#"
  },
  stats: [
    ["50+", "Websites Created"],
    ["10+", "Applications Built"],
    ["100+", "Designs Delivered"],
    ["50+", "Happy Clients"]
  ],
  services: [
    {
      id: "web",
      icon: "Globe",
      title: "Website Development",
      desc: "Fast, responsive, and secure websites tailored for individuals, creators, and modern businesses.",
      price: 1000,
      unit: "starting",
      items: [
        "Blogger Custom Websites",
        "Personal & Portfolio Sites",
        "Business & Startup Sites",
        "Doctor & Clinic Sites",
        "Real Estate & Restaurant Portals",
        "High-Converting Landing Pages",
        "Custom Domain & Hosting Setup"
      ]
    },
    {
      id: "app",
      icon: "Cpu",
      title: "Application Development",
      desc: "Custom online and offline applications designed for business utility, workflow automation, and speed.",
      price: 7000,
      unit: "starting",
      items: [
        "POS Billing Systems",
        "Inventory Tracking Apps",
        "Business Management Software",
        "Financial & Ledger Apps",
        "Offline Desktop Programs",
        "Online Cloud Applications",
        "Custom Automated Utilities"
      ]
    },
    {
      id: "ecom",
      icon: "ShoppingBag",
      title: "E-commerce Websites",
      desc: "Aesthetic, seamless online stores engineered to display products beautifully and convert clicks to sales.",
      price: 5000,
      unit: "starting",
      items: [
        "Affordable E-commerce Solutions",
        "Stunning Product Showcases",
        "Seamless WhatsApp Ordering Flow",
        "Mobile-Responsive Design",
        "Large Stores & CMS Integrations"
      ]
    },
    {
      id: "design",
      icon: "Palette",
      title: "Graphic Design",
      desc: "Professional visual design solutions to elevate your brand presence on social media and print marketing.",
      price: 300,
      unit: "per design",
      items: [
        "Social Media Campaign Designs",
        "Event Posters & Digital Banners",
        "Premium Business Cards & Stationery",
        "Visual Branding & Identity Systems",
        "Food & Restaurant Menu Layouts",
        "AI-Assisted Creative Artworks",
        "Print-Ready Marketing Materials"
      ]
    },
    {
      id: "video",
      icon: "Video",
      title: "Video Services",
      desc: "Dynamic short-form video editing and cutting-edge, AI-generated multimedia content.",
      price: 300,
      unit: "per minute",
      items: [
        "AI Video Creation & Art Direction",
        "Modern Short-Form & Reel Editing",
        "High-CTR Custom Thumbnails",
        "AI Talking Avatars & Presenters",
        "Photo-to-Video Transformations",
        "High-Impact Promotional Videos",
        "Voiceover & Soundtrack Matching"
      ]
    },
    {
      id: "data",
      icon: "Database",
      title: "Business Data Entry",
      desc: "Highly accurate and fast bulk data upload, sheet organizing, and catalog population.",
      price: 200,
      unit: "per 100 products",
      items: [
        "100 Products Cataloging — PKR 200",
        "500 Products Setup — PKR 1,000",
        "Product Image Sourcing & Cropping",
        "Image Enhancement & AI Upscaling",
        "Detailed Specification Management",
        "Structured Database CSV Exports",
        "POS Database Population"
      ]
    }
  ],
  pricing: [
    // Websites
    {
      service: "Simple Personal / Portfolio Website",
      desc: "A beautiful, lightning-fast digital resume or personal portfolio presence.",
      price: 1000,
      includes: ["100% Mobile responsive", "Core sections (About, Work, Contact)", "Easy Blogger deployment", "Social links integration"],
      category: "Websites"
    },
    {
      service: "Standard Business Website",
      desc: "A highly professional, multi-section business website with clear call-to-actions.",
      price: 5000,
      includes: ["Modern responsive UI", "Custom contact/enquiry system", "Google Maps & WhatsApp integration", "Speed optimized loading"],
      category: "Websites"
    },
    {
      service: "Premium Advanced Portal",
      desc: "An elite, customized web portal engineered for large projects and deep workflows.",
      price: 8000,
      includes: ["Complex customized components", "Custom structural visual logic", "Third-party platform integrations", "Premium asset curation"],
      category: "Websites"
    },
    // Applications
    {
      service: "Offline Desktop Application",
      desc: "A lightweight, secure, and fast local software application for business management.",
      price: 7000,
      includes: ["Interactive core workflow", "Local persistent data storage", "Offline cataloging & reporting", "Deployment & installation manual"],
      category: "Applications"
    },
    {
      service: "Cloud Connected Application",
      desc: "A secure, modern web-based application built with interactive charts and databases.",
      price: 18000,
      includes: ["Full web-based workflow", "Multi-device real-time sync", "Advanced client database engine", "Interactive visual metrics"],
      category: "Applications"
    },
    // Graphic Design
    {
      service: "Standard Brand Design",
      desc: "A single, eye-catching digital layout for promotional or social use.",
      price: 300,
      includes: ["Creative, original theme layout", "High-resolution output format", "Brand-aligned typography & colors", "1 Revision cycle included"],
      category: "Graphic Design"
    },
    {
      service: "Customized AI Visual Art",
      desc: "Cutting-edge design incorporating advanced AI generation tailored to your brief.",
      price: 500,
      includes: ["Custom AI concept exploration", "Ultra-high resolution upscaling", "Manual digital painting adjustments", "Commercial rights included"],
      category: "Graphic Design"
    },
    {
      service: "Editable Source Files Add-on",
      desc: "Get full layered access to editing files for future customization.",
      price: 500,
      includes: ["Fully structured layers & vectors", "Font package reference links", "SVG / PSD / Canva format export", "Lifetime assets backup"],
      category: "Graphic Design"
    },
    // Video
    {
      service: "AI Video Creation",
      desc: "Innovative AI-driven video synthesis with synthesized avatars, environments or voiceovers.",
      price: 300,
      unit: "/ minute",
      includes: ["AI video production pipeline", "Script formatting & timing", "High fidelity voice synthesis", "Automated accurate subtitles"],
      category: "Video"
    },
    {
      service: "Professional Video Editing",
      desc: "Seamless splicing, timing correction, color grading, and transition design.",
      price: 200,
      unit: "/ minute",
      includes: ["Precision timing cuts", "Advanced audio cleaning", "Engaging modern text animations", "Dynamic sound effects layer"],
      category: "Video"
    },
    {
      service: "High-CTR AI YouTube Thumbnail",
      desc: "Attention-grabbing, custom-designed thumbnail to maximize audience engagement.",
      price: 200,
      includes: ["Highly saturated, clickable concepts", "AI-enhanced visual styling", "Screaming text overlays", "A/B test ready assets"],
      category: "Video"
    },
    // Data Entry
    {
      service: "Business Data Entry Plan",
      desc: "Rapid and precise spreadsheet, POS, or inventory catalog system entry.",
      price: 200,
      unit: "/ 100 products",
      includes: ["100 products input with full detail", "Organized structured entries", "Basic formatting checks", "Fast delivery report"],
      category: "Data Entry"
    }
  ],
  projects: [
    {
      title: "Premium Startup Landing Platform",
      desc: "A beautifully animated, responsive SaaS website showing extreme visual polish and conversion-focused design.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      chips: ["Web", "Responsive", "Premium Theme"],
      link: "#",
      category: "Web"
    },
    {
      title: "Interactive Billing & POS Workspace",
      desc: "An intuitive web dashboard managing client ledgers, real-time items, checkout receipts, and product tracking.",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
      chips: ["App", "Offline POS", "State Engine"],
      link: "#",
      category: "App"
    },
    {
      title: "AI Creative Media Campaign",
      desc: "High-engagement social campaign assets utilizing cutting-edge neural style transfer and generative illustrations.",
      img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
      chips: ["AI Media", "Design", "Figma"],
      link: "#",
      category: "AI"
    }
  ],
  apps: [
    {
      title: "Janah POS Lite",
      desc: "A rapid, responsive offline point-of-sale utility built to simplify inventory and client receipts for small shops.",
      icon: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=150&q=80",
      paid: false,
      url: "#"
    },
    {
      title: "Janah Tracker Pro",
      desc: "Interactive inventory management software with support for categories, supplier ledgers, and fast search filter templates.",
      icon: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&q=80",
      paid: false,
      url: "#"
    },
    {
      title: "AI Smart Generator Studio",
      desc: "An automation utility wrapping standard media assets into high-converting posts. Full source configurations included.",
      icon: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
      paid: true,
      url: "#"
    }
  ],
  websites: [
    {
      title: "Alpha Tech Solutions",
      desc: "Clean responsive corporate agency portal showcasing standard services and client reviews.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tech: "Blogger Custom CMS",
      link: "#"
    },
    {
      title: "The Creative Studio Lab",
      desc: "Elegantly framed portfolio site featuring smooth hover transitions and custom responsive menus.",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      tech: "HTML5 · CSS3 · Dynamic JS",
      link: "#"
    },
    {
      title: "Saffron Dine",
      desc: "Modern digital restaurant portal with high-impact menus and a direct order-to-WhatsApp pipeline.",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      tech: "Responsive Landing",
      link: "#"
    }
  ]
};
