
import React from "react";

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
      subtitle: 'Blockchain technology brings unprecedented transparency, security, and liquidity to agricultural investments. Each token represents real ownership in productive farm assets.',
      item1: {
        title: 'Transparent Investment',
        description: 'Full visibility into farm operations and performance'
      },
      item2: {
        title: 'Fractional Ownership',
        description: 'Start with any investment size that fits your portfolio'
      }
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
      }
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
      }
    }
  };

  return (
    <section id="tokenization" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            {translatedContent[language].sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {translatedContent[language].subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">{content.tokenization.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {content.tokenization.description}
            </p>
            <ul className="space-y-4 mb-8">
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
        </div>
      </div>
    </section>
  );
};
