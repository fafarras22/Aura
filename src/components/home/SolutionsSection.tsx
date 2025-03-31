
import React from "react";
import { LeafyGreen, Database, BarChart2 } from "lucide-react";

interface SolutionsSectionProps {
  language: 'en' | 'id' | 'ko';
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ language }) => {
  const content = {
    en: {
      title: "Our Solutions",
      subtitle: "Comprehensive container farm solutions designed for maximum efficiency and minimal environmental impact.",
      cards: [
        {
          title: "Smart Container Farms",
          description: "IoT-enabled growing environments with precise climate control and automated nutrient delivery systems."
        },
        {
          title: "Blockchain Traceability",
          description: "Full transparency from seed to harvest with immutable blockchain records for complete supply chain visibility."
        },
        {
          title: "Real-Time Analytics",
          description: "Detailed growth and performance metrics to optimize yields and resource utilization."
        }
      ]
    },
    id: {
      title: "Solusi Kami",
      subtitle: "Solusi pertanian kontainer komprehensif yang dirancang untuk efisiensi maksimum dan dampak lingkungan minimal.",
      cards: [
        {
          title: "Pertanian Kontainer Pintar",
          description: "Lingkungan pertumbuhan berbasis IoT dengan kontrol iklim yang presisi dan sistem pengiriman nutrisi otomatis."
        },
        {
          title: "Pelacakan Blockchain",
          description: "Transparansi penuh dari benih hingga panen dengan catatan blockchain yang tidak dapat diubah untuk visibilitas rantai pasok yang lengkap."
        },
        {
          title: "Analitik Real-Time",
          description: "Metrik pertumbuhan dan kinerja yang detail untuk mengoptimalkan hasil dan pemanfaatan sumber daya."
        }
      ]
    },
    ko: {
      title: "우리의 솔루션",
      subtitle: "최대 효율성과 최소 환경 영향을 위해 설계된 종합적인 컨테이너 농장 솔루션.",
      cards: [
        {
          title: "스마트 컨테이너 농장",
          description: "정밀한 기후 제어와 자동화된 영양분 공급 시스템이 있는 IoT 기반 재배 환경."
        },
        {
          title: "블록체인 추적성",
          description: "완전한 공급망 가시성을 위한 불변의 블록체인 기록으로 씨앗부터 수확까지 완전한 투명성."
        },
        {
          title: "실시간 분석",
          description: "수확량과 자원 활용을 최적화하기 위한 상세한 성장 및 성능 지표."
        }
      ]
    }
  };

  const icons = [
    <LeafyGreen className="h-7 w-7 text-green-600" />,
    <Database className="h-7 w-7 text-green-600" />,
    <BarChart2 className="h-7 w-7 text-green-600" />
  ];

  return (
    <section id="solutions" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-3 dark:text-white">{content[language].title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content[language].cards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                {icons[index]}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
