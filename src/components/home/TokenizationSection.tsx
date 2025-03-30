
import React from "react";

interface TokenizationSectionProps {
  language: 'en' | 'id';
  content: {
    tokenization: {
      title: string;
      description: string;
    }
  };
}

export const TokenizationSection: React.FC<TokenizationSectionProps> = ({ language, content }) => {
  return (
    <section id="tokenization" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            {language === 'en' ? 'Tokenization' : 'Tokenisasi'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? 'Blockchain technology brings unprecedented transparency, security, and liquidity to agricultural investments. Each token represents real ownership in productive farm assets.'
              : 'Teknologi blockchain membawa transparansi, keamanan, dan likuiditas yang belum pernah ada sebelumnya ke investasi pertanian. Setiap token mewakili kepemilikan nyata dalam aset pertanian produktif.'}
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
                    {language === 'en' ? 'Transparent Investment' : 'Investasi Transparan'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' 
                      ? 'Full visibility into farm operations and performance' 
                      : 'Visibilitas penuh ke operasi dan kinerja pertanian'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary font-medium text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">
                    {language === 'en' ? 'Fractional Ownership' : 'Kepemilikan Fraksional'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' 
                      ? 'Start with any investment size that fits your portfolio' 
                      : 'Mulai dengan ukuran investasi apa pun yang sesuai dengan portofolio Anda'}
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
