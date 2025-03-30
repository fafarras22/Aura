
import React from "react";
import { StatsGrid } from "./indonesia-impact/StatsGrid";
import { ImpactLocations } from "./indonesia-impact/ImpactLocations";

interface IndonesiaImpactSectionProps {
  language: 'en' | 'id' | 'ko';
}

export const IndonesiaImpactSection: React.FC<IndonesiaImpactSectionProps> = ({ language }) => {
  const content = {
    en: {
      title: "Indonesia Impact",
      subtitle: "Addressing the agricultural challenges across Indonesia with innovative container farming solutions.",
      stats: [
        { label: "Rural Farmers", value: "70M+" },
        { label: "Land Coverage", value: "3.2M km²" },
        { label: "Food Insecure", value: "25.2M" },
        { label: "AKAR Users", value: "5,000+" }
      ]
    },
    id: {
      title: "Dampak Indonesia",
      subtitle: "Mengatasi tantangan pertanian di seluruh Indonesia dengan solusi pertanian kontainer yang inovatif.",
      stats: [
        { label: "Petani Pedesaan", value: "70Jt+" },
        { label: "Luas Lahan", value: "3,2Jt km²" },
        { label: "Rawan Pangan", value: "25,2Jt" },
        { label: "Pengguna AKAR", value: "5.000+" }
      ]
    },
    ko: {
      title: "인도네시아 영향",
      subtitle: "혁신적인 컨테이너 농업 솔루션으로 인도네시아 전역의 농업 문제 해결.",
      stats: [
        { label: "농촌 농부", value: "7천만+" },
        { label: "토지 면적", value: "320만 km²" },
        { label: "식량 불안정", value: "2,520만" },
        { label: "AKAR 사용자", value: "5,000+" }
      ]
    }
  };

  return (
    <section id="indonesia" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{content[language].title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {content[language].subtitle}
          </p>
        </div>

        <StatsGrid stats={content[language].stats} />
        
        <ImpactLocations language={language} />
      </div>
    </section>
  );
};
