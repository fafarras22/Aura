
import React, { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Leaf, Droplets, Database, Network, ShieldCheck, Sprout, Workflow, PieChart, Factory, DollarSign, ArrowRight } from "lucide-react";

const LearnMore = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  
  // Multi-language content
  const content = {
    en: {
      title: "AKAR: Revolutionizing Farming with Blockchain",
      subtitle: "Learn how we're combining cutting-edge container farming technology with Polygon blockchain to democratize agriculture",
      overview: "Overview",
      technology: "Technology",
      blockchain: "Blockchain",
      investment: "Investment",
      security: "Security",
      getStarted: "Get Started",
      readWhitepaper: "Read Whitepaper",
    },
    id: {
      title: "AKAR: Merevolusi Pertanian dengan Blockchain",
      subtitle: "Pelajari bagaimana kami menggabungkan teknologi pertanian kontainer mutakhir dengan blockchain Polygon untuk mendemokratisasi pertanian",
      overview: "Ikhtisar",
      technology: "Teknologi",
      blockchain: "Blockchain",
      investment: "Investasi",
      security: "Keamanan",
      getStarted: "Mulai",
      readWhitepaper: "Baca Whitepaper",
    },
    ko: {
      title: "아카르: 블록체인으로 농업 혁신",
      subtitle: "최첨단 컨테이너 농업 기술과 폴리곤 블록체인을 결합하여 농업을 민주화하는 방법을 알아보세요",
      overview: "개요",
      technology: "기술",
      blockchain: "블록체인",
      investment: "투자",
      security: "보안",
      getStarted: "시작하기",
      readWhitepaper: "백서 읽기",
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <HomeHeader language={language} setLanguage={setLanguage} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-800 dark:text-green-300">
                {content[language].title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                {content[language].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  {content[language].getStarted}
                </Button>
                <Button size="lg" variant="outline">
                  {content[language].readWhitepaper}
                </Button>
              </div>
            </div>
          </div>
        </section>
      
        {/* Main Content Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="overview">{content[language].overview}</TabsTrigger>
                <TabsTrigger value="technology">{content[language].technology}</TabsTrigger>
                <TabsTrigger value="blockchain">{content[language].blockchain}</TabsTrigger>
                <TabsTrigger value="investment">{content[language].investment}</TabsTrigger>
                <TabsTrigger value="security">{content[language].security}</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Transforming Agriculture in Indonesia and Beyond</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    AKAR represents a radical shift in how we approach farming in urban areas. By combining hydroponic farming techniques with cutting-edge container technology, we've created a modular, scalable solution for sustainable food production that can thrive anywhere.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    What truly sets AKAR apart is our integration with the Polygon blockchain network. Using the MATIC token ecosystem, we've tokenized our container farms, allowing fractional ownership and democratizing access to agricultural investment.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <Card>
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <Factory className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Modular Container Farms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Repurposed shipping containers transformed into high-efficiency hydroponic farms that can produce up to 400% more yield than traditional farming using 95% less water.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <CircleDollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Tokenized Ownership</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        ERC-20 tokens on the Polygon network represent fractional ownership of container farms, allowing anyone to invest in sustainable agriculture with minimal capital.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mb-3">
                        <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Food Security Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Creating sustainable food systems in urban areas, reducing transportation emissions, and providing fresh, nutritious produce to communities with limited access.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-xl overflow-hidden mt-10">
                  <img 
                    src="/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png" 
                    alt="AKAR Container Farm" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </TabsContent>
              
              {/* Technology Tab */}
              <TabsContent value="technology" className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Cutting-Edge Farming Technology</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    At the heart of AKAR's innovation is our specialized container farming technology. Each shipping container is retrofitted with precise environmental controls, automated nutrient delivery systems, and energy-efficient LED lighting designed specifically for plant growth.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Hydroponic Growing Systems</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Our containers use a combination of Deep Water Culture (DWC) and Nutrient Film Technique (NFT) hydroponic systems, eliminating soil and maximizing nutrient absorption by plant roots.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Droplets className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Water Efficiency</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Uses up to 95% less water than conventional farming by recycling nutrient-rich water
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Leaf className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">No Pesticides</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Controlled growing environment eliminates the need for chemical pesticides
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Workflow className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Vertical Stacking</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Maximizes growing space with multi-level growing racks for optimal space utilization
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Smart Control Systems</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Each container is equipped with IoT sensors and automated control systems that maintain perfect growing conditions and can be monitored remotely via our dashboard.
                    </p>
                    
                    <ul className="space-y-4">
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Climate Control</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Precision temperature and humidity management for optimal plant growth
                        </p>
                      </li>
                      
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Automated Nutrient Delivery</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Intelligent systems adjust pH and nutrient levels in real-time
                        </p>
                      </li>
                      
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">AI Growth Optimization</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Machine learning algorithms that continuously improve growing conditions
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl mt-12">
                  <h3 className="text-2xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Container Dimensions</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>- 20ft: 6.1m x 2.4m x 2.6m</li>
                        <li>- 40ft: 12.2m x 2.4m x 2.6m</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Energy Requirements</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>- 20ft: 3.5 kW average</li>
                        <li>- 40ft: 7 kW average</li>
                        <li>- Optional solar integration</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Production Capacity</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>- 20ft: ~2,500kg/year</li>
                        <li>- 40ft: ~5,000kg/year</li>
                        <li>- 12-15 harvest cycles annually</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Blockchain Tab */}
              <TabsContent value="blockchain" className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Polygon MATIC Integration</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    AKAR has partnered with Polygon to implement a revolutionary tokenization model for our container farms. Using the MATIC blockchain, we've created a system that allows fractional ownership of physical agricultural assets through digital tokens.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-xl h-full">
                      <div className="flex items-center mb-4">
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Polygon MATIC</Badge>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Why Polygon?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mr-3 flex-shrink-0">
                            <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Low Transaction Costs</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Minimal gas fees make micro-investments economically viable
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mr-3 flex-shrink-0">
                            <Network className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Ethereum Compatibility</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Benefits from Ethereum's security while improving scalability
                            </p>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mr-3 flex-shrink-0">
                            <Sprout className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Environmental Focus</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Energy-efficient proof-of-stake consensus aligns with our sustainability mission
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <h3 className="text-2xl font-semibold mb-4">Token Functionality</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      AKAR tokens operate as standard ERC-20 tokens on the Polygon network, with each token representing fractional ownership of a specific container farm and its produce.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <Card className="border-purple-200 dark:border-purple-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-lg">
                            <Database className="h-5 w-5 mr-2 text-purple-600" />
                            Smart Contracts
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Transparent, immutable contracts automate revenue distribution to token holders based on farm performance
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-purple-200 dark:border-purple-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center text-lg">
                            <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                            Revenue Sharing
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Token holders receive quarterly dividend payments from farm produce sales
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-dashed border-purple-200 dark:border-purple-800">
                      <h4 className="font-medium mb-4">Technical Implementation</h4>
                      <div className="space-y-2 text-sm">
                        <p className="font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                          ERC-20 Token Standard
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Tokens are fully compatible with all major wallets and exchanges that support Polygon
                        </p>
                        
                        <p className="font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded mt-4">
                          Tokenization Ratio
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Each container is represented by 1,000,000 tokens, allowing for flexible ownership stakes
                        </p>
                        
                        <p className="font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded mt-4">
                          Smart Contract Governance
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Multi-signature requirement for major operational changes, ensuring decentralized governance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Investment Tab */}
              <TabsContent value="investment" className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Investment Opportunities</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    AKAR's tokenization model represents a new asset class that combines the stability of agricultural investment with the liquidity and accessibility of cryptocurrency tokens.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Investment Benefits</h3>
                    <ul className="space-y-4">
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
                        <CircleDollarSign className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Low Minimum Investment</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Start with as little as $50 USD equivalent in MATIC tokens
                          </p>
                        </div>
                      </li>
                      
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
                        <ArrowRight className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Liquidity</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Tokens can be traded on secondary markets, providing investment liquidity
                          </p>
                        </div>
                      </li>
                      
                      <li className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
                        <Leaf className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium">ESG Compliance</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Investment meets environmental, social, and governance criteria
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Financial Performance</h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Target Annual ROI</span>
                            <span className="text-green-600 font-semibold">12-18%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full w-[70%]"></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Dividend Frequency</span>
                            <span>Quarterly</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Investment Term</span>
                            <span>Flexible (No Lock-in)</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Historical Container Performance</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between border-b py-1">
                              <span>First Year Average Return</span>
                              <span className="font-medium">11.2%</span>
                            </div>
                            <div className="flex justify-between border-b py-1">
                              <span>Second Year Average Return</span>
                              <span className="font-medium">14.8%</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span>Current Returns (2023)</span>
                              <span className="font-medium text-green-600">16.5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full" size="lg">
                        Explore Investment Opportunities
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl mt-8">
                  <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">How is revenue generated?</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Revenue comes from direct sales of produce to supermarkets, restaurants, and consumers. Additional revenue streams include premium subscriptions for direct farm-to-table delivery.
                      </p>
                      
                      <h4 className="font-medium mb-2">What determines token value?</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Token value is determined by the productive capacity of the farm, market rates for produce, and supply/demand dynamics in the secondary token market.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">How are dividends calculated?</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        After operational expenses, 70% of net revenue is distributed to token holders proportional to their ownership stake. The remaining 30% is reinvested for maintenance and growth.
                      </p>
                      
                      <h4 className="font-medium mb-2">What are the risks?</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Risks include standard agricultural variables (crop performance, market prices), technology risks (system failures), and cryptocurrency market volatility affecting token values.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl font-bold mb-6">Security & Compliance</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    AKAR implements comprehensive security measures across both physical farm operations and blockchain systems. Our multi-layered approach ensures protection of assets, data, and investor interests.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit mb-3">
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Blockchain Security</CardTitle>
                      <CardDescription>Protection for digital assets and transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Multi-signature wallets for treasury management
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Smart contract audited by Certik and Hacken
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Implemented NIST Cybersecurity Framework
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Ongoing bug bounty program with up to $50,000 rewards
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit mb-3">
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Physical Security</CardTitle>
                      <CardDescription>Protection for container farms and operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            24/7 CCTV monitoring of all container farm locations
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Biometric access control systems for authorized personnel
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Redundant power systems with UPS and generator backup
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Insurance coverage for all physical assets and operations
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit mb-3">
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Data Security</CardTitle>
                      <CardDescription>Protection for user data and farm analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            End-to-end encryption for all data transmission
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Multi-factor authentication for all user accounts
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Regular penetration testing and vulnerability assessments
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Compliance with GDPR and Indonesian data protection laws
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/30 p-8 rounded-xl mt-8">
                  <h3 className="text-2xl font-semibold mb-6">Regulatory Compliance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3">Financial Compliance</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Licensed by Indonesian Financial Services Authority (OJK)</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>AML/KYC procedures for all investors</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Quarterly financial audits by PwC</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Agricultural Compliance</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Organic certification for all produce</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>HACCP food safety management system</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Regular inspections by food safety authorities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                Ready to Join the Future of Farming?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Whether you're interested in owning a container farm or investing through tokens, AKAR has a solution for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 min-w-[200px]">
                  Explore Container Options
                </Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Learn About Tokenization
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default LearnMore;
