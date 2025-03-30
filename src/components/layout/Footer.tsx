
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  language?: 'en' | 'id' | 'ko';
}

export const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const content = {
    en: {
      about: "About",
      solutions: "Solutions",
      technology: "Technology",
      tokenization: "Tokenization",
      impact: "Indonesia Impact",
      legal: "Legal",
      careers: "Careers",
      partners: "Partners",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      whitepaper: "Whitepaper",
      news: "News",
      rights: "© 2023 AKAR FarmWatch. All rights reserved.",
      address: "Jakarta Innovation Center, Indonesia"
    },
    id: {
      about: "Tentang",
      solutions: "Solusi",
      technology: "Teknologi",
      tokenization: "Tokenisasi",
      impact: "Dampak Indonesia",
      legal: "Hukum",
      careers: "Karir",
      partners: "Mitra",
      privacy: "Kebijakan Privasi",
      terms: "Ketentuan Layanan",
      whitepaper: "Whitepaper",
      news: "Berita",
      rights: "© 2023 AKAR FarmWatch. Seluruh hak cipta dilindungi.",
      address: "Pusat Inovasi Jakarta, Indonesia"
    },
    ko: {
      about: "소개",
      solutions: "솔루션",
      technology: "기술",
      tokenization: "토큰화",
      impact: "인도네시아 영향",
      legal: "법률",
      careers: "채용",
      partners: "파트너",
      privacy: "개인정보 보호정책",
      terms: "서비스 약관",
      whitepaper: "백서",
      news: "뉴스",
      rights: "© 2023 AKAR FarmWatch. 모든 권리 보유.",
      address: "자카르타 혁신 센터, 인도네시아"
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
              alt="AKAR Logo" 
              className="h-8 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              Smart container farming solutions powered by technology and blockchain for a sustainable future.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {content[language].address}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 dark:text-white">
              {content[language].solutions}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].about}
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].solutions}
                </a>
              </li>
              <li>
                <a href="#technology" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].technology}
                </a>
              </li>
              <li>
                <a href="#tokenization" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].tokenization}
                </a>
              </li>
              <li>
                <a href="#indonesia" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].impact}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 dark:text-white">
              {content[language].legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].careers}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].partners}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].terms}
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].whitepaper}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 dark:text-white">
              {content[language].news}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].news}
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            {content[language].rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
