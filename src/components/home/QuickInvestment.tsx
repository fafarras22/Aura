
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CreditCard, Wallet, BadgeCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickInvestmentProps {
  language?: 'en' | 'id' | 'ko';
}

export const QuickInvestment: React.FC<QuickInvestmentProps> = ({ language = 'en' }) => {
  const navigate = useNavigate();
  
  const content = {
    en: {
      title: "Start Investing Now",
      subtitle: "Choose your preferred way to invest in sustainable agriculture",
      quickestMethod: "Quickest Method",
      directInvestment: "Direct Investment",
      directInvestPoint1: "Invest directly using credit card or bank transfer",
      directInvestPoint2: "We automatically convert your investment to $AGRI tokens",
      directInvestPoint3: "Start earning returns immediately",
      browseProjects: "Browse Projects",
      dexPurchase: "DEX/CEX Purchase",
      dexPoint1: "Buy $AGRI tokens on supported exchanges",
      dexPoint2: "Access additional trading features",
      dexPoint3: "Transfer tokens to your wallet for staking",
      learnMore: "Learn More"
    },
    id: {
      title: "Mulai Investasi Sekarang",
      subtitle: "Pilih cara yang Anda sukai untuk berinvestasi dalam pertanian berkelanjutan",
      quickestMethod: "Metode Tercepat",
      directInvestment: "Investasi Langsung",
      directInvestPoint1: "Investasi langsung menggunakan kartu kredit atau transfer bank",
      directInvestPoint2: "Kami secara otomatis mengkonversi investasi Anda menjadi token $AGRI",
      directInvestPoint3: "Mulai dapatkan hasil segera",
      browseProjects: "Jelajahi Proyek",
      dexPurchase: "Pembelian DEX/CEX",
      dexPoint1: "Beli token $AGRI di bursa yang didukung",
      dexPoint2: "Akses fitur perdagangan tambahan",
      dexPoint3: "Transfer token ke dompet Anda untuk staking",
      learnMore: "Pelajari Lebih Lanjut"
    },
    ko: {
      title: "지금 투자 시작하기",
      subtitle: "지속 가능한 농업에 투자하는 방법을 선택하세요",
      quickestMethod: "가장 빠른 방법",
      directInvestment: "직접 투자",
      directInvestPoint1: "신용카드 또는 은행 송금으로 직접 투자",
      directInvestPoint2: "투자금을 자동으로 $AGRI 토큰으로 변환합니다",
      directInvestPoint3: "즉시 수익 창출 시작",
      browseProjects: "프로젝트 둘러보기",
      dexPurchase: "DEX/CEX 구매",
      dexPoint1: "지원되는 거래소에서 $AGRI 토큰 구매",
      dexPoint2: "추가 거래 기능 이용",
      dexPoint3: "스테이킹을 위해 지갑으로 토큰 전송",
      learnMore: "자세히 알아보기"
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-display">{content[language].title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-2 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-bl">
              {content[language].quickestMethod}
            </div>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 font-display">
                <CreditCard className="h-5 w-5" />
                {content[language].directInvestment}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].directInvestPoint1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].directInvestPoint2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].directInvestPoint3}</span>
                </li>
              </ul>
              <Button 
                className="w-full gap-2 h-12 text-base" 
                onClick={() => navigate('/farm-projects')}
              >
                {content[language].browseProjects}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 font-display">
                <Wallet className="h-5 w-5" />
                {content[language].dexPurchase}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].dexPoint1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].dexPoint2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{content[language].dexPoint3}</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full gap-2 h-12 text-base"
                onClick={() => navigate('/tokenization')}
              >
                {content[language].learnMore}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
