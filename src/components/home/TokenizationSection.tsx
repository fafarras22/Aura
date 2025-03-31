
import React from "react";
import { CircleDollarSign, FileText, Wallet, Lock } from "lucide-react";

interface TokenizationSectionProps {
  language: 'en' | 'id' | 'ko';
  content: {
    tokenization: {
      title: string;
      description: string;
    }
  };
}

export const TokenizationSection: React.FC<TokenizationSectionProps> = ({ language, content }) => {
  const translatedContent = {
    en: {
      sectionTitle: 'Tokenization',
      subtitle: 'Blockchain technology brings transparency, security, and liquidity to agricultural investments. Each token represents real ownership in productive farm assets.',
      item1: {
        title: 'Transparent Investment',
        description: 'Full visibility into farm operations and performance'
      },
      item2: {
        title: 'Fractional Ownership',
        description: 'Start with any investment size that fits your portfolio'
      },
      details: [
        {
          icon: <CircleDollarSign className="h-5 w-5 text-green-600" />,
          title: 'Liquidity & Flexibility',
          description: 'Trade tokenized assets on secondary markets for greater portfolio flexibility.'
        },
        {
          icon: <FileText className="h-5 w-5 text-green-600" />,
          title: 'Smart Contracts',
          description: 'Automated smart contracts distribute returns based on pre-defined conditions.'
        },
        {
          icon: <Wallet className="h-5 w-5 text-green-600" />,
          title: 'Diversification',
          description: 'Invest across multiple farming projects to spread risk and optimize returns.'
        },
        {
          icon: <Lock className="h-5 w-5 text-green-600" />,
          title: 'Secure Digital Assets',
          description: 'Assets secured through blockchain with institutional-grade security measures.'
        }
      ]
    },
    id: {
      sectionTitle: 'Tokenisasi',
      subtitle: 'Teknologi blockchain membawa transparansi, keamanan, dan likuiditas yang belum pernah ada sebelumnya ke investasi pertanian. Setiap token mewakili kepemilikan nyata dalam aset pertanian produktif.',
      item1: {
        title: 'Investasi Transparan',
        description: 'Visibilitas penuh ke operasi dan kinerja pertanian'
      },
      item2: {
        title: 'Kepemilikan Fraksional',
        description: 'Mulai dengan ukuran investasi apa pun yang sesuai dengan portofolio Anda'
      },
      details: [
        {
          icon: <CircleDollarSign className="h-5 w-5 text-green-600" />,
          title: 'Likuiditas & Fleksibilitas',
          description: 'Perdagangkan aset yang ditokenisasi di pasar sekunder untuk fleksibilitas portofolio yang lebih besar.'
        },
        {
          icon: <FileText className="h-5 w-5 text-green-600" />,
          title: 'Kontrak Pintar',
          description: 'Kontrak pintar otomatis mendistribusikan pengembalian berdasarkan kondisi yang telah ditentukan.'
        },
        {
          icon: <Wallet className="h-5 w-5 text-green-600" />,
          title: 'Diversifikasi',
          description: 'Investasikan di berbagai proyek pertanian untuk menyebarkan risiko dan mengoptimalkan pengembalian.'
        },
        {
          icon: <Lock className="h-5 w-5 text-green-600" />,
          title: 'Aset Digital Aman',
          description: 'Aset diamankan melalui blockchain dengan langkah-langkah keamanan tingkat institusional.'
        }
      ]
    },
    ko: {
      sectionTitle: '토큰화',
      subtitle: '블록체인 기술은 농업 투자에 전례 없는 투명성, 보안 및 유동성을 제공합니다. 각 토큰은 생산적인 농장 자산의 실제 소유권을 나타냅니다.',
      item1: {
        title: '투명한 투자',
        description: '농장 운영 및 성과에 대한 완전한 가시성'
      },
      item2: {
        title: '부분 소유권',
        description: '포트폴리오에 맞는 투자 규모로 시작하세요'
      },
      details: [
        {
          icon: <CircleDollarSign className="h-5 w-5 text-green-600" />,
          title: '유동성 및 유연성',
          description: '토큰화된 자산을 2차 시장에서 거래하여 포트폴리오 유연성을 높이세요.'
        },
        {
          icon: <FileText className="h-5 w-5 text-green-600" />,
          title: '스마트 계약',
          description: '자동화된 스마트 계약은 미리 정의된 조건에 따라 수익을 분배합니다.'
        },
        {
          icon: <Wallet className="h-5 w-5 text-green-600" />,
          title: '다각화',
          description: '여러 농업 프로젝트에 투자하여 위험을 분산하고 수익을 최적화하세요.'
        },
        {
          icon: <Lock className="h-5 w-5 text-green-600" />,
          title: '안전한 디지털 자산',
          description: '모든 자산은 기관급 보안 조치를 통해 블록체인 기술로 보호됩니다.'
        }
      ]
    }
  };

  return (
    <section id="tokenization" className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-3 dark:text-white">
            {translatedContent[language].sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {translatedContent[language].subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">{content.tokenization.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              {content.tokenization.description}
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary font-medium text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">
                    {translatedContent[language].item1.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {translatedContent[language].item1.description}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary font-medium text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">
                    {translatedContent[language].item2.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {translatedContent[language].item2.description}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {translatedContent[language].details.map((detail, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    {detail.icon}
                  </div>
                  <h4 className="font-semibold dark:text-white">{detail.title}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
