
import React from "react";
import { Sparkles, DropletIcon, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Technology</h2>
          <p className="text-gray-600 dark:text-gray-400">
            AKAR combines cutting-edge technology with sustainable farming practices to create the most efficient growing systems.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden mb-16 h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <img 
            src="/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png" 
            alt="AKAR Real-time Monitoring" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-lg">
            <h3 className="text-3xl font-bold text-white mb-4">Data-Driven Farming</h3>
            <p className="text-white/90 mb-6">
              Our proprietary sensor network continuously monitors all critical growing parameters, ensuring optimal conditions and maximum crop yields.
            </p>
            <Button variant="apple" className="rounded-full">
              Explore Technology
            </Button>
          </div>
        </div>
        
        {/* Technology feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">AI-Powered Growth Optimization</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Machine learning algorithms analyze growing conditions to provide recommendations for improved yields.
            </p>
          </div>
          
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <DropletIcon className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Automated Irrigation Systems</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Precise water delivery systems ensure each plant receives exactly what it needs, when it needs it.
            </p>
          </div>
          
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <LineChart className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Advanced Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive data collection and analysis for continuous improvement of farming operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
