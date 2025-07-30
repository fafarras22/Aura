import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  Coins,
  Network,
  CheckCircle 
} from "lucide-react";

interface ArbitrumEcosystemSectionProps {
  language: 'en' | 'id' | 'ko';
  onLearnMore?: () => void;
}

export const ArbitrumEcosystemSection: React.FC<ArbitrumEcosystemSectionProps> = ({ 
  language, 
  onLearnMore 
}) => {
  const content = {
    en: {
      badge: "BUILT ON ARBITRUM",
      title: "Powered by Arbitrum's Layer 2 Network",
      subtitle: "Experience the future of agricultural investment with Arbitrum's cutting-edge blockchain technology that brings unparalleled speed, security, and cost-efficiency to your farming investments.",
      benefits: [
        {
          icon: <Zap className="h-5 w-5 text-blue-600" />,
          title: "Lightning Fast Transactions",
          description: "Execute investments and claim rewards instantly with Arbitrum's optimistic rollup technology."
        },
        {
          icon: <Coins className="h-5 w-5 text-blue-600" />,
          title: "Ultra-Low Gas Fees",
          description: "Invest with minimal transaction costs, making micro-investments economically viable."
        },
        {
          icon: <Shield className="h-5 w-5 text-blue-600" />,
          title: "Ethereum-Level Security",
          description: "Inherit the robust security of Ethereum mainnet while enjoying Layer 2 performance."
        },
        {
          icon: <Network className="h-5 w-5 text-blue-600" />,
          title: "Seamless DeFi Integration",
          description: "Access Arbitrum's thriving DeFi ecosystem to maximize your agricultural investment returns."
        }
      ],
      ecosystemStats: [
        { label: "TVL in Arbitrum", value: "$2.5B+" },
        { label: "Daily Transactions", value: "300K+" },
        { label: "DApps Ecosystem", value: "400+" },
        { label: "Average Gas Cost", value: "<$0.10" }
      ],
      learnMore: "Learn More About Arbitrum"
    },
    id: {
      badge: "DIBANGUN DI ARBITRUM",
      title: "Didukung oleh Jaringan Layer 2 Arbitrum",
      subtitle: "Rasakan masa depan investasi pertanian dengan teknologi blockchain Arbitrum yang memberikan kecepatan, keamanan, dan efisiensi biaya yang tak tertandingi untuk investasi pertanian Anda.",
      benefits: [
        {
          icon: <Zap className="h-5 w-5 text-blue-600" />,
          title: "Transaksi Secepat Kilat",
          description: "Eksekusi investasi dan klaim reward secara instan dengan teknologi optimistic rollup Arbitrum."
        },
        {
          icon: <Coins className="h-5 w-5 text-blue-600" />,
          title: "Biaya Gas Ultra Rendah",
          description: "Berinvestasi dengan biaya transaksi minimal, membuat mikro-investasi secara ekonomis layak."
        },
        {
          icon: <Shield className="h-5 w-5 text-blue-600" />,
          title: "Keamanan Setara Ethereum",
          description: "Mewarisi keamanan yang kuat dari Ethereum mainnet sambil menikmati performa Layer 2."
        },
        {
          icon: <Network className="h-5 w-5 text-blue-600" />,
          title: "Integrasi DeFi Seamless",
          description: "Akses ekosistem DeFi Arbitrum yang berkembang untuk memaksimalkan return investasi pertanian."
        }
      ],
      ecosystemStats: [
        { label: "TVL di Arbitrum", value: "$2.5B+" },
        { label: "Transaksi Harian", value: "300K+" },
        { label: "Ekosistem DApps", value: "400+" },
        { label: "Rata-rata Biaya Gas", value: "<$0.10" }
      ],
      learnMore: "Pelajari Lebih Lanjut Tentang Arbitrum"
    },
    ko: {
      badge: "ARBITRUM 기반 구축",
      title: "Arbitrum Layer 2 네트워크로 구동",
      subtitle: "농업 투자의 미래를 경험하세요. Arbitrum의 최첨단 블록체인 기술로 농업 투자에 비할 데 없는 속도, 보안, 비용 효율성을 제공합니다.",
      benefits: [
        {
          icon: <Zap className="h-5 w-5 text-blue-600" />,
          title: "번개같은 빠른 거래",
          description: "Arbitrum의 옵티미스틱 롤업 기술로 투자 실행과 보상 청구를 즉시 수행하세요."
        },
        {
          icon: <Coins className="h-5 w-5 text-blue-600" />,
          title: "초저렴 가스 수수료",
          description: "최소한의 거래 비용으로 투자하여 소액 투자를 경제적으로 실행 가능하게 만듭니다."
        },
        {
          icon: <Shield className="h-5 w-5 text-blue-600" />,
          title: "이더리움 수준의 보안",
          description: "Layer 2 성능을 즐기면서 이더리움 메인넷의 강력한 보안을 상속받습니다."
        },
        {
          icon: <Network className="h-5 w-5 text-blue-600" />,
          title: "완벽한 DeFi 통합",
          description: "Arbitrum의 번창하는 DeFi 생태계에 접근하여 농업 투자 수익을 극대화하세요."
        }
      ],
      ecosystemStats: [
        { label: "Arbitrum TVL", value: "$2.5B+" },
        { label: "일일 거래", value: "300K+" },
        { label: "DApps 생태계", value: "400+" },
        { label: "평균 가스 비용", value: "<$0.10" }
      ],
      learnMore: "Arbitrum에 대해 더 알아보기"
    }
  };

  return (
    <section id="arbitrum-ecosystem" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">{content[language].badge}</Badge>
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{content[language].title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {content[language].benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-white dark:bg-gray-800">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold dark:text-white">Arbitrum Ecosystem</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {content[language].ecosystemStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Ethereum Virtual Machine Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Optimistic Rollup Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Decentralized & Permissionless</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {onLearnMore && (
              <Button 
                onClick={onLearnMore}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {content[language].learnMore}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};