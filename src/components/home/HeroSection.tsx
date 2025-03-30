
import React from "react";
import { AppleButton } from "@/components/ui/apple-button";

interface HeroSectionProps {
  content: {
    title: string;
    subtitle: string;
    explore: string;
    learnMore: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-accent/20 dark:from-gray-950 dark:via-gray-950 dark:to-accent/5"></div>
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {content.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <AppleButton variant="green" className="px-8 py-3">
                {content.explore}
              </AppleButton>
              <AppleButton variant="secondary" className="px-8 py-3">
                {content.learnMore}
              </AppleButton>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
              alt="Inside Container Farm" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
