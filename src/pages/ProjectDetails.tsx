
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { useWallet } from "@/context/wallet/WalletContext";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import ProjectHeader from "@/components/project-details/ProjectHeader";
import ImageSection from "@/components/project-details/ImageSection";
import ProjectTabs from "@/components/project-details/ProjectTabs";
import StakeCard from "@/components/project-details/StakeCard";
import RiskAssessmentCard from "@/components/project-details/RiskAssessmentCard";
import ProjectLoading from "@/components/project-details/ProjectLoading";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { wallet } = useWallet();
  const { toast } = useToast();
  
  const [container, setContainer] = useState<ContainerProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Mock data for charts and stats
  const [investors, setInvestors] = useState<number>(0);

  useEffect(() => {
    if (id) {
      fetchContainerDetails(id);
      fetchInvestors(id);
    }
  }, [id]);
  
  const fetchContainerDetails = async (containerId: string) => {
    setLoading(true);
    try {
      // Try to fetch from database
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('id', containerId)
        .single();

      if (error || !data) {
        // If error or no data, use mock data
        const mockContainer = {
          id: containerId,
          name: 'Container A - Premium Herbs',
          description: 'High-yield herb farming in climate-controlled environment',
          imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
          totalTokens: 1000,
          filledTokens: 960,
          apy: 12.5,
          runtimeDays: 365,
          status: 'live' as 'live'
        };
        
        setContainer(mockContainer);
        return;
      }

      // Transform the database data
      const containerData: ContainerProject = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        imageUrl: data.image_url || undefined,
        totalTokens: data.total_tokens || 1000,
        filledTokens: data.filled_tokens || 0,
        apy: data.apy || 12.5,
        runtimeDays: data.runtime_days || 365,
        status: data.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live'
      };

      setContainer(containerData);
    } catch (error) {
      console.error('Error fetching container details:', error);
      toast({
        title: 'Error',
        description: 'Could not load container details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchInvestors = async (containerId: string) => {
    try {
      const { data, error, count } = await supabase
        .from('token_investments')
        .select('*', { count: 'exact' })
        .eq('container_id', containerId);
        
      if (error) throw error;
      
      setInvestors(count || Math.floor(Math.random() * 50) + 5);
    } catch (error) {
      console.error('Error fetching investors:', error);
      // Set fallback value
      setInvestors(Math.floor(Math.random() * 50) + 5);
    }
  };

  const handleStakeClick = () => {
    if (!wallet.connected) {
      setShowWalletModal(true);
      return;
    }
    
    // Navigate to projects page instead of showing stake modal
    toast({
      title: "Investment Moved",
      description: "Investment features are now handled by Umbi (www.umbi.fi)",
    });
  };

  if (loading || !container) {
    return <ProjectLoading />;
  }

  const progressPercentage = (container.filledTokens / container.totalTokens) * 100;

  return (
    <div className="space-y-6">
      <ProjectHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ImageSection container={container} />
          
          <ProjectTabs 
            container={container} 
            progressPercentage={progressPercentage}
            investors={investors} 
          />
        </div>
        
        <div className="space-y-6">
          <StakeCard 
            container={container} 
            handleStakeClick={handleStakeClick} 
          />
          
          <RiskAssessmentCard />
        </div>
      </div>
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};

export default ProjectDetails;
