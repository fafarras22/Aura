
import React from "react";
import { IndonesiaMap } from "@/components/home/IndonesiaMap";

interface LocationInfoProps {
  title: string;
  description: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ title, description }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export const ImpactLocations: React.FC = () => {
  const locations = [
    {
      title: "Jakarta Hub",
      description: "Our flagship urban farming center serving Indonesia's capital"
    },
    {
      title: "Bali Eco-Center",
      description: "Sustainable tourism meets agriculture innovation"
    },
    {
      title: "Sulawesi Outreach",
      description: "Bringing technology to traditional farming communities"
    }
  ];

  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-semibold mb-6 dark:text-white">Our Growing Impact Across Indonesia</h3>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
        <IndonesiaMap />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {locations.map((location, index) => (
            <LocationInfo 
              key={index} 
              title={location.title} 
              description={location.description} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
