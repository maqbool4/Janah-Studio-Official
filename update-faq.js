import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Import FAQAccordion
code = code.replace(
  'import OrderModal from "./components/OrderModal";',
  'import OrderModal from "./components/OrderModal";\nimport FAQAccordion from "./components/FAQAccordion";'
);

// Add FAQAccordion before footer
const footerStr = `      {/* Footer */}`;
code = code.replace(
  footerStr,
  `      {/* FAQ Section */}\n      <FAQAccordion />\n\n      {/* Footer */}`
);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated with FAQ');
