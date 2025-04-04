
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface HomeHeaderProps {
  language: "en" | "id" | "ko";
  setLanguage?: React.Dispatch<React.SetStateAction<"en" | "id" | "ko">>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ language, setLanguage }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 fixed top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AKAR Farm</Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage && setLanguage("en")}
              className={`px-2 py-1 rounded ${language === "en" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage && setLanguage("id")}
              className={`px-2 py-1 rounded ${language === "id" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              ID
            </button>
            <button 
              onClick={() => setLanguage && setLanguage("ko")}
              className={`px-2 py-1 rounded ${language === "ko" ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              KO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is what was missing - we need to export both the component and its type
export { HomeHeader };
export default HomeHeader;
