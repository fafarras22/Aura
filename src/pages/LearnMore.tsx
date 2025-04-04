
import React, { useState } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";

const LearnMore = () => {
  const [language, setLanguage] = useState<"en" | "id" | "ko">("en");

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader language={language} setLanguage={setLanguage} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Learn More About AKAR Farm</h1>
        
        <div className="prose max-w-none dark:prose-invert">
          <h2>Our Mission</h2>
          <p>
            AKAR Farm aims to revolutionize agricultural investing by connecting global investors with sustainable farming projects across Southeast Asia.
          </p>
          
          <h2>How It Works</h2>
          <p>
            Our platform tokenizes real agricultural assets, enabling fractional ownership and transparent yield distribution.
          </p>
          
          <h2>Impact</h2>
          <p>
            By investing through AKAR, you're supporting rural economies, sustainable farming practices, and food security across ASEAN.
          </p>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default LearnMore;
