import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf, Droplet, CircleDollarSign, CircleCheckIcon, Sprout, LineChart, Wallet } from "lucide-react";

const HowItWorks = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();

  const investmentSteps = [
    {
      title: "Connect Your Wallet",
      description: "Connect your Web3 wallet to the AKAR platform to get started.",
      icon: <Wallet className="h-8 w-8 text-primary" />,
      buttonText: "Connect Now",
      action: () => navigate('/connect-wallet')
    },
    {
      title: "Browse Container Farms",
      description: "Explore our inventory of high-tech indoor container farms growing various crops.",
      icon: <Sprout className="h-8 w-8 text-primary" />,
      buttonText: "Browse Projects",
      action: () => navigate('/farm-projects')
    },
    {
      title: "Purchase $AGRI Tokens",
      description: "Buy $AGRI tokens to gain fractional ownership in our container farms.",
      icon: <CircleDollarSign className="h-8 w-8 text-primary" />,
      buttonText: "Buy Tokens",
      action: () => navigate('/token-purchase')
    },
    {
      title: "Stake for stAGRI",
      description: "Stake your $AGRI tokens in specific containers to receive stAGRI and earn yields.",
      icon: <Droplet className="h-8 w-8 text-primary" />,
      buttonText: "Learn About Staking",
      action: () => navigate('/tokenization')
    },
    {
      title: "Monitor Farm Operations",
      description: "Track container performance with our real-time sensor monitoring system.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      buttonText: "View Monitoring",
      action: () => navigate('/sensors')
    },
    {
      title: "Earn Sustainable Returns",
      description: "Receive regular yields from the container farm operations through your stAGRI.",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      buttonText: "View Returns",
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works | AKAR Farm</title>
      </Helmet>
      
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">How AKAR Farm Works</h1>
              <p className="text-xl text-muted-foreground mb-8">
                A simple guide to investing in container farming through tokenization. 
                Transform the future of agriculture while earning sustainable returns.
              </p>
            </div>
          </div>
        </div>
        
        {/* Steps Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="relative">
            {/* Vertical line connecting the steps */}
            <div className="absolute left-[25px] md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-muted z-0"></div>
            
            {/* Steps */}
            <div className="space-y-12 relative z-10">
              {investmentSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-muted">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto md:mx-0 md:ml-auto">
                        <CircleCheckIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <Button onClick={step.action} variant="outline" size="sm">
                        {step.buttonText}
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white z-20 my-4 md:my-0 md:mx-4 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    {index + 1}
                  </div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div className="hidden md:block">
                      {step.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Token Overview */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">The AKAR Token Ecosystem</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Understanding how $AGRI tokens and stAGRI work together to provide a transparent investment platform for container farming
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <CircleDollarSign className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">$AGRI Token</h3>
                    <p className="text-muted-foreground">
                      The base token that represents fractional ownership in AKAR's container farm network. 
                      Purchase and trade $AGRI tokens to invest in our farming operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Droplet className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">stAGRI Staking</h3>
                    <p className="text-muted-foreground">
                      Stake your $AGRI tokens in specific container projects to receive stAGRI tokens. 
                      stAGRI represents your active investment in a specific container.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Leaf className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Yield Generation</h3>
                    <p className="text-muted-foreground">
                      stAGRI holders receive regular yields from container farm operations, 
                      based on actual crop production and sales performance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Invest in Container Farming?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join AKAR Farm today and start investing in sustainable agriculture through our tokenized container farming platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/connect-wallet')}>
              Connect Wallet
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/farm-projects')}>
              Explore Containers
            </Button>
          </div>
        </div>
      </div>
      
      <Footer language={language} />
    </>
  );
};

export default HowItWorks;
