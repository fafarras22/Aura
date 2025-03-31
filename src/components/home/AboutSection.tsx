
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
    <section 
      id="about" 
      className="bg-white dark:bg-gray-950 py-8 md:py-10"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 id="about-heading" className="text-3xl font-bold mb-3 dark:text-white" itemProp="name">{content.title}</h2>
          <p className="text-gray-600 dark:text-gray-400" itemProp="description">
            {content.description}
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {features.map((feature, index) => (
            <div key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content={`${index + 1}`} />
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
