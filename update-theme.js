import fs from 'fs';
import path from 'path';

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const replaceColors = (content) => {
  return content
    // Backgrounds
    .replace(/bg-\[#02050b\]/g, 'bg-transparent')
    .replace(/bg-\[#030914\]\/85/g, 'bg-white/90')
    .replace(/bg-\[#030914\]/g, 'bg-white')
    .replace(/bg-\[#081221\]\/80/g, 'bg-white/90')
    .replace(/bg-\[#081221\]\/50/g, 'bg-white/50')
    .replace(/bg-\[#081221\]/g, 'bg-white')
    .replace(/bg-\[#020812\]\/70/g, 'bg-slate-50')
    .replace(/bg-\[#020812\]/g, 'bg-slate-50')
    .replace(/bg-\[#0b1627\]\/80/g, 'bg-white/80')
    .replace(/bg-white\/5/g, 'bg-slate-100')
    .replace(/bg-white\/\[0\.02\]/g, 'bg-white')
    .replace(/bg-white\/10/g, 'bg-slate-200')
    // Text
    .replace(/text-\[#eef6ff\]/g, 'text-slate-900')
    .replace(/text-\[#fff\]/g, 'text-slate-900')
    .replace(/text-\[#b9d9ff\]/g, 'text-slate-700')
    .replace(/text-\[#9aacc4\]/g, 'text-slate-600')
    .replace(/text-\[#aabbd0\]/g, 'text-slate-500')
    .replace(/text-\[#687b91\]/g, 'text-slate-500')
    .replace(/text-\[#eaf5ff\]/g, 'text-slate-800')
    .replace(/placeholder-\[#5a6d85\]/g, 'placeholder-slate-400')
    // Borders
    .replace(/border-\[rgba\(255,255,255,0\.05\)\]/g, 'border-slate-200')
    .replace(/border-\[rgba\(255,255,255,0\.06\)\]/g, 'border-slate-200')
    .replace(/border-\[rgba\(126,180,255,0\.08\)\]/g, 'border-slate-200')
    .replace(/border-\[rgba\(126,180,255,0\.12\)\]/g, 'border-slate-200')
    .replace(/border-\[rgba\(126,180,255,0\.16\)\]/g, 'border-slate-300')
    .replace(/border-white\/10/g, 'border-slate-200')
    .replace(/border-white\/20/g, 'border-slate-300')
    // Hover states
    .replace(/hover:bg-\[#0c1e36\]/g, 'hover:bg-slate-50')
    .replace(/hover:border-\[#39a7ff\]\/50/g, 'hover:border-blue-300')
    .replace(/hover:bg-white\/10/g, 'hover:bg-slate-200');
};

const files = walkSync('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = replaceColors(content);
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated:', file);
  }
});
