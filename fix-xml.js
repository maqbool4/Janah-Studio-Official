const fs = require('fs');

let xml = fs.readFileSync('janah-studio-blogger-theme.xml', 'utf8');

// The error says: "The entity "copy" was referenced, but not declared."
// Line 1342 contains &copy; - Blogger XML doesn't like standard HTML entities.
// We need to replace &copy; with the actual unicode character © or its numeric reference &#169;

xml = xml.replace(/&copy;/g, '&#169;');

// Also updating the footer link as requested
// Replace: <span class="font-black text-[#eef6ff] tracking-tight">Janah Studio</span>
// With an anchor tag linking to maqbool4.blogspot.com
xml = xml.replace(
    /<span class="font-black text-\[#eef6ff\] tracking-tight">Janah Studio<\/span>/g,
    '<a href="https://maqbool4.blogspot.com" class="font-black text-[#eef6ff] tracking-tight hover:text-[#39a7ff] transition-all">Janah Studio</a>'
);

fs.writeFileSync('janah-studio-blogger-theme.xml', xml);
console.log('Fixed &copy; error and added footer link.');
