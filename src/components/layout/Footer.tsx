import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Globe } from "lucide-react";

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
      rights: "© 2025 AKAR Farm by PT Tumbuh Dimana Sadja, Jakarta, Indonesia. All rights reserved.",
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
      rights: "© 2025 AKAR Farm oleh PT Tumbuh Dimana Sadja, Jakarta, Indonesia. Seluruh hak cipta dilindungi.",
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
      rights: "© 2025 AKAR Farm by PT Tumbuh Dimana Sadja, 자카르타, 인도네시아. 모든 권리 보유.",
      address: "자카르타 혁신 센터, 인도네시아"
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png" 
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
                <Link to="/#about" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].about}
                </Link>
              </li>
              <li>
                <Link to="/#solutions" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].solutions}
                </Link>
              </li>
              <li>
                <Link to="/#technology" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].technology}
                </Link>
              </li>
              <li>
                <Link to="/#tokenization" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].tokenization}
                </Link>
              </li>
              <li>
                <Link to="/#indonesia" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                  {content[language].impact}
                </Link>
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
            <div className="mt-6 flex space-x-4">
              <a href="https://www.instagram.com/akar.farm" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/akarfarm" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.x.com/akar_farm" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.akar.cloud" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
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
