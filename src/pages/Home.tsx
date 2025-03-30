
import React, { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { IndonesiaImpactSection } from "@/components/home/IndonesiaImpactSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { TokenizationSection } from "@/components/home/TokenizationSection";

const Home = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');

  // Language content
  const content = {
    en: {
      hero: {
        title: "Farming for Everyone. Tokenized.",
        subtitle: "Revolutionary urban farming technology meets blockchain investment. Sustainable farming now accessible to everyone.",
        explore: "Explore Solutions",
        learnMore: "Learn More"
      },
      about: {
        title: "About AKAR",
        description: "Smart container technology. Blockchain powered. Future of farming."
      },
      tokenization: {
        title: "Invest in Agriculture's Future",
        description: "Own a stake in container farms through secure blockchain technology. Simple. Transparent. Rewarding."
      }
    },
    id: {
      hero: {
        title: "Pertanian untuk Semua. Tertokenisasi.",
        subtitle: "Teknologi pertanian urban revolusioner bertemu investasi blockchain. Pertanian berkelanjutan kini dapat diakses semua orang.",
        explore: "Jelajahi Solusi",
        learnMore: "Pelajari Lebih Lanjut"
      },
      about: {
        title: "Tentang AKAR",
        description: "Teknologi kontainer pintar. Didukung blockchain. Masa depan pertanian."
      },
      tokenization: {
        title: "Investasi di Masa Depan Pertanian",
        description: "Miliki saham di pertanian kontainer melalui teknologi blockchain yang aman. Sederhana. Transparan. Menguntungkan."
      }
    },
    ko: {
      hero: {
        title: "모두를 위한 농업. 토큰화.",
        subtitle: "혁신적인 도시 농업 기술과 블록체인 투자의 만남. 지속 가능한 농업이 이제 모두에게 접근 가능합니다.",
        explore: "솔루션 탐색",
        learnMore: "더 알아보기"
      },
      about: {
        title: "아카르 소개",
        description: "스마트 컨테이너 기술. 블록체인 기반. 농업의 미래."
      },
      tokenization: {
        title: "농업의 미래에 투자하세요",
        description: "안전한 블록체인 기술을 통해 컨테이너 농장의 지분을 소유하세요. 간단하고. 투명하고. 보람찬."
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header/Navigation */}
      <HomeHeader language={language} setLanguage={setLanguage} />

      {/* Hero section */}
      <HeroSection content={content[language].hero} />

      {/* About section */}
      <AboutSection content={content[language].about} />
      
      {/* Indonesia Impact section */}
      <IndonesiaImpactSection language={language} />
      
      {/* Solutions section */}
      <SolutionsSection language={language} />
      
      {/* Technology section */}
      <TechnologySection language={language} />
      
      {/* Tokenization section */}
      <TokenizationSection language={language} content={content[language]} />
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Home;
