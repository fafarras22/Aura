
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, TrendingUp, Users, Shield, Leaf, Wallet } from "lucide-react";

interface WhyInvestSectionProps {
  language?: 'en' | 'id' | 'ko';
}

export const WhyInvestSection: React.FC<WhyInvestSectionProps> = ({ language = 'en' }) => {
  const content = {
    en: {
      title: "Why Invest in ASEAN Agriculture?",
      subtitle: "Agricultural investments provide unique advantages that combine financial returns with real-world impact",
      realAsset: {
        title: "Real Asset Backing",
        description: "Each project is backed by tangible agricultural assets including land, equipment, and produce, providing stability to your investment."
      },
      returns: {
        title: "Consistent Returns",
        description: "Agricultural projects deliver predictable yields from 12-20% annually, with income directly tied to ongoing harvests and produce sales."
      },
      impact: {
        title: "Community Impact",
        description: "Your investments create jobs, support rural economies, and promote sustainable farming practices across Southeast Asia."
      },
      tokenBenefits: {
        title: "$AGRI Token Benefits",
        points: [
          "Direct ownership in agricultural assets",
          "Staking rewards from farm production",
          "Governance rights in farm management decisions"
        ]
      },
      ecosystem: {
        title: "AKAR Ecosystem Advantages",
        points: [
          "Blockchain transparency for all farm operations",
          "Real-time farm monitoring via IoT sensors",
          "Fractional ownership with low minimum investment"
        ]
      }
    },
    id: {
      title: "Mengapa Berinvestasi di Pertanian ASEAN?",
      subtitle: "Investasi pertanian memberikan keuntungan unik yang menggabungkan pengembalian finansial dengan dampak dunia nyata",
      realAsset: {
        title: "Didukung Aset Nyata",
        description: "Setiap proyek didukung oleh aset pertanian berwujud termasuk lahan, peralatan, dan produk, memberikan stabilitas pada investasi Anda."
      },
      returns: {
        title: "Pengembalian Konsisten",
        description: "Proyek pertanian memberikan hasil yang dapat diprediksi dari 12-20% per tahun, dengan pendapatan yang terkait langsung dengan panen dan penjualan produk."
      },
      impact: {
        title: "Dampak Komunitas",
        description: "Investasi Anda menciptakan lapangan kerja, mendukung ekonomi pedesaan, dan mempromosikan praktik pertanian berkelanjutan di seluruh Asia Tenggara."
      },
      tokenBenefits: {
        title: "Manfaat Token $AGRI",
        points: [
          "Kepemilikan langsung dalam aset pertanian",
          "Hadiah staking dari produksi pertanian",
          "Hak tata kelola dalam keputusan manajemen pertanian"
        ]
      },
      ecosystem: {
        title: "Keunggulan Ekosistem AKAR",
        points: [
          "Transparansi blockchain untuk semua operasi pertanian",
          "Pemantauan pertanian real-time melalui sensor IoT",
          "Kepemilikan fraksional dengan investasi minimum rendah"
        ]
      }
    },
    ko: {
      title: "ASEAN 농업에 투자하는 이유?",
      subtitle: "농업 투자는 재정적 수익과 실제 영향을 결합한 독특한 이점을 제공합니다",
      realAsset: {
        title: "실물 자산 지원",
        description: "각 프로젝트는 토지, 장비 및 농산물을 포함한 유형 농업 자산으로 지원되어 투자에 안정성을 제공합니다."
      },
      returns: {
        title: "일관된 수익",
        description: "농업 프로젝트는 연간 12-20%의 예측 가능한 수익을 제공하며, 수입은 지속적인 수확과 농산물 판매에 직접 연결됩니다."
      },
      impact: {
        title: "커뮤니티 영향",
        description: "귀하의 투자는 일자리를 창출하고, 농촌 경제를 지원하며, 동남아시아 전역에서 지속 가능한 농업 관행을 촉진합니다."
      },
      tokenBenefits: {
        title: "$AGRI 토큰 혜택",
        points: [
          "농업 자산에 대한 직접 소유권",
          "농장 생산에서 스테이킹 보상",
          "농장 관리 결정에 대한 거버넌스 권한"
        ]
      },
      ecosystem: {
        title: "AKAR 생태계 이점",
        points: [
          "모든 농장 운영에 대한 블록체인 투명성",
          "IoT 센서를 통한 실시간 농장 모니터링",
          "최소 투자로 분할 소유권"
        ]
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-display">{content[language].title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{content[language].realAsset.title}</h3>
              <p className="text-muted-foreground">
                {content[language].realAsset.description}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{content[language].returns.title}</h3>
              <p className="text-muted-foreground">
                {content[language].returns.description}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{content[language].impact.title}</h3>
              <p className="text-muted-foreground">
                {content[language].impact.description}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <Card className="border hover:shadow-md transition-all bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-display">{content[language].tokenBenefits.title}</h3>
                  <ul className="space-y-2">
                    {content[language].tokenBenefits.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="h-4 w-4 text-primary mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border hover:shadow-md transition-all bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-display">{content[language].ecosystem.title}</h3>
                  <ul className="space-y-2">
                    {content[language].ecosystem.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="h-4 w-4 text-primary mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
