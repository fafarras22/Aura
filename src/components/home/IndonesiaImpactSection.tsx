
import React from "react";
import { MapPin, SproutIcon, LineChart } from "lucide-react";
import { IndonesiaMap } from "@/components/home/IndonesiaMap";

export const IndonesiaImpactSection: React.FC = () => {
  return (
    <section id="indonesia" className="bg-gradient-to-br from-primary/5 to-primary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Impact in Indonesia</h2>
          <p className="text-gray-600 dark:text-gray-400">
            AKAR's container farming technology is uniquely positioned to address Indonesia's agricultural challenges 
            and support sustainable development across the archipelago.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-primary">Addressing Indonesia's Unique Challenges</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 dark:text-white">Archipelago Distribution</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our container farms can be deployed across Indonesia's 17,000+ islands, bringing fresh produce to remote communities.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SproutIcon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 dark:text-white">Tropical Climate Adaptation</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our systems are specifically calibrated for Indonesia's tropical climate, ensuring optimal growing conditions year-round.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1 dark:text-white">Urban Food Security</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    As Indonesia's cities grow, our urban farming solutions help ensure food security and reduce transportation emissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h4 className="text-4xl font-bold text-primary mb-2">70%</h4>
              <p className="text-gray-600 dark:text-gray-400">Reduction in water usage compared to traditional farming in Indonesia</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h4 className="text-4xl font-bold text-primary mb-2">5x</h4>
              <p className="text-gray-600 dark:text-gray-400">More produce per square meter than conventional Indonesian farms</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
              <p className="text-gray-600 dark:text-gray-400">Monitoring with Indonesian-developed IoT technology</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h4 className="text-4xl font-bold text-primary mb-2">12+</h4>
              <p className="text-gray-600 dark:text-gray-400">Indonesian provinces where our containers are currently deployed</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Our Growing Impact Across Indonesia</h3>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <IndonesiaMap />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 dark:text-white">Jakarta Hub</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our flagship urban farming center serving Indonesia's capital</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 dark:text-white">Bali Eco-Center</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sustainable tourism meets agriculture innovation</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 dark:text-white">Sulawesi Outreach</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bringing technology to traditional farming communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
