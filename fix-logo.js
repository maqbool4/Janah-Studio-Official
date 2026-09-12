import fs from 'fs';

let xml = fs.readFileSync('janah-studio-blogger-theme.xml', 'utf8');

const navLogoSearch = `<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#20e0dc] to-[#39a7ff] p-[1px]">
            <div class="w-full h-full rounded-xl bg-[#0c1627] flex items-center justify-center">
              <i data-lucide="layers" class="w-5 h-5 text-[#20e0dc]"></i>
            </div>
          </div>`;
const navLogoReplace = `<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiinBEc6mMhFQyJgcz5RFm_15t-NUrCfWSNBycy5l_vnf34bl3JtimqxN13fWobq57au9dcGuVri2pg0VtyNxCBy94awpqRr15fT-3lUKYk5DLuFGU2OwlN_bvquuJZVuLfhGa9lqYpaEE9DT-K79tUA3imRy69tymv1oqe2m_mjRHHy3m1Es8DuvG4oa0/s1254/63361.png" alt="Janah Studio" class="h-10 w-auto max-w-[150px] object-contain drop-shadow-md" />`;

const footerLogoSearch = `<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20e0dc] to-[#39a7ff] p-[1px]">
          <div class="w-full h-full rounded-lg bg-[#0c1627] flex items-center justify-center">
            <i data-lucide="layers" class="w-4 h-4 text-[#20e0dc]"></i>
          </div>
        </div>`;
const footerLogoReplace = `<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiinBEc6mMhFQyJgcz5RFm_15t-NUrCfWSNBycy5l_vnf34bl3JtimqxN13fWobq57au9dcGuVri2pg0VtyNxCBy94awpqRr15fT-3lUKYk5DLuFGU2OwlN_bvquuJZVuLfhGa9lqYpaEE9DT-K79tUA3imRy69tymv1oqe2m_mjRHHy3m1Es8DuvG4oa0/s1254/63361.png" alt="Janah Studio" class="h-8 w-auto max-w-[120px] object-contain drop-shadow-md" />`;

xml = xml.replace(navLogoSearch, navLogoReplace);
xml = xml.replace(footerLogoSearch, footerLogoReplace);

fs.writeFileSync('janah-studio-blogger-theme.xml', xml);
console.log('Logos replaced successfully.');
