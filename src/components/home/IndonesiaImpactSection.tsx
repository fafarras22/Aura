
import React from "react";
import { StatsGrid } from "./indonesia-impact/StatsGrid";
import { ChallengesCard } from "./indonesia-impact/ChallengesCard";
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
      ],
      challenges: {
        title: "Challenges",
        items: [
          "Limited arable land in densely populated areas",
          "Water scarcity in eastern regions",
          "Climate change affecting traditional farming",
          "Supply chain inefficiencies increasing food costs"
        ]
      },
      solutions: {
        title: "Container Solutions",
        items: [
          "Space-efficient vertical farming reduces land usage by 90%",
          "Water recycling systems reduce consumption by 95%",
          "Temperature-controlled environments ensure year-round production",
          "Direct-to-consumer blockchain tracking reduces middlemen costs"
        ]
      }
    },
    id: {
      title: "Dampak Indonesia",
      subtitle: "Mengatasi tantangan pertanian di seluruh Indonesia dengan solusi pertanian kontainer yang inovatif.",
      stats: [
        { label: "Petani Pedesaan", value: "70Jt+" },
        { label: "Luas Lahan", value: "3,2Jt km²" },
        { label: "Rawan Pangan", value: "25,2Jt" },
        { label: "Pengguna AKAR", value: "5.000+" }
      ],
      challenges: {
        title: "Tantangan",
        items: [
          "Lahan pertanian terbatas di daerah padat penduduk",
          "Kelangkaan air di wilayah timur",
          "Perubahan iklim memengaruhi pertanian tradisional",
          "Inefisiensi rantai pasok meningkatkan biaya pangan"
        ]
      },
      solutions: {
        title: "Solusi Kontainer",
        items: [
          "Pertanian vertikal yang hemat ruang mengurangi penggunaan lahan hingga 90%",
          "Sistem daur ulang air mengurangi konsumsi hingga 95%",
          "Lingkungan dengan suhu terkontrol memastikan produksi sepanjang tahun",
          "Pelacakan blockchain langsung ke konsumen mengurangi biaya perantara"
        ]
      }
    },
    ko: {
      title: "인도네시아 영향",
      subtitle: "혁신적인 컨테이너 농업 솔루션으로 인도네시아 전역의 농업 문제 해결.",
      stats: [
        { label: "농촌 농부", value: "7천만+" },
        { label: "토지 면적", value: "320만 km²" },
        { label: "식량 불안정", value: "2,520만" },
        { label: "AKAR 사용자", value: "5,000+" }
      ],
      challenges: {
        title: "도전 과제",
        items: [
          "인구 밀집 지역의 경작지 부족",
          "동부 지역의 물 부족",
          "전통 농업에 영향을 미치는 기후 변화",
          "식품 비용을 증가시키는 공급망 비효율성"
        ]
      },
      solutions: {
        title: "컨테이너 솔루션",
        items: [
          "공간 효율적인 수직 농업으로 토지 사용량 90% 감소",
          "물 재활용 시스템으로 소비량 95% 감소",
          "온도 조절 환경으로 연중 생산 보장",
          "소비자 직접 블록체인 추적으로 중개인 비용 절감"
        ]
      }
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          <ChallengesCard 
            title={content[language].challenges.title} 
            challenges={content[language].challenges.items} 
          />
          <ChallengesCard 
            title={content[language].solutions.title} 
            challenges={content[language].solutions.items} 
            isPositive={true}
          />
        </div>
        
        <ImpactLocations language={language} />
      </div>
    </section>
  );
};
