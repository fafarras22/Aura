
import React from "react";
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
        description: "AKAR's blockchain technology ensures immutable records, transparent transactions, and secure ownership of your agricultural investments. Every token is backed by real agricultural assets across ASEAN.",
        features: [
          {
            title: "Audited Smart Contracts",
            description: "All code audited by security experts"
          },
          {
            title: "Asset-Backed Tokens",
            description: "Each token represents real agricultural assets"
          }
        ]
      },
      sustainability: {
        title: "Sustainable Agriculture",
        description: "Our agricultural projects implement sustainable farming practices that conserve water, reduce chemical use, and promote biodiversity while maintaining high yields across various crop types in ASEAN countries.",
        features: [
          {
            title: "Resource Conservation",
            description: "Projects that minimize water usage and prevent soil degradation"
          },
          {
            title: "Climate-Smart Agriculture",
            description: "Techniques that adapt to and mitigate climate change impacts"
          }
        ]
      },
      technology: {
        title: "Cutting-Edge Technology",
        description: "Advanced IoT sensors, machine learning algorithms, and blockchain integration create a truly next-generation agricultural ecosystem across all our supported farming types.",
        features: [
          {
            title: "Blockchain Traceability",
            description: "Complete supply chain transparency from farm to market"
          },
          {
            title: "Tokenized Real Assets",
            description: "Converting physical agricultural assets into digital investments"
          }
        ]
      }
    },
    id: {
      security: {
        title: "Aman secara Desain",
        description: "Teknologi blockchain AKAR memastikan catatan yang tidak dapat diubah, transaksi transparan, dan kepemilikan yang aman atas investasi pertanian Anda. Setiap token didukung oleh aset pertanian nyata di seluruh ASEAN.",
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
        description: "Proyek pertanian kami menerapkan praktik pertanian berkelanjutan yang menghemat air, mengurangi penggunaan bahan kimia, dan mendorong keanekaragaman hayati sambil mempertahankan hasil tinggi di berbagai jenis tanaman di negara-negara ASEAN.",
        features: [
          {
            title: "Konservasi Sumber Daya",
            description: "Proyek yang meminimalkan penggunaan air dan mencegah degradasi tanah"
          },
          {
            title: "Pertanian Cerdas Iklim",
            description: "Teknik yang beradaptasi dan mengurangi dampak perubahan iklim"
          }
        ]
      },
      technology: {
        title: "Teknologi Mutakhir",
        description: "Sensor IoT canggih, algoritma pembelajaran mesin, dan integrasi blockchain menciptakan ekosistem pertanian generasi berikutnya di semua jenis pertanian yang kami dukung.",
        features: [
          {
            title: "Pelacakan Blockchain",
            description: "Transparansi rantai pasok lengkap dari pertanian ke pasar"
          },
          {
            title: "Aset Nyata Tokenisasi",
            description: "Mengkonversi aset pertanian fisik menjadi investasi digital"
          }
        ]
      }
    },
    ko: {
      security: {
        title: "설계부터 안전",
        description: "AKAR의 블록체인 기술은 변경 불가능한 기록, 투명한 거래 및 농업 투자의 안전한 소유권을 보장합니다. 모든 토큰은 동남아시아 전역의 실제 농업 자산으로 뒷받침됩니다.",
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
        description: "우리의 농업 프로젝트는 동남아시아 국가들의 다양한 작물 유형에서 높은 수확량을 유지하면서 물을 절약하고, 화학물질 사용을 줄이며, 생물 다양성을 촉진하는 지속 가능한 농업 관행을 구현합니다.",
        features: [
          {
            title: "자원 보존",
            description: "물 사용을 최소화하고 토양 퇴화를 방지하는 프로젝트"
          },
          {
            title: "기후 스마트 농업",
            description: "기후 변화 영향에 적응하고 완화하는 기술"
          }
        ]
      },
      technology: {
        title: "최첨단 기술",
        description: "고급 IoT 센서, 머신 러닝 알고리즘 및 블록체인 통합은 우리가 지원하는 모든 농업 유형에서 진정한 차세대 농업 생태계를 만듭니다.",
        features: [
          {
            title: "블록체인 추적성",
            description: "농장에서 시장까지 완전한 공급망 투명성"
          },
          {
            title: "토큰화된 실물 자산",
            description: "물리적 농업 자산을 디지털 투자로 전환"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
