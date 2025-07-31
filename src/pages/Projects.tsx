
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, CheckCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { SEOMetadata } from "@/components/shared/SEOMetadata";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [databaseState, setDatabaseState] = useState<'checking' | 'connected' | 'fallback'>('checking');
  const { isDeveloperMode } = useDeveloperMode();
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  
  // Use ref to prevent multiple database setup attempts
  const dbSetupAttemptedRef = useRef(false);

  // Translations
  const content = {
    en: {
      title: "Farm Projects",
      subtitle: "Invest in container farming projects with $AGRI tokens",
      demoMode: "Demonstration Mode",
      demoModeDescription: "Currently showing demonstration data.",
      developerMode: "You are in developer mode with access to all container data.",
      dbConnected: "Database Connected",
      dbConnectedDescription: "Successfully connected to the Supabase database.",
      viewDetails: "View Details",
      viewDashboard: "View Dashboard",
      gridView: "Grid View",
      listView: "List View"
    },
    id: {
      title: "Proyek Pertanian",
      subtitle: "Investasi dalam proyek pertanian kontainer dengan token $AGRI",
      demoMode: "Mode Demonstrasi",
      demoModeDescription: "Saat ini menampilkan data demonstrasi.",
      developerMode: "Anda berada dalam mode pengembang dengan akses ke semua data kontainer.",
      dbConnected: "Database Terhubung",
      dbConnectedDescription: "Berhasil terhubung ke database Supabase.",
      viewDetails: "Lihat Detail",
      viewDashboard: "Lihat Dasbor",
      gridView: "Tampilan Grid",
      listView: "Tampilan Daftar"
    },
    ko: {
      title: "농장 프로젝트",
      subtitle: "$AGRI 토큰으로 컨테이너 농업 프로젝트에 투자하세요",
      demoMode: "데모 모드",
      demoModeDescription: "현재 데모 데이터를 보여주고 있습니다.",
      developerMode: "모든 컨테이너 데이터에 접근할 수 있는 개발자 모드입니다.",
      dbConnected: "데이터베이스 연결됨",
      dbConnectedDescription: "Supabase 데이터베이스에 성공적으로 연결되었습니다.",
      viewDetails: "세부 정보 보기",
      viewDashboard: "대시보드 보기",
      gridView: "그리드 보기",
      listView: "목록 보기"
    }
  };

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      // Prevent multiple setup attempts
      if (dbSetupAttemptedRef.current) return;
      dbSetupAttemptedRef.current = true;
      
      setIsLoading(true);
      try {
        // Try to connect to the database and check if tables exist
        const { error } = await supabase.from('dummy_check').select('*').limit(1);
        
        if (error) {
          console.log("Database connection error, using fallback data:", error.message);
          setDatabaseState('fallback');
          toast({
            title: "Using Demonstration Data",
            description: "Could not connect to database. Showing sample container data instead.",
            variant: "default"
          });
          setIsLoading(false);
          return;
        }
        
        // If we got here, try to initialize the database
        const success = await initializeDB();
        
        if (success) {
          setDatabaseState('connected');
          toast({
            title: "Connected to Database",
            description: "Successfully connected to the database.",
          });
        } else {
          setDatabaseState('fallback');
          toast({
            title: "Using Demonstration Data",
            description: "Database initialization failed. Showing sample container data.",
            variant: "default"
          });
        }
      } catch (error) {
        console.log("Error during database setup, using fallback data:", error);
        setDatabaseState('fallback');
        toast({
          title: "Using Demo Mode",
          description: "Displaying sample container data.",
          variant: "default"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    setupDatabase();
  }, [initializeDB, toast]);

  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setIsModalOpen(true);
  };

  const handleViewDashboard = (containerId: string) => {
    navigate(`/project/${containerId}/dashboard`);
  };

  return (
    <>
      <SEOMetadata 
        title="Farm Projects | AKAR Farm Investment Platform"
        description="Explore and invest in our curated collection of sustainable farming projects. Each container project offers unique investment opportunities with real-time monitoring."
        keywords="farm projects, agriculture investment, container farming, AGRI token, sustainable agriculture, urban farming, Indonesia farming"
        canonicalUrl="https://akarfarm.com/projects"
      />
      
      {/* Fixed header */}
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="container mx-auto p-6 mt-16">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{content[language].title}</h1>
              <p className="text-muted-foreground">
                {content[language].subtitle}
              </p>
            </div>
            
            <Tabs 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
            >
              <TabsList>
                <TabsTrigger value="grid">{content[language].gridView}</TabsTrigger>
                <TabsTrigger value="list">{content[language].listView}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {databaseState === 'fallback' && (
            <Alert variant="default" className="border-blue-300 bg-blue-50 dark:bg-blue-900/20">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle>{content[language].demoMode}</AlertTitle>
              <AlertDescription>
                {content[language].demoModeDescription} {isDeveloperMode ? 
                  content[language].developerMode : 
                  ""}
              </AlertDescription>
            </Alert>
          )}
          
          {databaseState === 'connected' && (
            <Alert variant="default" className="border-green-300 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>{content[language].dbConnected}</AlertTitle>
              <AlertDescription>
                {content[language].dbConnectedDescription}
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabs defaultValue={viewMode} value={viewMode}>
              <TabsContent value="grid">
                <div 
                  className="projects-grid"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  <meta itemProp="name" content="AKAR Farm Container Projects" />
                  <meta itemProp="description" content="Collection of sustainable container farming projects available for investment" />
                  <ContainerGrid 
                    onSelectContainer={handleContainerSelect} 
                    onViewDashboard={handleViewDashboard}
                    language={language}
                  />
                </div>
              </TabsContent>
              
              {/* List view content */}
              <TabsContent value="list">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="py-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Container Farm #{index + 1}</h3>
                        <p className="text-sm text-muted-foreground">
                          {['Lettuce', 'Kale', 'Spinach', 'Microgreens', 'Strawberry', 'Herbs'][index % 6]} | 
                          {['Jakarta', 'Bandung', 'Surabaya'][index % 3]} | 
                          {['Active', 'Active', 'Maintenance'][index % 3]}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContainerSelect(`container-${index + 1}`)}
                        >
                          {content[language].viewDetails}
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleViewDashboard(`container-${index + 1}`)}
                        >
                          {content[language].viewDashboard}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <ContainerStakeModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            containerId={selectedContainerId}
          />
        </div>
      </div>
      
      <Footer language={language} />
    </>
  );
};

export default Projects;
