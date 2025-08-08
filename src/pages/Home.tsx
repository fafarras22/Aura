
import React, { useState, useEffect } from "react";
import { CallToAction } from "@/components/home/CallToAction";
import { WhyInvestSection } from "@/components/home/WhyInvestSection";
import { HomeProjects } from "@/components/home/HomeProjects";
import { Testimonials } from "@/components/home/Testimonials";
import { HowAkarWorks } from "@/components/home/HowAkarWorks";
import { AseanImpact } from "@/components/home/AseanImpact";
import { AkarTokenSection } from "@/components/home/AkarTokenSection";
import { QuickInvestment } from "@/components/home/QuickInvestment";
import { HeroSection } from "@/components/home/HeroSection";
import { IndonesiaImpactSection } from "@/components/home/IndonesiaImpactSection"; 
import { TokenizationSection } from "@/components/home/TokenizationSection";
import { Footer } from "@/components/layout/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import { useNavigate } from "react-router-dom";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { SEOMetadata } from "@/components/shared/SEOMetadata";
import { InvestmentDisclaimer } from "@/components/home/InvestmentDisclaimer";
import { AboutSection } from "@/components/home/AboutSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { ArbitrumEcosystemSection } from "@/components/home/ArbitrumEcosystemSection";
import { TabsSection } from "@/components/home/TabsSection";

// Update the type definition to match what's accepted by HomeHeader
type SupportedLanguage = 'en' | 'id' | 'ko';

const Home = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const navigate = useNavigate();
  
  // Load custom font
  useEffect(() => {
    // Add Playfair Display font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Mock data for featured container projects
  const featuredContainers: ContainerProject[] = getMockContainerProjects();
  
  // Mock data for token metrics
  const tokenMetrics = {
    price: 1.85,
    change24h: 3.2,
    totalSupply: 100000000,
    circulatingSupply: 45000000,
    marketCap: 83250000,
    stakedAmount: 32000000,
    stakingAPY: 15.5
  };
  
  // Translation content
  const content = {
    hero: {
      title: language === 'en' ? "Invest in Container Farming of" : 
             language === 'id' ? "Investasi dalam Pertanian Kontainer" : 
             "컨테이너 농업에 투자하세요",
      subtitle: language === 'en' ? 
        "Connect with innovative indoor farming containers across Jakarta. Earn transparent yields while supporting sustainable agriculture through $UMBI tokens." : 
        language === 'id' ? 
        "Terhubung dengan kontainer pertanian dalam ruangan yang inovatif di seluruh Jakarta. Dapatkan hasil yang transparan sambil mendukung pertanian berkelanjutan melalui token $UMBI." : 
        "자카르타 전역의 혁신적인 실내 농업 컨테이너와 연결하세요. $UMBI 토큰을 통해 지속 가능한 농업을 지원하면서 투명한 수익을 얻으세요.",
      explore: language === 'en' ? "Explore Investment Projects" : 
               language === 'id' ? "Jelajahi Proyek Investasi" : 
               "투자 프로젝트 탐색",
      learnMore: language === 'en' ? "How It Works" : 
                 language === 'id' ? "Bagaimana Cara Kerjanya" : 
                 "작동 방식"
    },
    tokenization: {
      title: language === 'en' ? "Container Farm Tokenization" : 
             language === 'id' ? "Tokenisasi Pertanian Kontainer" : 
             "컨테이너 농장 토큰화",
      description: language === 'en' ? 
        "Our platform tokenizes individual container farms, providing transparency, fractional ownership, and liquidity through $UMBI tokens." : 
        language === 'id' ? 
        "Platform kami mentokenisasi pertanian kontainer individu, memberikan transparansi, kepemilikan fraksional, dan likuiditas melalui token $UMBI." : 
        "당사 플랫폼은 개별 컨테이너 농장을 토큰화하여 $UMBI 토큰을 통해 투명성, 부분 소유권 및 유동성을 제공합니다."
    },
    about: {
      title: language === 'en' ? "Sustainable Urban Agriculture" : 
             language === 'id' ? "Pertanian Perkotaan Berkelanjutan" : 
             "지속 가능한 도시 농업",
      description: language === 'en' ? 
        "AKAR Farm combines container farming technology with blockchain to create accessible, transparent agricultural investments." : 
        language === 'id' ? 
        "AKAR Farm menggabungkan teknologi pertanian kontainer dengan blockchain untuk menciptakan investasi pertanian yang mudah diakses dan transparan." : 
        "AKAR 팜은 컨테이너 농업 기술과 블록체인을 결합하여 접근 가능하고 투명한 농업 투자를 창출합니다."
    },
    farmTypes: ["Lettuce", "Strawberry", "Kale", "Herbs", "Microgreens"]
  };
  
  // Handle navigation to project details page
  const handleContainerSelect = (containerId: string) => {
    navigate(`/project/${containerId}`);
  };
  
  return (
    <>
      <SEOMetadata
        title="AKAR Farm - Invest in Container Farming"
        description="Invest in sustainable container farming with AKAR. Explore container projects, stake $AGRI tokens, and earn yields while supporting urban agriculture."
        keywords="container farming, urban agriculture, agricultural investment, $AGRI tokens, sustainable farming, Jakarta farming, Indonesia agriculture"
        ogImage="/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
        canonicalUrl="https://akarfarm.com/"
      />
      
      {/* Fixed header */}
      <HomeHeader language={language} setLanguage={setLanguage} />
      
      <main>
        {/* Hero Section with animated images */}
        <HeroSection 
          content={content.hero}
          farmTypes={content.farmTypes}
          onExploreClick={() => navigate('/farm-projects')}
          onLearnMoreClick={() => navigate('/how-it-works')}
        />
        
        {/* Quick Investment Section - Moved up for easier access */}
        <QuickInvestment language={language} />
        
        {/* Why Invest Section */}
        <WhyInvestSection language={language} />
        
        {/* Call to Action Section */}
        <CallToAction 
          onExploreClick={() => navigate('/farm-projects')}
          onConnectWallet={() => navigate('/connect-wallet')}
        />
        
        {/* Home Projects Section */}
        <HomeProjects 
          featuredContainers={featuredContainers}
          onNavigate={navigate}
          onContainerSelect={handleContainerSelect}
        />
        
        {/* AGRI Token Section */}
        <AkarTokenSection 
          tokenMetrics={tokenMetrics}
          onNavigate={navigate}
        />
        
        {/* How AKAR Works Section */}
        <HowAkarWorks onExploreClick={() => navigate('/farm-projects')} />
        
        {/* About Section - New component for better SEO context */}
        <AboutSection content={content.about} />
        
        {/* Solutions Section */}
        <SolutionsSection language={language} />
        
        {/* Technology Section */}
        <TechnologySection language={language} />
        
        {/* Tabs Section with more detailed information */}
        <div className="container mx-auto px-4 py-12">
          <TabsSection language={language} />
        </div>
        
        {/* ASEAN Impact Section */}
        <AseanImpact />
        
        {/* Indonesia Impact Section */}
        <IndonesiaImpactSection language={language} />
        
        {/* Tokenization Section */}
        <TokenizationSection 
          language={language}
          content={content}
        />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Investment Disclaimer Section */}
        <InvestmentDisclaimer />
      </main>
      
      {/* Footer Section */}
      <Footer language={language} />
    </>
  );
};

export default Home;
