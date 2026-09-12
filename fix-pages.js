import fs from 'fs';

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
home = home.replace('onOrder={() => handleOrderTrigger(service.title)}', 'onOrderTrigger={() => handleOrderTrigger(service.title)}');
home = home.replace('index={idx}', ''); // remove unused prop
fs.writeFileSync('src/pages/Home.tsx', home);

let services = fs.readFileSync('src/pages/Services.tsx', 'utf8');
services = services.replace(/onOrder=\{/g, 'onOrderTrigger={');
services = services.replace(/tier=\{tier\}/g, 'plan={tier}');
services = services.replace(/index=\{idx\}/g, '');
fs.writeFileSync('src/pages/Services.tsx', services);

console.log('Fixed pages');
