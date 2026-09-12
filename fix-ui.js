import fs from 'fs';

let xml = fs.readFileSync('janah-studio-blogger-theme.xml', 'utf8');

// 1. Remove Footer Link
xml = xml.replace(
    '<a href="https://maqbool4.blogspot.com" class="font-black text-[#eef6ff] tracking-tight hover:text-[#39a7ff] transition-all">Janah Studio</a>',
    '<span class="font-black text-[#eef6ff] tracking-tight">Janah Studio</span>'
);

// 2. Fix Mobile Navigation
const navSearch = `<div class="hidden md:flex items-center gap-8">
          <a href="/#services" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Services</a>
          <a href="/#portfolio" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Portfolio</a>
          <a href="/#pricing" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Pricing</a>
          <a href="#blog-content" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Blog</a>
          <button onclick="openModal('General Inquiry')" class="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-[#eef6ff] hover:bg-[#39a7ff] hover:text-[#03101d] transition-all cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </div>`;

const navReplace = `<div class="hidden md:flex items-center gap-8">
          <a href="/#services" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Services</a>
          <a href="/#portfolio" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Portfolio</a>
          <a href="/#pricing" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Pricing</a>
          <a href="#blog-content" class="text-sm font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Blog</a>
          <button onclick="openModal('General Inquiry')" class="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-[#eef6ff] hover:bg-[#39a7ff] hover:text-[#03101d] transition-all cursor-pointer">
            Contact Us
          </button>
        </div>
        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center">
          <button onclick="toggleMobileMenu()" class="text-[#eef6ff] p-2 focus:outline-none">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu Dropdown -->
    <div id="mobileMenu" class="hidden md:hidden bg-[#081221]/95 backdrop-blur-xl border-b border-[rgba(126,180,255,0.1)] px-4 pt-2 pb-6 space-y-4 shadow-2xl">
      <a href="/#services" onclick="toggleMobileMenu()" class="block text-base font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Services</a>
      <a href="/#portfolio" onclick="toggleMobileMenu()" class="block text-base font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Portfolio</a>
      <a href="/#pricing" onclick="toggleMobileMenu()" class="block text-base font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Pricing</a>
      <a href="#blog-content" onclick="toggleMobileMenu()" class="block text-base font-semibold text-[#b8c7da] hover:text-[#39a7ff] transition-all">Blog</a>
      <button onclick="toggleMobileMenu(); openModal('General Inquiry')" class="w-full text-center px-6 py-3 rounded-xl bg-[#39a7ff] text-sm font-bold text-[#03101d] transition-all cursor-pointer mt-2">
        Contact Us
      </button>
    </div>`;

xml = xml.replace(navSearch, navReplace);

// 3. Fix CSS for responsiveness and Hide Subscribe Link
const cssSearch = `/* Blogger Widget Defaults Overrides */
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
    .blog-pager a:hover { background: #39a7ff; color: #03101d; }`;

const cssReplace = `/* Blogger Widget Defaults Overrides */
    .widget { margin: 0; }
    .main-inner { padding: 0; }
    
    /* Hide unwanted Blogger feed links (Subscribe to Post Items) */
    .feed-links { display: none !important; }
    
    /* Custom Styling for Blogger Native Posts to match Dark Theme */
    #blog-content h2.title { font-size: 2.5rem; font-weight: 900; text-align: center; color: #eef6ff; margin-bottom: 3rem; }
    
    /* Responsive Grid for Posts */
    .blog-posts { display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
    @media (min-width: 768px) {
      .blog-posts { gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
    }
    
    .item-view .blog-posts { display: block; max-width: 800px; margin: 0 auto; width: 100%; box-sizing: border-box; }
    
    /* Post Cards (Responsive) */
    .post-outer { 
      background: rgba(12, 22, 39, 0.95); 
      border: 1px solid rgba(126, 180, 255, 0.12); 
      border-radius: 1.5rem; 
      padding: 1.25rem; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.25); 
      transition: all 0.3s; 
      margin-bottom: 2rem; 
      box-sizing: border-box; 
      width: 100%; 
      overflow: hidden; 
    }
    @media (min-width: 768px) {
      .post-outer { padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.35); }
    }
    .post-outer:hover { border-color: rgba(57, 167, 255, 0.22); transform: translateY(-4px); }
    
    .item-view .post-outer { padding: 1.25rem; background: #0c1627; transform: none !important; border-color: rgba(126, 180, 255, 0.12) !important; box-shadow: none; }
    @media (min-width: 768px) {
      .item-view .post-outer { padding: 3rem; }
    }
    
    .post-title { font-size: 1.5rem; font-weight: 900; color: #eef6ff; margin-bottom: 0.75rem; line-height: 1.2; word-break: break-word; }
    .item-view .post-title { font-size: 2rem; margin-bottom: 1.25rem; }
    @media (min-width: 768px) {
      .item-view .post-title { font-size: 2.5rem; margin-bottom: 1.5rem; }
    }
    
    .post-title a { color: #eef6ff; text-decoration: none; transition: color 0.3s; }
    .post-title a:hover { color: #39a7ff; }
    
    .date-header { font-size: 0.75rem; color: #9aacc4; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
    
    /* Responsive Content inside Post */
    .post-body { 
      font-size: 0.95rem; 
      line-height: 1.8; 
      color: #b8c7da; 
      overflow-wrap: break-word; 
      word-wrap: break-word; 
      word-break: break-word; 
      max-width: 100%;
    }
    .post-body img, .post-body iframe, .post-body video, .post-body object { 
      max-width: 100% !important; 
      height: auto !important; 
      border-radius: 0.75rem; 
      margin-bottom: 1rem; 
    }
    .post-body a { color: #39a7ff; text-decoration: none; font-weight: 600; }
    
    .post-footer { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.8rem; color: #687b91; }
    .post-footer-line { margin-bottom: 0.5rem; }
    .post-footer a { color: #20e0dc; font-weight: bold; text-decoration: none; }
    .post-footer a:hover { color: #39a7ff; }
    
    .blog-pager { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; }
    .blog-pager a { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: 999px; color: #eef6ff; font-weight: bold; text-decoration: none; font-size: 0.875rem; transition: all 0.3s; text-align: center; flex: 1; min-width: 120px; max-width: max-content; }
    .blog-pager a:hover { background: #39a7ff; color: #03101d; }`;

xml = xml.replace(cssSearch, cssReplace);

// 4. Add Javascript for mobile menu
const jsSearch = `function handleQuickScroll(id) {`;
const jsReplace = `function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
      }
    }

    function handleQuickScroll(id) {`;

xml = xml.replace(jsSearch, jsReplace);

fs.writeFileSync('janah-studio-blogger-theme.xml', xml);
console.log('Mobile menu, responsiveness, and link fixes applied successfully.');
