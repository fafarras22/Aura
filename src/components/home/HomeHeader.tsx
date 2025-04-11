
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { Wallet, ChevronDown, LineChart, Leaf, BarChart2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo/Logo";

interface HomeHeaderProps {
  language: 'en' | 'id' | 'ko';
  setLanguage: (language: 'en' | 'id' | 'ko') => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      invest: "Invest",
      howItWorks: "How It Works",
      farmMonitoring: "Farm Monitoring",
      about: "About",
      aboutUs: "About Us",
      whitepaper: "Whitepaper",
      careers: "Careers",
      partners: "Partners",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      legalInfo: "Legal Information",
      connect: "Connect"
    },
    id: {
      invest: "Investasi",
      howItWorks: "Cara Kerja",
      farmMonitoring: "Pemantauan Pertanian",
      about: "Tentang",
      aboutUs: "Tentang Kami",
      whitepaper: "Whitepaper",
      careers: "Karir",
      partners: "Mitra",
      legal: "Hukum",
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Ketentuan Layanan",
      legalInfo: "Informasi Hukum",
      connect: "Hubungkan"
    },
    ko: {
      invest: "투자",
      howItWorks: "작동 방식",
      farmMonitoring: "농장 모니터링",
      about: "소개",
      aboutUs: "회사 소개",
      whitepaper: "백서",
      careers: "채용",
      partners: "파트너",
      legal: "법률",
      privacyPolicy: "개인정보 보호정책",
      termsOfService: "서비스 약관",
      legalInfo: "법률 정보",
      connect: "연결"
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="link" className="p-0" onClick={() => navigate('/')}>
            <Logo size="lg" />
          </Button>
        </div>
        
        <nav className="hidden md:flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1 font-medium">
                <Leaf className="h-4 w-4 mr-1 text-primary" />
                {content[language].invest} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/farm-projects')} className="gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                Container Projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/tokenization')} className="gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                $AKR Tokenization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="link" className="font-medium" onClick={() => navigate('/how-it-works')}>
            <LineChart className="h-4 w-4 mr-1 text-primary" />
            {content[language].howItWorks}
          </Button>
          
          <Button variant="link" className="font-medium" onClick={() => navigate('/sensors')}>
            {content[language].farmMonitoring}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1 font-medium">
                {content[language].about} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/about')}>
                {content[language].aboutUs}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/whitepaper')}>
                {content[language].whitepaper}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/careers')}>
                {content[language].careers}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/partners')}>
                {content[language].partners}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1 font-medium">
                {content[language].legal} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/privacy-policy')}>
                {content[language].privacyPolicy}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/terms-of-service')}>
                {content[language].termsOfService}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/legal')}>
                {content[language].legalInfo}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <ModeToggle />
          <Button size="sm" onClick={() => navigate('/connect-wallet')} className="gap-1 bg-primary hover:bg-primary/90 font-medium">
            <Wallet className="h-4 w-4" />
            {content[language].connect}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
