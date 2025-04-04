
import React, { useState } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";

const ExploreSolutions = () => {
  const [language, setLanguage] = useState<"en" | "id" | "ko">("en");

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader language={language} setLanguage={setLanguage} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Explore Our Solutions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Solution cards would go here */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Container Farming</h2>
            <p className="text-gray-600 mb-4">
              State-of-the-art container farms that maximize yield while minimizing resource usage.
            </p>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Fish Farming</h2>
            <p className="text-gray-600 mb-4">
              Sustainable aquaculture solutions focusing on popular ASEAN fish varieties.
            </p>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Rice Cultivation</h2>
            <p className="text-gray-600 mb-4">
              Modern rice farming techniques that increase yield while reducing water usage.
            </p>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default ExploreSolutions;
