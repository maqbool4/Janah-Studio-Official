export interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
  price: number;
  unit: string;
  items: string[];
}

export interface Pricing {
  service: string;
  desc: string;
  price: number;
  unit?: string;
  includes: string[];
  category: string;
}

export interface Project {
  title: string;
  desc: string;
  img: string;
  chips: string[];
  link: string;
  category: string;
}

export interface AppItem {
  title: string;
  desc: string;
  icon: string;
  paid: boolean;
  url: string;
}

export interface WebsiteShowcase {
  title: string;
  desc: string;
  img: string;
  tech: string;
  link: string;
}

export interface BrandConfig {
  name: string;
  logo: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  socialUsername: string;
  blogUrl: string;
}

export interface AppConfig {
  brand: BrandConfig;
  stats: [string, string][];
  services: Service[];
  pricing: Pricing[];
  projects: Project[];
  apps: AppItem[];
  websites: WebsiteShowcase[];
}
