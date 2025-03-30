
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
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  // Language content
  const content = {
    en: {
      hero: {
        title: "Container Farming. Tokenized.",
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
        title: "Pertanian Kontainer. Tertokenisasi.",
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
      <IndonesiaImpactSection />
      
      {/* Solutions section */}
      <SolutionsSection />
      
      {/* Technology section */}
      <TechnologySection />
      
      {/* Tokenization section */}
      <TokenizationSection language={language} content={content[language]} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
