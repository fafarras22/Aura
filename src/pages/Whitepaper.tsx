
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Copy, Check, ArrowRight, Wallet, Lock, Leaf, BarChart3, Zap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Whitepaper = () => {
  const [copied, setCopied] = useState(false);
  
  const copyTokenContract = () => {
    navigator.clipboard.writeText("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="mb-10">
          <Button variant="ghost" className="gap-2 mb-4" asChild>
            <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">AKAR Whitepaper</h1>
              <p className="text-muted-foreground mt-2">Version 1.0 - November 2023</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download size={16} /> Download PDF
              </Button>
              <Button variant="outline" className="gap-2" onClick={copyTokenContract}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Contract"}
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">Abstract</h2>
              <p className="text-lg">
                AKAR is revolutionizing agriculture through a unique combination of container farming technology and blockchain tokenization. This whitepaper outlines our vision for creating a sustainable agricultural ecosystem that increases food production efficiency while democratizing investment in farming through the $AKR token on the Polygon PoS blockchain.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p>
                The global food system faces unprecedented challenges: climate change disrupts traditional farming, population growth increases demand, and resource constraints limit expansion. Meanwhile, agricultural investment remains inaccessible to most people, concentrated in large institutional hands.
              </p>
              <p>
                AKAR addresses these challenges through two innovative approaches:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Container Farming Technology:</strong> Modular, climate-controlled farming units that can grow crops anywhere with 95% less water and 75% less land than traditional farming.</li>
                <li><strong>Blockchain Tokenization:</strong> Fractional ownership of agricultural assets through the $AKR token, enabling anyone to invest in and benefit from sustainable farming.</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. The Problem</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Agricultural Challenges</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Unpredictable climate patterns affecting crop yields</li>
                    <li>Water scarcity in many agricultural regions</li>
                    <li>Limited arable land for expansion</li>
                    <li>Food transportation emissions and supply chain disruptions</li>
                    <li>Growing population requiring 70% more food by 2050</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Investment Access Barriers</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>High capital requirements for agricultural investment</li>
                    <li>Limited liquidity in traditional farming investments</li>
                    <li>Geographical restrictions on ownership and participation</li>
                    <li>Lack of transparency in agricultural production and returns</li>
                    <li>Insufficient technology for fractional ownership management</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. The AKAR Solution</h2>
              <p>
                AKAR has developed an integrated solution combining physical agricultural infrastructure with digital ownership technology:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Modular Container Farms</h3>
                    <p>
                      Our proprietary container farm technology allows for controlled environment agriculture anywhere in the world. Each unit is equipped with advanced sensors, climate control systems, and optimized growing layouts to maximize production while minimizing resource use.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">$AKR Tokenization</h3>
                    <p>
                      We utilize the Polygon PoS blockchain to tokenize agricultural assets, allowing for fractional ownership, transparent revenue distribution, and seamless transferability of agricultural investments through the $AKR token.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Management Dashboard</h3>
                    <p>
                      A comprehensive digital platform allows farm operators to monitor and optimize production, while investors can track performance, yields, and returns in real-time through our transparent reporting system.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Market Opportunity</h2>
              <p>
                AKAR operates at the intersection of several rapidly growing markets:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-muted p-4 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-2">$350B</h3>
                  <p className="text-sm">Global Vertical Farming Market by 2030</p>
                </div>
                
                <div className="bg-muted p-4 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-2">$3T</h3>
                  <p className="text-sm">Global Agricultural Asset Value</p>
                </div>
                
                <div className="bg-muted p-4 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-2">$100B</h3>
                  <p className="text-sm">Tokenized Real-World Assets by 2025</p>
                </div>
                
                <div className="bg-muted p-4 rounded-xl">
                  <h3 className="text-4xl font-bold text-primary mb-2">70%</h3>
                  <p className="text-sm">Required Increase in Food Production by 2050</p>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Competitive Advantages</h2>
              
              <div className="space-y-4">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Compared to Traditional Farming</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>95% less water consumption</li>
                    <li>75% less land required</li>
                    <li>Year-round production regardless of climate</li>
                    <li>No pesticides or herbicides needed</li>
                    <li>Proximity to urban markets reducing transportation emissions</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Compared to Other Vertical Farms</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Modular design allows for flexible deployment anywhere</li>
                    <li>Lower initial capital requirements</li>
                    <li>Proprietary IoT sensor network and control algorithms</li>
                    <li>Integrated blockchain tokenization for investment</li>
                    <li>Focus on Indonesian and Southeast Asian crops and markets</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Compared to Agricultural Investment Platforms</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Direct fractional ownership of physical assets</li>
                    <li>Transparent production data on blockchain</li>
                    <li>Liquidity through token trading</li>
                    <li>Lower minimum investment thresholds</li>
                    <li>Revenue distribution through smart contracts</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <div className="flex justify-center mt-8">
              <Button className="gap-2" asChild>
                <a href="#technology">Continue to Technology <ArrowRight size={16} /></a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">AKAR Technology Stack</h2>
              <p className="text-lg">
                Our technology integrates physical agricultural systems with digital blockchain infrastructure to create a comprehensive farming and investment ecosystem.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Container Farm Technology</h2>
              
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Environmental Control Systems</h3>
                  <p className="mb-3">
                    Our container farms utilize precision climate control technology to maintain optimal growing conditions:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Temperature regulation within ±0.5°C of target</li>
                    <li>Humidity control systems with ±2% accuracy</li>
                    <li>CO2 enrichment for enhanced photosynthesis</li>
                    <li>Multi-spectrum LED lighting optimized for specific crops</li>
                    <li>Air filtration to prevent pest introduction</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Growing Systems</h3>
                  <p className="mb-3">
                    We employ advanced hydroponic and aeroponic systems for efficient, soil-less cultivation:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Nutrient Film Technique (NFT) for leafy greens</li>
                    <li>Deep Water Culture systems for larger plants</li>
                    <li>Vertical growing arrangements to maximize space utilization</li>
                    <li>Automated nutrient dosing and pH balancing</li>
                    <li>Water recirculation with 95% efficiency</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Sensor Network & IoT</h3>
                  <p className="mb-3">
                    Our comprehensive sensor network provides real-time monitoring and control:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Temperature, humidity, and CO2 sensors</li>
                    <li>Water level, flow rate, and quality monitors</li>
                    <li>Electrical conductivity (EC) and pH sensors</li>
                    <li>Light intensity and spectrum analyzers</li>
                    <li>Energy consumption monitors</li>
                    <li>All sensors connected to central control system via IoT network</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Blockchain Infrastructure</h2>
              
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Polygon PoS Implementation</h3>
                  <p className="mb-3">
                    AKAR utilizes the Polygon PoS (Proof of Stake) blockchain for its tokenization platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>ERC-20 token standard for the $AKR token</li>
                    <li>Low transaction fees compared to Ethereum mainnet</li>
                    <li>Faster transaction processing times (2 second block times)</li>
                    <li>Energy-efficient consensus mechanism</li>
                    <li>Full Ethereum Virtual Machine (EVM) compatibility</li>
                    <li>Enhanced security through Polygon's validator network</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Smart Contracts</h3>
                  <p className="mb-3">
                    Our platform utilizes several key smart contracts to manage tokenization and operations:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Asset Tokenization Contract:</strong> Links physical farm assets to digital tokens</li>
                    <li><strong>Revenue Distribution Contract:</strong> Automatically allocates farm revenues to token holders</li>
                    <li><strong>Governance Contract:</strong> Enables token holders to vote on key decisions</li>
                    <li><strong>Data Oracle Contract:</strong> Securely brings farm production data on-chain</li>
                    <li><strong>Staking Contract:</strong> Allows token holders to stake $AKR for enhanced returns</li>
                  </ul>
                  <p className="mt-2">
                    All smart contracts undergo rigorous security audits by third-party firms before deployment.
                  </p>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Data Flow & Oracles</h3>
                  <p className="mb-3">
                    Connecting our physical farms to the blockchain requires secure data flow:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>IoT sensor data is aggregated by farm control systems</li>
                    <li>Data is cryptographically signed to ensure authenticity</li>
                    <li>Chainlink oracle network validates and transmits key metrics on-chain</li>
                    <li>Smart contracts process this data to determine yields and revenue allocation</li>
                    <li>All farm production data is permanently recorded on the blockchain</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Management Dashboard</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Farm Operator Interface</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Real-time monitoring of all environmental parameters</li>
                      <li>Alert system for deviations from optimal conditions</li>
                      <li>Production planning and scheduling tools</li>
                      <li>Resource usage optimization algorithms</li>
                      <li>Maintenance scheduling and tracking</li>
                      <li>Harvest yield and quality reporting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Investor Interface</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Portfolio overview of owned tokens and farm assets</li>
                      <li>Real-time production data visualization</li>
                      <li>Revenue distribution tracking and history</li>
                      <li>Governance proposal voting interface</li>
                      <li>Secondary market for token trading</li>
                      <li>Staking and reward management</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Analytics & Reporting</h3>
                  <p className="mb-3">
                    Our platform provides comprehensive analytics for both operational and investment insights:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Yield prediction models based on historical data</li>
                    <li>Resource efficiency analysis and optimization recommendations</li>
                    <li>Financial performance metrics and projections</li>
                    <li>Comparative analysis across multiple farm units</li>
                    <li>Environmental impact assessment (water saved, carbon avoided)</li>
                    <li>Customizable reporting for different stakeholder needs</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Security Measures</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Physical Security</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>24/7 monitoring of all container farm locations</li>
                      <li>Access control systems with multi-factor authentication</li>
                      <li>Redundant power systems with battery backup</li>
                      <li>Fire detection and suppression systems</li>
                      <li>Environmental hazard monitoring and alerts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Cybersecurity</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>End-to-end encryption for all data transmission</li>
                      <li>Regular security audits of all smart contracts</li>
                      <li>Multi-signature wallets for treasury management</li>
                      <li>DDoS protection for all web services</li>
                      <li>Bug bounty program for vulnerability discovery</li>
                      <li>Isolated networks for critical farm control systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <div className="flex justify-center mt-8">
              <Button className="gap-2" asChild>
                <a href="#tokenomics">Continue to Tokenomics <ArrowRight size={16} /></a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tokenomics" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">$AKR Tokenomics</h2>
              <p className="text-lg">
                The AKAR token ($AKR) is an ERC-20 token on the Polygon PoS blockchain that provides holders with ownership rights to agricultural assets and their production yields.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Token Utility</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Primary Functions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Asset Ownership:</strong> Each token represents fractional ownership of physical farm assets</li>
                    <li><strong>Revenue Rights:</strong> Token holders receive proportional share of farm production revenue</li>
                    <li><strong>Governance:</strong> Voting rights on key decisions and proposals</li>
                    <li><strong>Staking:</strong> Enhanced rewards for long-term token holders</li>
                    <li><strong>Platform Access:</strong> Premium features and services on the AKAR platform</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Value Accrual Mechanisms</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Farm Revenue:</strong> Distributed to token holders quarterly</li>
                    <li><strong>Buyback and Burn:</strong> Portion of platform fees used to reduce supply</li>
                    <li><strong>Network Growth:</strong> Expansion of container farm network increases token utility</li>
                    <li><strong>Secondary Market:</strong> Liquidity through exchange listings</li>
                    <li><strong>Yield Improvements:</strong> Technological advancements increasing farm output</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Token Distribution</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-muted p-6 rounded-xl h-full">
                    <h3 className="text-xl font-semibold mb-3">Token Details</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">AKAR Token</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Symbol:</span>
                        <span className="font-medium">$AKR</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Supply:</span>
                        <span className="font-medium">100,000,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Network:</span>
                        <span className="font-medium">Polygon PoS</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Standard:</span>
                        <span className="font-medium">ERC-20</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Initial Price:</span>
                        <span className="font-medium">$0.10 USD</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-muted p-6 rounded-xl h-full">
                    <h3 className="text-xl font-semibold mb-4">Allocation</h3>
                    <ul className="space-y-4">
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Public Sale: 30%</span>
                          <span>30,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Available immediately after token generation event</p>
                      </li>
                      
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Farm Development: 25%</span>
                          <span>25,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Used for building new container farms, 10% released quarterly</p>
                      </li>
                      
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Team & Advisors: 15%</span>
                          <span>15,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">1-year cliff, then 25% released every 6 months</p>
                      </li>
                      
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Ecosystem & Partnerships: 15%</span>
                          <span>15,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Strategic partnerships and ecosystem development</p>
                      </li>
                      
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Foundation Reserve: 10%</span>
                          <span>10,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Long-term development and emergency reserve</p>
                      </li>
                      
                      <li className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Community Incentives: 5%</span>
                          <span>5,000,000 $AKR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Rewards, airdrops, and community growth initiatives</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Token Economics</h2>
              
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Revenue Model</h3>
                  <p className="mb-3">
                    AKAR generates revenue through multiple streams, with a significant portion flowing to token holders:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Farm Production Revenue:</strong> 70% distributed to token holders, 30% for operational costs</li>
                    <li><strong>Container Farm Sales:</strong> Revenue from selling farm units to partners and operators</li>
                    <li><strong>Technology Licensing:</strong> Fees from licensing our farming technology</li>
                    <li><strong>Platform Fees:</strong> Small transaction fees from the tokenization platform</li>
                    <li><strong>Consulting Services:</strong> Agricultural and technical consulting for farm operators</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Token Circulation & Velocity</h3>
                  <p className="mb-3">
                    Several mechanisms are in place to encourage long-term holding and reduce token velocity:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Staking Rewards:</strong> Additional yield for tokens locked for 3, 6, or 12 months</li>
                    <li><strong>Governance Participation:</strong> Voting weight increases with token holding duration</li>
                    <li><strong>Quarterly Revenue Distribution:</strong> Encourages holding through distribution cycles</li>
                    <li><strong>Buyback and Burn:</strong> Reducing circulating supply over time</li>
                    <li><strong>Premium Access Tiers:</strong> Enhanced platform features for long-term holders</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Polygon PoS Integration</h2>
              
              <div className="bg-muted p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Why Polygon PoS?</h3>
                <p className="mb-3">
                  We selected Polygon's Proof of Stake (PoS) blockchain for the $AKR token for several key reasons:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Scalability:</strong> Polygon can process up to 7,000 transactions per second, ensuring our platform remains responsive even with many users</li>
                  <li><strong>Low Transaction Costs:</strong> Gas fees are approximately 0.1% of Ethereum mainnet costs, making smaller transactions economically viable</li>
                  <li><strong>Energy Efficiency:</strong> The PoS consensus mechanism uses 99.95% less energy than Proof of Work systems, aligning with our sustainability mission</li>
                  <li><strong>Ethereum Compatibility:</strong> Full EVM compatibility ensures easy integration with the broader Ethereum ecosystem and tools</li>
                  <li><strong>Security:</strong> Polygon's security is ultimately backed by Ethereum, while providing faster confirmations</li>
                  <li><strong>Developer Ecosystem:</strong> Rich tooling and development resources accelerate our platform evolution</li>
                </ul>
                <p className="mt-3">
                  Polygon PoS achieves consensus through a set of validators who stake MATIC tokens to secure the network. This approach provides a balance of security, decentralization, and performance that aligns perfectly with AKAR's requirements.
                </p>
              </div>
            </section>
            
            <div className="flex justify-center mt-8">
              <Button className="gap-2" asChild>
                <a href="#governance">Continue to Governance <ArrowRight size={16} /></a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="governance" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">Governance Structure</h2>
              <p className="text-lg">
                AKAR implements a hybrid governance model that combines on-chain voting with traditional corporate governance to ensure both token holder representation and operational efficiency.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Governance Framework</h2>
              
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Core Principles</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Transparency:</strong> All governance activities and decisions are publicly visible and recorded on-chain</li>
                    <li><strong>Inclusivity:</strong> Every token holder has the right to participate in governance</li>
                    <li><strong>Proportionality:</strong> Voting power is proportional to token holdings</li>
                    <li><strong>Efficiency:</strong> Operational decisions remain with management for speed and expertise</li>
                    <li><strong>Long-term Focus:</strong> Governance mechanisms encourage decisions based on long-term sustainability</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Governance Structure</h3>
                  <p className="mb-3">
                    The AKAR governance system consists of three main components:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border border-primary/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary">1. Token Holder Community</h4>
                      <p className="text-sm mb-2">All $AKR token holders can:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Submit governance proposals</li>
                        <li>Vote on active proposals</li>
                        <li>Delegate voting power to other addresses</li>
                        <li>Participate in community discussions</li>
                      </ul>
                    </div>
                    
                    <div className="border border-primary/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary">2. Governance Council</h4>
                      <p className="text-sm mb-2">A 7-member council consisting of:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>3 members elected by token holders</li>
                        <li>2 members from AKAR's executive team</li>
                        <li>2 independent industry experts</li>
                      </ul>
                      <p className="text-sm mt-2">
                        The Council reviews and provides recommendations on proposals before token holder voting.
                      </p>
                    </div>
                    
                    <div className="border border-primary/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary">3. Executive Team</h4>
                      <p className="text-sm mb-2">Responsible for:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Day-to-day operations and management</li>
                        <li>Implementing approved governance proposals</li>
                        <li>Making operational decisions within established parameters</li>
                        <li>Providing regular updates to token holders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Proposal Process</h2>
              
              <div className="relative">
                <div className="absolute h-full w-0.5 bg-primary/20 left-2.5 top-0 z-0"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">1</span>
                    </div>
                    <div className="bg-muted p-4 rounded-xl flex-grow">
                      <h3 className="font-semibold mb-2">Proposal Submission</h3>
                      <p className="text-sm mb-2">
                        Any token holder with at least 0.1% of total supply (100,000 $AKR) can submit a governance proposal.
                      </p>
                      <p className="text-sm">
                        Proposals must include a clear description, rationale, and implementation requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">2</span>
                    </div>
                    <div className="bg-muted p-4 rounded-xl flex-grow">
                      <h3 className="font-semibold mb-2">Discussion Period</h3>
                      <p className="text-sm mb-2">
                        Each proposal enters a 7-day discussion period during which the community can debate and suggest modifications.
                      </p>
                      <p className="text-sm">
                        The Governance Council provides an analysis and recommendation during this period.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">3</span>
                    </div>
                    <div className="bg-muted p-4 rounded-xl flex-grow">
                      <h3 className="font-semibold mb-2">Voting Period</h3>
                      <p className="text-sm mb-2">
                        After the discussion period, voting opens for 5 days.
                      </p>
                      <p className="text-sm">
                        Votes are weighted by token holdings, with a bonus for tokens that have been held for longer periods (up to 2x voting power for tokens held > 1 year).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">4</span>
                    </div>
                    <div className="bg-muted p-4 rounded-xl flex-grow">
                      <h3 className="font-semibold mb-2">Implementation</h3>
                      <p className="text-sm mb-2">
                        Proposals require a majority vote (>50%) to pass, with a minimum quorum of 10% of total token supply participating.
                      </p>
                      <p className="text-sm">
                        Once approved, the Executive Team implements the proposal according to the specified timeline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Governance Powers</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Token Holder Voting Rights</h3>
                  <p className="mb-3">
                    Token holders can vote on:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Farm expansion and new location decisions</li>
                    <li>Crop selection and production planning</li>
                    <li>Revenue distribution policies</li>
                    <li>Governance Council member elections</li>
                    <li>Protocol upgrades and technical changes</li>
                    <li>Strategic partnerships and collaborations</li>
                    <li>Tokenomics adjustments (buyback rates, staking rewards)</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Executive Team Authority</h3>
                  <p className="mb-3">
                    The Executive Team maintains authority over:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Day-to-day operational decisions</li>
                    <li>Staff hiring and management</li>
                    <li>Vendor and supplier selection</li>
                    <li>Implementation details of approved proposals</li>
                    <li>Emergency actions (with post-action review)</li>
                    <li>Marketing and public relations</li>
                    <li>Regulatory compliance measures</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Transparency & Reporting</h2>
              
              <div className="bg-muted p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Information Disclosure</h3>
                <p className="mb-3">
                  AKAR is committed to transparency in all aspects of operations:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Financial Reporting:</strong> Quarterly financial statements including revenue, expenses, and token holder distributions</li>
                  <li><strong>Production Metrics:</strong> Monthly reports on farm output, crop yields, and resource efficiency</li>
                  <li><strong>Governance Activity:</strong> Complete records of all proposals, votes, and implementation status</li>
                  <li><strong>Token Metrics:</strong> Regular updates on token distribution, staking statistics, and treasury activities</li>
                  <li><strong>Development Updates:</strong> Bi-weekly reports on technology improvements and platform development</li>
                </ul>
                <p className="mt-3">
                  All key metrics are published both through the AKAR platform and stored permanently on the Polygon blockchain for verification.
                </p>
              </div>
            </section>
            
            <div className="flex justify-center mt-8">
              <Button className="gap-2" asChild>
                <a href="#roadmap">Continue to Roadmap <ArrowRight size={16} /></a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="roadmap" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">Project Roadmap</h2>
              <p className="text-lg">
                AKAR's development roadmap outlines our key milestones and growth strategy for the next three years, focusing on technology development, farm expansion, and ecosystem growth.
              </p>
            </section>
            
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Development Timeline</h2>
              
              <div className="space-y-8">
                <div className="bg-muted p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      2023 - Phase 1: Foundation
                    </div>
                    <div className="h-0.5 flex-grow bg-primary/20"></div>
                    <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full font-medium">
                      Completed
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Technology Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Container farm prototype development and testing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Initial sensor network implementation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Development of farm management dashboard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Smart contract architecture design</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Initial seed funding secured</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>First pilot farm established in Jakarta</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Core team and advisors assembled</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Initial strategic partnerships established</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      2024 - Phase 2: Launch & Expansion
                    </div>
                    <div className="h-0.5 flex-grow bg-primary/20"></div>
                    <div className="px-3 py-1 bg-yellow-500 text-white rounded-full font-medium">
                      In Progress
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Technology Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Token smart contracts development and audit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Tokenization platform beta launch</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                          </span>
                          <span>Advanced AI-driven farm optimization algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                          </span>
                          <span>Integration with oracle networks for farm data</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>$AKR token private sale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span>Public token sale and exchange listings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                          </span>
                          <span>Expansion to 5 container farms across Indonesia</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                          </span>
                          <span>First commercial harvests and revenue distribution</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      2025 - Phase 3: Growth & Optimization
                    </div>
                    <div className="h-0.5 flex-grow bg-primary/20"></div>
                    <div className="px-3 py-1 bg-gray-500 text-white rounded-full font-medium">
                      Planned
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Technology Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Advanced governance protocol implementation</li>
                        <li>Enhanced yield optimization through machine learning</li>
                        <li>Second generation container farm design with improved efficiency</li>
                        <li>Mobile application for farm monitoring and token management</li>
                        <li>Development of decentralized exchange for $AKR tokens</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Expansion to 20+ container farms throughout Southeast Asia</li>
                        <li>Integration with traditional agricultural supply chains</li>
                        <li>Strategic partnerships with major food distributors</li>
                        <li>Development of specialized crop varieties for container farming</li>
                        <li>Establishment of research partnerships with universities</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      2026 - Phase 4: Global Expansion
                    </div>
                    <div className="h-0.5 flex-grow bg-primary/20"></div>
                    <div className="px-3 py-1 bg-gray-500 text-white rounded-full font-medium">
                      Planned
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Technology Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Full decentralization of the governance protocol</li>
                        <li>Integration with other DeFi ecosystems</li>
                        <li>Expansion of tokenization to additional agricultural assets</li>
                        <li>Development of interoperable cross-chain capabilities</li>
                        <li>Advanced autonomous farming systems with minimal human intervention</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Development</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>International expansion beyond Southeast Asia</li>
                        <li>Development of specialized container farms for diverse climates</li>
                        <li>Creation of agricultural innovation hubs in key regions</li>
                        <li>Expansion into complementary sustainable agriculture technologies</li>
                        <li>Establishment of the AKAR Foundation for sustainable farming education</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Performance Indicators</h2>
              
              <div className="bg-muted p-6 rounded-xl">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Operational KPIs</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Number of container farms deployed</li>
                      <li>Crop yield per container (kg/month)</li>
                      <li>Resource efficiency metrics (water, energy)</li>
                      <li>Operational uptime percentage</li>
                      <li>Cost per kg of produce</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Financial KPIs</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Revenue per container farm</li>
                      <li>Total value distributed to token holders</li>
                      <li>Operating margin percentage</li>
                      <li>Return on investment per farm</li>
                      <li>Token market capitalization</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Platform KPIs</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Total token holders</li>
                      <li>Governance participation rate</li>
                      <li>Average token holding period</li>
                      <li>Platform user growth rate</li>
                      <li>Partner network expansion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Conclusion & Next Steps</h2>
              
              <div className="bg-muted p-6 rounded-xl">
                <p className="mb-4">
                  AKAR represents a paradigm shift in agricultural investment and production, combining proven container farming technology with innovative blockchain tokenization to create a sustainable and accessible investment ecosystem.
                </p>
                <p className="mb-4">
                  Our roadmap outlines an ambitious but achievable path to establishing a network of productive farm assets that generate real value for token holders while contributing to global food security and sustainability.
                </p>
                <p>
                  As we move forward, we invite investors, partners, and supporters to join us in revolutionizing agriculture for the 21st century. The journey has just begun.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                  <Button className="gap-2">
                    <FileText size={16} /> Download Full Whitepaper
                  </Button>
                  <Button className="gap-2" variant="outline">
                    Contact The Team
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Whitepaper;
