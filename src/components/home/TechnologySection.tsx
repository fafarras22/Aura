
import React from "react";
import { Server, CloudCog, Flower2, ShieldCheck } from "lucide-react";

interface TechnologySectionProps {
  language: 'en' | 'id' | 'ko';
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ language }) => {
  const content = {
    en: {
      title: "Our Technology",
      subtitle: "Cutting-edge technology powering the future of sustainable agriculture.",
      technologies: [
        {
          icon: <Server className="h-5 w-5 text-green-600" />,
          title: "IoT Sensors",
          description: "Advanced monitoring systems track temperature, humidity, nutrient levels, and plant health in real-time."
        },
        {
          icon: <CloudCog className="h-5 w-5 text-green-600" />,
          title: "AI-Powered Growth",
          description: "Machine learning algorithms optimize growing conditions based on historical data and real-time feedback."
        },
        {
          icon: <Flower2 className="h-5 w-5 text-green-600" />,
          title: "Hydroponic Systems",
          description: "Water-efficient growing technology that delivers nutrients directly to plant roots."
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
          title: "Arbitrum-Powered Security",
          description: "Built on Arbitrum's Layer 2 network for fast, secure, and cost-effective transactions with Ethereum-level security."
        }
      ]
    },
    id: {
      title: "Teknologi Kami",
      subtitle: "Teknologi mutakhir yang memacu masa depan pertanian berkelanjutan.",
      technologies: [
        {
          icon: <Server className="h-5 w-5 text-green-600" />,
          title: "Sensor IoT",
          description: "Sistem pemantauan canggih melacak suhu, kelembaban, tingkat nutrisi, dan kesehatan tanaman secara real-time."
        },
        {
          icon: <CloudCog className="h-5 w-5 text-green-600" />,
          title: "Pertumbuhan Berbasis AI",
          description: "Algoritma pembelajaran mesin mengoptimalkan kondisi pertumbuhan berdasarkan data historis dan umpan balik real-time."
        },
        {
          icon: <Flower2 className="h-5 w-5 text-green-600" />,
          title: "Sistem Hidroponik",
          description: "Teknologi pertumbuhan hemat air yang mengirimkan nutrisi langsung ke akar tanaman."
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
          title: "Keamanan Bertenaga Arbitrum",
          description: "Dibangun di jaringan Layer 2 Arbitrum untuk transaksi yang cepat, aman, dan hemat biaya dengan keamanan tingkat Ethereum."
        }
      ]
    },
    ko: {
      title: "우리의 기술",
      subtitle: "지속 가능한 농업의 미래를 이끄는 최첨단 기술.",
      technologies: [
        {
          icon: <Server className="h-5 w-5 text-green-600" />,
          title: "IoT 센서",
          description: "고급 모니터링 시스템이 온도, 습도, 영양소 수준 및 식물 건강을 실시간으로 추적합니다."
        },
        {
          icon: <CloudCog className="h-5 w-5 text-green-600" />,
          title: "AI 기반 성장",
          description: "머신러닝 알고리즘이 과거 데이터와 실시간 피드백을 기반으로 재배 조건을 최적화합니다."
        },
        {
          icon: <Flower2 className="h-5 w-5 text-green-600" />,
          title: "수경재배 시스템",
          description: "영양분을 식물 뿌리에 직접 전달하는 물 효율적인 재배 기술."
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
          title: "Arbitrum 기반 보안",
          description: "이더리움 수준의 보안과 함께 빠르고 안전하며 비용 효율적인 거래를 위해 Arbitrum Layer 2 네트워크에 구축되었습니다."
        }
      ]
    }
  };

  return (
    <section id="technology" className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-3 dark:text-white">{content[language].title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {content[language].subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {content[language].technologies.map((tech, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold dark:text-white">{tech.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-13">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
