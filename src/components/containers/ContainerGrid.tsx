
import React, { useState } from "react";
import { ContainerCard } from "@/components/containers/ContainerCard";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContainerGridProps {
  onSelectContainer: (containerId: string) => void;
  onViewDashboard?: (containerId: string) => void;
  language?: 'en' | 'id' | 'ko';
}

export const ContainerGrid: React.FC<ContainerGridProps> = ({ 
  onSelectContainer, 
  onViewDashboard,
  language = 'en'
}) => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const containerProjects = getMockContainerProjects();
  
  const content = {
    en: {
      loadMore: "Load More",
      viewDetails: "View Details",
      viewDashboard: "View Dashboard",
      noMoreProjects: "No more projects to load",
      projectsShowing: "Showing {visible} of {total} projects"
    },
    id: {
      loadMore: "Muat Lebih Banyak",
      viewDetails: "Lihat Detail",
      viewDashboard: "Lihat Dasbor",
      noMoreProjects: "Tidak ada proyek lagi untuk dimuat",
      projectsShowing: "Menampilkan {visible} dari {total} proyek"
    },
    ko: {
      loadMore: "더 불러오기",
      viewDetails: "세부 정보 보기",
      viewDashboard: "대시보드 보기",
      noMoreProjects: "더 이상 불러올 프로젝트가 없습니다",
      projectsShowing: "{total}개 프로젝트 중 {visible}개 표시 중"
    }
  };
  
  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, containerProjects.length));
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {containerProjects.slice(0, visibleProjects).map((container) => (
          <div key={container.id} className="relative">
            <ContainerCard
              container={container}
              onAction={() => onSelectContainer(container.id)}
            />
            {onViewDashboard && (
              <div className="mt-2 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSelectContainer(container.id)}
                >
                  {content[language].viewDetails}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => onViewDashboard(container.id)}
                  className="flex items-center"
                >
                  {content[language].viewDashboard}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        {visibleProjects < containerProjects.length ? (
          <Button onClick={handleLoadMore}>
            {content[language].loadMore}
          </Button>
        ) : (
          <p className="text-muted-foreground text-sm">
            {content[language].noMoreProjects}
          </p>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          {content[language].projectsShowing
            .replace('{visible}', visibleProjects.toString())
            .replace('{total}', containerProjects.length.toString())}
        </p>
      </div>
    </div>
  );
};
