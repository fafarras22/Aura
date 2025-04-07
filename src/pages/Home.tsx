
import React, { useState } from "react";
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
import { Helmet } from "react-helmet";
import { InvestmentDisclaimer } from "@/components/home/InvestmentDisclaimer";

// Update the type definition to match what's accepted by HomeHeader
type SupportedLanguage = 'en' | 'id' | 'ko';

const Home = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const navigate = useNavigate();
  
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
      title: "Invest in Container Farming of",
      subtitle: "Connect with innovative indoor farming containers across Jakarta. Earn transparent yields while supporting sustainable agriculture through $AKR tokens.",
      explore: "Explore Containers",
      learnMore: "How It Works"
    },
    tokenization: {
      title: "Container Farm Tokenization",
      description: "Our platform tokenizes individual container farms, providing transparency, fractional ownership, and liquidity through $AKR tokens."
    },
    farmTypes: ["Lettuce", "Strawberry", "Kale", "Herbs", "Microgreens"]
  };
  
  // Handle navigation to project details page
  const handleContainerSelect = (containerId: string) => {
    navigate(`/project/${containerId}`);
  };
  
  return (
    <>
      <Helmet>
        <title>AKAR Farm - Invest in Container Farming</title>
        <meta 
          name="description" 
          content="Invest in container farming with AKAR Farm. Explore container projects, stake $AKR tokens, and earn sustainable returns through stAKR." 
        />
      </Helmet>
      
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
        
        {/* Call to Action Section */}
        <CallToAction 
          onExploreClick={() => navigate('/farm-projects')}
          onConnectWallet={() => navigate('/connect-wallet')}
        />
        
        {/* How AKAR Works Section */}
        <HowAkarWorks onExploreClick={() => navigate('/farm-projects')} />
        
        {/* Why Invest Section */}
        <WhyInvestSection />
        
        {/* Home Projects Section */}
        <HomeProjects 
          featuredContainers={featuredContainers}
          onNavigate={navigate}
          onContainerSelect={handleContainerSelect}
        />
        
        {/* AKR Token Section */}
        <AkarTokenSection 
          tokenMetrics={tokenMetrics}
          onNavigate={navigate}
        />
        
        {/* Quick Investment Section */}
        <QuickInvestment />
        
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
