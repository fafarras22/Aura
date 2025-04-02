
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Shield, Leaf, Terminal } from "lucide-react";

interface TabsSectionProps {
  language: 'en' | 'id' | 'ko';
}

export const TabsSection: React.FC<TabsSectionProps> = ({ language }) => {
  const content = {
    en: {
      security: {
        title: "Secure by Design",
        description: "AKAR's blockchain technology ensures immutable records, transparent transactions, and secure ownership of your farm investments. Every token is backed by real agricultural assets.",
        features: [
          {
            title: "Audited Smart Contracts",
            description: "All code audited by security experts"
          },
          {
            title: "Asset-Backed Tokens",
            description: "Each token represents real farm assets"
          }
        ]
      },
      sustainability: {
        title: "Sustainable Agriculture",
        description: "Our container farms use 95% less water than traditional farming while producing up to 300% more yield per square meter, creating truly sustainable food production.",
        features: [
          {
            title: "Zero Pesticides",
            description: "Clean growing environment eliminates need for chemicals"
          },
          {
            title: "Carbon Negative",
            description: "Our operations remove more carbon than they emit"
          }
        ]
      },
      technology: {
        title: "Cutting-Edge Technology",
        description: "Advanced IoT sensors, machine learning algorithms, and blockchain integration create a truly next-generation farming platform.",
        features: [
          {
            title: "AI-Powered Growth",
            description: "Machine learning optimizes growth conditions"
          },
          {
            title: "Real-Time Monitoring",
            description: "24/7 remote monitoring and control"
          }
        ]
      }
    },
    id: {
      security: {
        title: "Aman secara Desain",
        description: "Teknologi blockchain AKAR memastikan catatan yang tidak dapat diubah, transaksi transparan, dan kepemilikan yang aman atas investasi pertanian Anda. Setiap token didukung oleh aset pertanian nyata.",
        features: [
          {
            title: "Kontrak Pintar Teraudit",
            description: "Semua kode diaudit oleh pakar keamanan"
          },
          {
            title: "Token Berbasis Aset",
            description: "Setiap token mewakili aset pertanian nyata"
          }
        ]
      },
      sustainability: {
        title: "Pertanian Berkelanjutan",
        description: "Pertanian kontainer kami menggunakan 95% lebih sedikit air daripada pertanian tradisional sambil menghasilkan hingga 300% lebih banyak hasil per meter persegi, menciptakan produksi makanan yang benar-benar berkelanjutan.",
        features: [
          {
            title: "Nol Pestisida",
            description: "Lingkungan pertumbuhan bersih menghilangkan kebutuhan akan bahan kimia"
          },
          {
            title: "Karbon Negatif",
            description: "Operasi kami menghilangkan lebih banyak karbon daripada yang dikeluarkannya"
          }
        ]
      },
      technology: {
        title: "Teknologi Mutakhir",
        description: "Sensor IoT canggih, algoritma pembelajaran mesin, dan integrasi blockchain menciptakan platform pertanian generasi berikutnya yang sesungguhnya.",
        features: [
          {
            title: "Pertumbuhan Berbasis AI",
            description: "Pembelajaran mesin mengoptimalkan kondisi pertumbuhan"
          },
          {
            title: "Pemantauan Waktu Nyata",
            description: "Pemantauan dan kontrol jarak jauh 24/7"
          }
        ]
      }
    },
    ko: {
      security: {
        title: "설계부터 안전",
        description: "AKAR의 블록체인 기술은 변경 불가능한 기록, 투명한 거래 및 농장 투자의 안전한 소유권을 보장합니다. 모든 토큰은 실제 농업 자산으로 뒷받침됩니다.",
        features: [
          {
            title: "감사된 스마트 계약",
            description: "모든 코드는 보안 전문가가 감사함"
          },
          {
            title: "자산 기반 토큰",
            description: "각 토큰은 실제 농장 자산을 나타냄"
          }
        ]
      },
      sustainability: {
        title: "지속 가능한 농업",
        description: "우리의 컨테이너 농장은 전통적인 농업보다 95% 적은 물을 사용하면서 제곱미터당 최대 300% 더 많은 수확량을 생산하여 진정으로 지속 가능한 식품 생산을 만듭니다.",
        features: [
          {
            title: "농약 제로",
            description: "깨끗한 성장 환경으로 화학 물질 필요성 제거"
          },
          {
            title: "탄소 네거티브",
            description: "우리의 운영은 배출하는 것보다 더 많은 탄소를 제거함"
          }
        ]
      },
      technology: {
        title: "최첨단 기술",
        description: "고급 IoT 센서, 머신 러닝 알고리즘 및 블록체인 통합으로 진정한 차세대 농업 플랫폼을 만듭니다.",
        features: [
          {
            title: "AI 기반 성장",
            description: "머신 러닝이 성장 조건을 최적화함"
          },
          {
            title: "실시간 모니터링",
            description: "24/7 원격 모니터링 및 제어"
          }
        ]
      }
    }
  };

  return (
    <Tabs defaultValue="security" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="security">
          {language === 'en' ? 'Security' : (language === 'id' ? 'Keamanan' : '보안')}
        </TabsTrigger>
        <TabsTrigger value="sustainability">
          {language === 'en' ? 'Sustainability' : (language === 'id' ? 'Keberlanjutan' : '지속 가능성')}
        </TabsTrigger>
        <TabsTrigger value="technology">
          {language === 'en' ? 'Technology' : (language === 'id' ? 'Teknologi' : '기술')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="security" className="space-y-6 mt-4">
        <h2 className="text-3xl font-bold">{content[language].security.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {content[language].security.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {content[language].security.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="sustainability" className="space-y-6 mt-4">
        <h2 className="text-3xl font-bold">{content[language].sustainability.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {content[language].sustainability.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {content[language].sustainability.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="technology" className="space-y-6 mt-4">
        <h2 className="text-3xl font-bold">{content[language].technology.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {content[language].technology.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {content[language].technology.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Terminal className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
