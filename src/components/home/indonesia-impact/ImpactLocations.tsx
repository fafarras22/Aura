
import React from "react";
import { MapPin } from "lucide-react";

interface ImpactLocationsProps {
  language?: 'en' | 'id' | 'ko';
}

export const ImpactLocations: React.FC<ImpactLocationsProps> = ({ language = 'en' }) => {
  const content = {
    en: {
      title: "Deployment Locations",
      subtitle: "Our container farms are deployed across strategic locations in Indonesia, addressing regional food security challenges.",
      locations: [
        {
          city: "Jakarta",
          description: "Urban farm network providing fresh produce to densely populated areas with limited agricultural space."
        },
        {
          city: "Bali",
          description: "Supporting the tourism industry with consistent supply of premium herbs and vegetables for hotels and restaurants."
        },
        {
          city: "Surabaya",
          description: "Industrial hub with distribution centers serving East Java's growing population."
        },
        {
          city: "Makassar",
          description: "Eastern Indonesia gateway addressing food supply challenges in the region's remote areas."
        }
      ]
    },
    id: {
      title: "Lokasi Penempatan",
      subtitle: "Pertanian kontainer kami ditempatkan di lokasi-lokasi strategis di Indonesia, mengatasi tantangan ketahanan pangan regional.",
      locations: [
        {
          city: "Jakarta",
          description: "Jaringan pertanian urban yang menyediakan produk segar ke area padat penduduk dengan ruang pertanian terbatas."
        },
        {
          city: "Bali",
          description: "Mendukung industri pariwisata dengan pasokan herbal dan sayuran premium yang konsisten untuk hotel dan restoran."
        },
        {
          city: "Surabaya",
          description: "Pusat industri dengan pusat distribusi yang melayani populasi Jawa Timur yang terus bertambah."
        },
        {
          city: "Makassar",
          description: "Gerbang Indonesia Timur yang mengatasi tantangan pasokan makanan di daerah terpencil di wilayah tersebut."
        }
      ]
    },
    ko: {
      title: "배치 위치",
      subtitle: "컨테이너 농장은 인도네시아 전역의 전략적 위치에 배치되어 지역 식량 안보 문제를 해결합니다.",
      locations: [
        {
          city: "자카르타",
          description: "농업 공간이 제한된 인구 밀집 지역에 신선한 농산물을 제공하는 도시 농장 네트워크."
        },
        {
          city: "발리",
          description: "호텔과 레스토랑을 위한 프리미엄 허브와 채소의 일관된 공급으로 관광 산업을 지원합니다."
        },
        {
          city: "수라바야",
          description: "동부 자바의 증가하는 인구를 위한 유통 센터가 있는 산업 허브."
        },
        {
          city: "마카사르",
          description: "동부 인도네시아의 관문으로 지역의 외딴 지역에서의 식량 공급 문제를 해결합니다."
        }
      ]
    }
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-3 dark:text-white">{content[language].title}</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {content[language].subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content[language].locations.map((location, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold dark:text-white">{location.city}</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {location.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
