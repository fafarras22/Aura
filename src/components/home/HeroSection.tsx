
import React from "react";
import { HeroContent } from "@/components/home/hero/HeroContent";
import { HeroImage } from "@/components/home/hero/HeroImage";
import { useMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    explore: string;
    learnMore: string;
  };
  onExploreClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  content, 
  onExploreClick,
  onLearnMoreClick
}) => {
  const isMobile = useMobile();
  
  return (
    <section className="relative w-full min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-accent/20 dark:from-gray-950 dark:via-gray-950 dark:to-accent/5"></div>
      <div className="container mx-auto px-4 z-10 py-8 md:py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-6' : 'gap-12'} items-center`}>
          {/* For mobile, show the HeroImage first, then content */}
          {isMobile ? (
            <>
              <HeroImage />
              <HeroContent 
                title={content.title}
                subtitle={content.subtitle}
                explore={content.explore}
                learnMore={content.learnMore}
                onExploreClick={onExploreClick}
                onLearnMoreClick={onLearnMoreClick}
              />
            </>
          ) : (
            <>
              <HeroContent 
                title={content.title}
                subtitle={content.subtitle}
                explore={content.explore}
                learnMore={content.learnMore}
                onExploreClick={onExploreClick}
                onLearnMoreClick={onLearnMoreClick}
              />
              <HeroImage />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
