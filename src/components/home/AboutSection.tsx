
import React from "react";
import { Leaf, SproutIcon, DropletIcon } from "lucide-react";
import { FeatureCard } from "@/components/home/about/FeatureCard";

interface AboutSectionProps {
  content: {
    title: string;
    description: string;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const features = [
    {
      icon: <Leaf className="text-primary w-6 h-6" />,
      title: "Sustainable Farming",
      description: "Our container farms use 95% less water than traditional farming methods while maximizing crop yield."
    },
    {
      icon: <SproutIcon className="text-primary w-6 h-6" />,
      title: "Smart Technology",
      description: "Advanced sensors monitor every aspect of the growing environment for optimal plant health."
    },
    {
      icon: <DropletIcon className="text-primary w-6 h-6" />,
      title: "Water Efficiency",
      description: "Precision irrigation and water recycling systems conserve this precious resource."
    }
  ];

  return (
    <section id="about" className="bg-white dark:bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{content.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {content.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
