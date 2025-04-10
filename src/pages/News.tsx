
import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { SEOMetadata } from "@/components/shared/SEOMetadata";
import { format } from "date-fns";
import { Share2, ArrowRight, Award, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const News = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const content = {
    en: {
      title: "News & Updates",
      subtitle: "Latest news and announcements from AKAR Farm",
      featuredTitle: "AKAR Farm Accepted into SKALA Block71 Incubator 2025",
      featuredDate: "April 8, 2025",
      featuredDescription: "AKAR Farm is proud to announce that we have been accepted into the prestigious SKALA Block71 Incubator program for 2025. This achievement marks a significant milestone in our journey to revolutionize sustainable agriculture in Indonesia.",
      readMore: "Read More",
      news: [
        {
          id: "news-1",
          title: "AKAR Farm Accepted into SKALA Block71 Incubator 2025",
          date: "April 8, 2025",
          shortDescription: "AKAR Farm has been selected among hundreds of startups to join the prestigious SKALA Block71 Incubator program for 2025.",
          fullDescription: `<p>We are thrilled to announce that AKAR Farm has been accepted into the prestigious SKALA Block71 Incubator program for 2025. This achievement marks a significant milestone in our journey to revolutionize sustainable agriculture in Indonesia.</p>
          
          <p>SKALA Block71, a joint initiative between NUS Enterprise and Salim Group, is one of Southeast Asia's most competitive startup incubators. The program offers mentorship, funding opportunities, and access to a vast network of industry partners.</p>
          
          <p>Our selection into this program validates our innovative approach to combining container farming technology with blockchain for agricultural transparency and efficiency. Through the incubator, we will have access to resources that will accelerate our development and market penetration.</p>
          
          <p>"Being accepted into SKALA Block71 is a testament to the hard work of our entire team and the viability of our vision," said Aditya Prakoso, CEO of AKAR Farm. "We're excited to leverage this opportunity to scale our container farming solutions across Indonesia and eventually the broader ASEAN region."</p>
          
          <p>As part of the incubator program, AKAR Farm will receive:</p>
          <ul>
            <li>Dedicated mentorship from industry experts</li>
            <li>Office space in Jakarta's innovation hub</li>
            <li>Access to potential investors and partners</li>
            <li>Technical and business development support</li>
          </ul>
          
          <p>This incubation period comes at a perfect time as we prepare to launch our next generation of IoT-enabled container farms and expand our tokenization platform. We look forward to sharing more updates as we progress through the program.</p>`,
          category: "Company",
          image: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
        }
      ],
      otherNews: "Other News",
      shareThisPost: "Share this post",
      incubator: "Incubator Program",
      awards: "Company Achievement",
      relatedArticles: "Related Articles",
      noRelatedArticles: "No related articles at this time"
    },
    id: {
      title: "Berita & Pembaruan",
      subtitle: "Berita dan pengumuman terbaru dari AKAR Farm",
      featuredTitle: "AKAR Farm Diterima ke Program Inkubator SKALA Block71 2025",
      featuredDate: "8 April 2025",
      featuredDescription: "AKAR Farm dengan bangga mengumumkan bahwa kami telah diterima ke dalam program Inkubator SKALA Block71 yang prestisius untuk tahun 2025. Pencapaian ini menandai tonggak penting dalam perjalanan kami untuk merevolusi pertanian berkelanjutan di Indonesia.",
      readMore: "Baca Selengkapnya",
      news: [
        {
          id: "news-1",
          title: "AKAR Farm Diterima ke Program Inkubator SKALA Block71 2025",
          date: "8 April 2025",
          shortDescription: "AKAR Farm telah dipilih di antara ratusan startup untuk bergabung dengan program Inkubator SKALA Block71 yang prestisius untuk tahun 2025.",
          fullDescription: `<p>Kami sangat senang mengumumkan bahwa AKAR Farm telah diterima ke dalam program Inkubator SKALA Block71 yang prestisius untuk tahun 2025. Pencapaian ini menandai tonggak penting dalam perjalanan kami untuk merevolusi pertanian berkelanjutan di Indonesia.</p>
          
          <p>SKALA Block71, sebuah inisiatif bersama antara NUS Enterprise dan Salim Group, adalah salah satu inkubator startup paling kompetitif di Asia Tenggara. Program ini menawarkan bimbingan, peluang pendanaan, dan akses ke jaringan luas mitra industri.</p>
          
          <p>Pemilihan kami ke dalam program ini memvalidasi pendekatan inovatif kami dalam menggabungkan teknologi pertanian kontainer dengan blockchain untuk transparansi dan efisiensi pertanian. Melalui inkubator, kami akan memiliki akses ke sumber daya yang akan mempercepat pengembangan dan penetrasi pasar kami.</p>
          
          <p>"Diterima ke SKALA Block71 adalah bukti kerja keras dari seluruh tim kami dan kelayakan visi kami," kata Aditya Prakoso, CEO AKAR Farm. "Kami senang memanfaatkan kesempatan ini untuk memperluas solusi pertanian kontainer kami di seluruh Indonesia dan akhirnya wilayah ASEAN yang lebih luas."</p>
          
          <p>Sebagai bagian dari program inkubator, AKAR Farm akan menerima:</p>
          <ul>
            <li>Bimbingan khusus dari para ahli industri</li>
            <li>Ruang kantor di pusat inovasi Jakarta</li>
            <li>Akses ke investor dan mitra potensial</li>
            <li>Dukungan pengembangan teknis dan bisnis</li>
          </ul>
          
          <p>Periode inkubasi ini datang pada waktu yang tepat saat kami bersiap untuk meluncurkan generasi berikutnya dari pertanian kontainer berbasis IoT dan memperluas platform tokenisasi kami. Kami menantikan untuk berbagi lebih banyak pembaruan saat kami maju melalui program ini.</p>`,
          category: "Perusahaan",
          image: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
        }
      ],
      otherNews: "Berita Lainnya",
      shareThisPost: "Bagikan postingan ini",
      incubator: "Program Inkubator",
      awards: "Pencapaian Perusahaan",
      relatedArticles: "Artikel Terkait",
      noRelatedArticles: "Tidak ada artikel terkait saat ini"
    },
    ko: {
      title: "뉴스 및 업데이트",
      subtitle: "AKAR Farm의 최신 뉴스 및 공지사항",
      featuredTitle: "AKAR Farm 2025년 SKALA Block71 인큐베이터 프로그램 입성",
      featuredDate: "2025년 4월 8일",
      featuredDescription: "AKAR Farm은 2025년 권위 있는 SKALA Block71 인큐베이터 프로그램에 선정되었음을 자랑스럽게 발표합니다. 이번 성과는 인도네시아의 지속 가능한 농업 혁명을 위한 우리의 여정에서 중요한 이정표입니다.",
      readMore: "더 읽기",
      news: [
        {
          id: "news-1",
          title: "AKAR Farm 2025년 SKALA Block71 인큐베이터 프로그램 입성",
          date: "2025년 4월 8일",
          shortDescription: "AKAR Farm이 2025년 권위 있는 SKALA Block71 인큐베이터 프로그램에 참여하기 위해 수백 개의 스타트업 중에서 선정되었습니다.",
          fullDescription: `<p>AKAR Farm이 2025년 권위 있는 SKALA Block71 인큐베이터 프로그램에 선정되었음을 기쁘게 발표합니다. 이번 성과는 인도네시아의 지속 가능한 농업 혁명을 위한 우리의 여정에서 중요한 이정표입니다.</p>
          
          <p>NUS Enterprise와 Salim Group 간의 공동 이니셔티브인 SKALA Block71은 동남아시아에서 가장 경쟁력 있는 스타트업 인큐베이터 중 하나입니다. 이 프로그램은、멘토십、자금 조달 기회 및 광범위한 산업 파트너 네트워크에 대한 접근을 제공합니다.</p>
          
          <p>이 프로그램에 선정된 것은 농업 투명성과 효율성을 위해 컨테이너 농업 기술을 블록체인과 결합하는 우리의 혁신적인 접근 방식을 검증합니다. 인큐베이터를 통해 우리는 개발과 시장 침투를 가속화할 자원에 접근할 수 있게 됩니다.</p>
          
          <p>"SKALA Block71에 입성한 것은 우리 전체 팀의 노력과 우리 비전의 실행 가능성을 증명하는 것입니다,"라고 AKAR Farm의 CEO Aditya Prakoso가 말했습니다. "우리는 이 기회를 활용하여 인도네시아 전역과 궁극적으로 더 넓은 아세안 지역에 걸쳐 컨테이너 농업 솔루션을 확장하게 되어 기쁩니다."</p>
          
          <p>인큐베이터 프로그램의 일환으로 AKAR Farm은 다음을 받게 됩니다:</p>
          <ul>
            <li>산업 전문가의 전담 멘토링</li>
            <li>자카르타 혁신 허브의 사무실 공간</li>
            <li>잠재적 투자자 및 파트너에 대한 접근</li>
            <li>기술 및 비즈니스 개발 지원</li>
          </ul>
          
          <p>이 인큐베이션 기간은 IoT 지원 컨테이너 농장의 차세대를 출시하고 토큰화 플랫폼을 확장할 준비를 하는 우리에게 완벽한 시기에 왔습니다. 프로그램을 진행하면서 더 많은 업데이트를 공유하기를 기대합니다.</p>`,
          category: "기업",
          image: "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
        }
      ],
      otherNews: "다른 뉴스",
      shareThisPost: "이 게시물 공유하기",
      incubator: "인큐베이터 프로그램",
      awards: "회사 성과",
      relatedArticles: "관련 기사",
      noRelatedArticles: "현재 관련 기사가 없습니다"
    }
  };
  
  const [selectedNews, setSelectedNews] = useState(content[language].news[0]);
  
  // When language changes, update selected news
  useEffect(() => {
    setSelectedNews(content[language].news[0]);
  }, [language]);
  
  return (
    <>
      <SEOMetadata
        title={`${content[language].title} | AKAR Farm`}
        description="Stay updated with the latest news and developments from AKAR Farm, including our recent acceptance into the SKALA Block71 Incubator program for 2025."
        keywords="AKAR Farm, news, updates, SKALA Block71, incubator, startup, agriculture technology, indonesia startup"
        canonicalUrl="https://akarfarm.com/news"
      />
      
      <AppHeader 
        setShowWalletModal={setShowWalletModal}
        language={language}
        setLanguage={setLanguage}
      />
      
      <main className="pt-16">
        {/* Featured News */}
        <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 dark:text-white">{content[language].title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">{content[language].subtitle}</p>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img 
                      src="/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png"
                      alt="SKALA Block71 Incubator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-600 font-medium">{content[language].awards}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 dark:text-white">{content[language].featuredTitle}</h2>
                    <div className="flex items-center mb-4 text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{content[language].featuredDate}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{content[language].featuredDescription}</p>
                    <Button 
                      variant="default" 
                      className="flex items-center"
                      onClick={() => setSelectedNews(content[language].news[0])}
                    >
                      {content[language].readMore} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Full Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <Building className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-600 font-medium">{content[language].incubator}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{selectedNews.title}</h1>
              
              <div className="flex items-center mb-8">
                <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedNews.date}</span>
              </div>
              
              <div 
                className="prose prose-green max-w-none dark:prose-invert mb-8"
                dangerouslySetInnerHTML={{ __html: selectedNews.fullDescription }}
              />
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold dark:text-white">{content[language].shareThisPost}</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 dark:text-white">{content[language].relatedArticles}</h2>
              
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                {content[language].noRelatedArticles}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </>
  );
};

export default News;
