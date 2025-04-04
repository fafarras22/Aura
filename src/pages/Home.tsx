
import React, { useState } from "react";
import { CallToAction } from "@/components/home/CallToAction";
import { WhyInvestSection } from "@/components/home/WhyInvestSection";
import { HomeProjects } from "@/components/home/HomeProjects";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/AppHeader";
import { useNavigate } from "react-router-dom";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { Helmet } from "react-helmet";

// Update the type definition to match what's accepted by AppHeader
type SupportedLanguage = 'en' | 'id' | 'ko';

const Home = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const navigate = useNavigate();
  
  // Mock data for featured container projects
  const featuredContainers: ContainerProject[] = getMockContainerProjects();
  
  // Handle navigation to project details page
  const handleContainerSelect = (containerId: string) => {
    navigate(`/project/${containerId}`);
  };
  
  // Handle language selection
  const handleLanguageSelect = (lang: string) => {
    if (lang === 'en' || lang === 'id' || lang === 'ko') {
      setLanguage(lang as SupportedLanguage);
    } else {
      // Default to English if unsupported language
      setLanguage('en');
    }
  };

  return (
    <>
      <Helmet>
        <title>AKAR Farm - Invest in Sustainable Agriculture</title>
        <meta 
          name="description" 
          content="Invest in sustainable agriculture with AKAR Farm. Explore container projects, earn sustainable returns, and support rural economies in ASEAN." 
        />
      </Helmet>
      
      {/* Fixed header */}
      <AppHeader 
        language={language}
        setLanguage={handleLanguageSelect}
      />
      
      <main className="mt-16">
        {/* Call to Action Section */}
        <CallToAction 
          onExploreClick={() => navigate('/projects')}
          onConnectWallet={() => alert('Connect Wallet clicked!')}
        />
        
        {/* Why Invest Section */}
        <WhyInvestSection />
        
        {/* Home Projects Section */}
        <HomeProjects 
          featuredContainers={featuredContainers}
          onNavigate={navigate}
          onContainerSelect={handleContainerSelect}
        />
        
        {/* Testimonials Section */}
        <Testimonials />
      </main>
      
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home;
