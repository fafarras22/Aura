
import React from "react";
import { Leaf, SproutIcon, DropletIcon } from "lucide-react";

interface AboutSectionProps {
  content: {
    title: string;
    description: string;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
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
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Leaf className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Sustainable Farming</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our container farms use 95% less water than traditional farming methods while maximizing crop yield.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <SproutIcon className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Smart Technology</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced sensors monitor every aspect of the growing environment for optimal plant health.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <DropletIcon className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Water Efficiency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Precision irrigation and water recycling systems conserve this precious resource.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
