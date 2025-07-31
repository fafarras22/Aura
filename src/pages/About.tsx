
import React, { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Clock, LineChart, Users, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container } from "lucide-react";
import { SEOMetadata } from "@/components/shared/SEOMetadata";

const About = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <SEOMetadata
        title="About AKAR Farm | Container Farming Investment Platform"
        description="AKAR Farm is revolutionizing agriculture through container farming technology and blockchain tokenization. Learn about our mission, team, and vision."
        keywords="container farming, urban agriculture, AKAR Farm mission, sustainable farming, agricultural technology, hydroponic systems"
        canonicalUrl="https://akarfarm.com/about"
      />
      
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
              <h1 className="text-4xl font-bold mb-6">About AKAR Farm</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Revolutionizing urban agriculture through container farming technology and blockchain-based investment
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                AKAR Farm is on a mission to transform urban agriculture in Jakarta and beyond. We combine advanced container farming technology with blockchain tokenization to create a sustainable, transparent, and accessible agricultural investment platform.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sustainable Urban Farming</h3>
                    <p className="text-muted-foreground">
                      Creating productive agricultural systems that use 95% less water and 99% less land than traditional farming
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Democratized Agricultural Investment</h3>
                    <p className="text-muted-foreground">
                      Making it possible for anyone to invest in productive farming through fractional ownership and tokenization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Transparent Supply Chain</h3>
                    <p className="text-muted-foreground">
                      Building trust through real-time monitoring and blockchain verification of farm operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -left-6 -top-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
              <img 
                src="/img/container-farm-about.jpg" 
                alt="AKAR Container Farm" 
                className="rounded-lg shadow-lg relative z-10" 
              />
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full z-0"></div>
            </div>
          </div>
        </div>
        
        {/* What is Container Farming */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">What is Container Farming?</h2>
              <p className="text-lg text-muted-foreground">
                Container farming is a revolutionary approach to agriculture that transforms shipping containers into highly efficient growing environments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <Container className="h-24 w-24 text-primary/70" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Space Efficiency</h3>
                  <p className="text-muted-foreground">
                    A single 40-foot container can produce the equivalent of 2-3 acres of traditional farmland, making it ideal for urban environments with limited space
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="h-48 bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                  <Sprout className="h-24 w-24 text-blue-500/70" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Resource Optimization</h3>
                  <p className="text-muted-foreground">
                    Our hydroponic systems use 95% less water than traditional farming methods while delivering higher yields and consistent quality
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="h-48 bg-green-50 dark:bg-green-950/20 flex items-center justify-center">
                  <LineChart className="h-24 w-24 text-green-500/70" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Smart Technology</h3>
                  <p className="text-muted-foreground">
                    Every container is equipped with IoT sensors monitoring climate, water quality, nutrient levels, and plant health in real-time
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-primary/10">
                {/* Team member photo would go here */}
                <Users className="w-full h-full p-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Dr. Adi Suryanto</h3>
              <p className="text-muted-foreground mb-2">CEO & Co-Founder</p>
              <p className="text-sm">
                Agricultural engineer with 15+ years of experience in hydroponic systems and crop science
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-primary/10">
                {/* Team member photo would go here */}
                <Users className="w-full h-full p-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Indra Wijaya</h3>
              <p className="text-muted-foreground mb-2">CTO & Co-Founder</p>
              <p className="text-sm">
                Software architect specializing in IoT systems and blockchain technology
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-primary/10">
                {/* Team member photo would go here */}
                <Users className="w-full h-full p-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Maria Chen</h3>
              <p className="text-muted-foreground mb-2">CFO</p>
              <p className="text-sm">
                Financial expert with experience in agricultural commodities and blockchain investments
              </p>
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
            
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line connecting the timeline items */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
              
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white absolute left-1/2 transform -translate-x-1/2 -top-6">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-auto mr-auto md:ml-auto md:w-1/2 md:pl-8 mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-1">2022</h3>
                      <p className="text-muted-foreground">
                        AKAR Farm founded with a vision to revolutionize urban agriculture in Indonesia
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white absolute left-1/2 transform -translate-x-1/2 -top-6">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-auto mr-auto md:mr-auto md:w-1/2 md:pr-8 mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-1">2023 Q2</h3>
                      <p className="text-muted-foreground">
                        First prototype container farm developed and tested in Jakarta
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="relative z-10 mb-16">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white absolute left-1/2 transform -translate-x-1/2 -top-6">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-auto mr-auto md:ml-auto md:w-1/2 md:pl-8 mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-1">2023 Q4</h3>
                      <p className="text-muted-foreground">
                        $AGRI token developed and initial container farm tokenization platform launched
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white absolute left-1/2 transform -translate-x-1/2 -top-6">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-auto mr-auto md:mr-auto md:w-1/2 md:pr-8 mt-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-1">2024</h3>
                      <p className="text-muted-foreground">
                        Expansion to 25 container farms across Jakarta and beginning of regional growth
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Future of Farming?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Become part of the AKAR ecosystem and invest in sustainable agriculture through our tokenized container farming platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/connect-wallet')} className="gap-2">
              Connect Wallet <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/how-it-works')}>
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
      
      <Footer language={language} />
    </>
  );
};

export default About;
