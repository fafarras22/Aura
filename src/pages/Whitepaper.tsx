
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Whitepaper = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>AKAR Farm Whitepaper | Container Farming Tokenization</title>
        <meta 
          name="description" 
          content="AKAR Farm whitepaper - Learn about our tokenized container farming ecosystem, $AGRI token economics, and sustainable agriculture investment model." 
        />
      </Helmet>
      
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">AKAR Farm Whitepaper</h1>
              <p className="text-muted-foreground">
                Technical documentation and conceptual framework for AKAR Farm's tokenized container farming ecosystem
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> 
                Download PDF
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Contents</h3>
                  <nav className="space-y-2">
                    <a href="#introduction" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Introduction</a>
                    <a href="#market-analysis" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Market Analysis</a>
                    <a href="#container-farming" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Container Farming Technology</a>
                    <a href="#tokenomics" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Tokenomics</a>
                    <a href="#staking" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">stAGRI Staking Model</a>
                    <a href="#iot" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">IoT & Monitoring</a>
                    <a href="#roadmap" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Roadmap</a>
                    <a href="#governance" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Governance</a>
                    <a href="#team" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Team & Advisors</a>
                    <a href="#legal" className="flex px-3 py-2 hover:bg-muted rounded-md text-sm">Legal & Compliance</a>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <Card className="mb-8" id="introduction">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <CardTitle>Introduction to AKAR Farm</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Vision & Mission</h3>
                  <p>
                    AKAR Farm aims to revolutionize urban agriculture in Jakarta and across Southeast Asia through advanced container farming technology. Our mission is to increase food security, reduce carbon footprint, and provide sustainable investment opportunities through the tokenization of productive agricultural assets.
                  </p>
                  
                  <h3 className="text-lg font-medium">The Problem</h3>
                  <p>
                    Indonesia faces significant challenges in food security, with limited arable land, increasing urbanization, and vulnerability to climate change. Traditional agricultural investments are capital-intensive, illiquid, and often inaccessible to average investors. Meanwhile, conventional farming methods consume excessive water and land resources while contributing to environmental degradation.
                  </p>
                  
                  <h3 className="text-lg font-medium">AKAR's Solution</h3>
                  <p>
                    AKAR Farm introduces a novel approach by combining three innovative elements on the Arbitrum ecosystem:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>High-tech container farms:</strong> Optimized for growing high-value crops in urban environments using 95% less water than traditional farming</li>
                    <li><strong>IoT sensor network:</strong> Providing real-time monitoring and automated management of growing conditions</li>
                    <li><strong>Arbitrum-powered tokenization:</strong> Enabling fractional ownership and liquidity through $AGRI tokens on Arbitrum's secure Layer 2 infrastructure</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="market-analysis">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <CardTitle>Market Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Indonesian Agricultural Market</h3>
                  <p>
                    Indonesia's agricultural sector contributed approximately 13.7% to the country's GDP in 2022, employing around 29% of the workforce. However, the sector faces significant challenges including limited arable land, inefficient supply chains, and vulnerability to climate change. Jakarta, with its population of over 10 million, imports the majority of its fresh produce from distant regions, resulting in high costs, food waste, and carbon emissions.
                  </p>
                  
                  <h3 className="text-lg font-medium">Container Farming Market Growth</h3>
                  <p>
                    The global vertical farming market size was valued at USD 4.34 billion in 2021 and is projected to grow at a CAGR of 25.5% from 2022 to 2030. Container farming, as a subset of this market, is gaining significant traction due to its modularity, scalability, and lower initial investment compared to large-scale vertical farms. In Southeast Asia, the market is expected to grow at an even faster rate due to increasing urbanization, limited agricultural land, and government initiatives supporting agritech innovation.
                  </p>
                  
                  <h3 className="text-lg font-medium">Target Market</h3>
                  <p>
                    AKAR Farm targets two primary market segments:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>B2B customers:</strong> Hotels, restaurants, supermarkets, and food processing companies seeking consistent supply of high-quality, locally grown produce</li>
                    <li><strong>Retail investors:</strong> Individuals looking for alternative investment opportunities in sustainable agriculture with competitive returns and liquid assets through tokenization</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="container-farming">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <CardTitle>Container Farming Technology</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Infrastructure Overview</h3>
                  <p>
                    AKAR Farm utilizes repurposed shipping containers converted into highly efficient hydroponic growing environments. Each 40-foot container can produce the equivalent of 2-3 acres of traditional farmland. The containers are modular, stackable, and can be placed in urban locations close to points of consumption.
                  </p>
                  
                  <h3 className="text-lg font-medium">Growing Systems</h3>
                  <p>
                    Our containers employ advanced nutrient film technique (NFT) and deep water culture (DWC) hydroponic systems, optimized for different crop types. LED lighting systems are calibrated to provide specific light spectrums for each crop variety, maximizing growth rates and nutritional content while minimizing energy usage.
                  </p>
                  
                  <h3 className="text-lg font-medium">Crop Selection & Rotation</h3>
                  <p>
                    AKAR Farm focuses on high-value crops with short growing cycles, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Lettuce varieties (15-21 day cycle)</li>
                    <li>Kale and microgreens (10-14 day cycle)</li>
                    <li>Herbs such as basil, mint, and cilantro (21-28 day cycle)</li>
                    <li>Strawberries (recurring harvest cycles)</li>
                    <li>Specialty greens for the premium restaurant market</li>
                  </ul>
                  
                  <p className="mt-4">
                    These crops are selected based on market demand, profitability, and suitability for hydroponic container cultivation. Our crop rotation strategy ensures continuous production and optimization of container resources throughout the year.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="tokenomics">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">4</span>
                    </div>
                    <CardTitle>$AGRI Tokenomics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Token Overview</h3>
                  <p>
                    $AGRI is the native utility token of the AKAR Farm ecosystem, deployed on Arbitrum's Layer 2 network. Built on Arbitrum's secure and scalable infrastructure, $AGRI enables governance, investment in container farming projects, and serves as a medium of exchange within the platform. The total supply of $AGRI tokens is capped at 100,000,000.
                  </p>
                  
                  <h3 className="text-lg font-medium">Token Allocation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Initial Distribution</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Public Sale: 40%</li>
                        <li>• Team & Advisors: 15% (3-year vesting)</li>
                        <li>• Ecosystem Growth: 20%</li>
                        <li>• Liquidity Provision: 10%</li>
                        <li>• Treasury: 10%</li>
                        <li>• Farming Rewards: 5%</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Token Economics</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Initial Price: $1.00 USD</li>
                        <li>• Listing Price: $1.20 USD</li>
                        <li>• Emission Schedule: 4-year gradual release</li>
                        <li>• Burn Mechanism: 2% of profits used for token burns</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium">Token Utility</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Purchase of container farm shares</li>
                    <li>Staking for stAGRI to earn yields from farm operations</li>
                    <li>Governance voting on platform decisions</li>
                    <li>Access to premium features (advanced analytics, priority access to new farms)</li>
                    <li>Discounts on produce purchases</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="staking">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">5</span>
                    </div>
                    <CardTitle>stAGRI Staking Model</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Staking Mechanism</h3>
                  <p>
                    Holders of $AGRI tokens can stake their tokens in specific container farming projects to receive stAGRI tokens through Arbitrum's smart contract infrastructure. Each container has its own stAGRI token variant (e.g., stAGRI-C001 for Container #001), representing fractional ownership in that specific container's operations and profits, all secured by Arbitrum's optimistic rollup technology.
                  </p>
                  
                  <h3 className="text-lg font-medium">Revenue Distribution</h3>
                  <p>
                    The container farm generates revenue through the sale of produce. This revenue is distributed as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>70% to stAGRI holders proportional to their stake</li>
                    <li>20% for operational expenses (energy, nutrients, maintenance)</li>
                    <li>8% for platform development and expansion</li>
                    <li>2% for $AGRI token burns</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium">Yield Generation</h3>
                  <p>
                    The projected annual yield for stAGRI holders ranges from 12-18%, depending on crop selection, market conditions, and operational efficiency. Yields are distributed monthly based on actual container performance, providing a stable passive income stream for investors.
                  </p>
                  
                  <h3 className="text-lg font-medium">Staking Periods</h3>
                  <p>
                    Investors can choose from different staking periods:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium">Flexible</h4>
                      <p className="text-sm text-muted-foreground">No lock-up period</p>
                      <p className="text-sm">Base yield rate</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium">3-Month Lock</h4>
                      <p className="text-sm text-muted-foreground">90-day commitment</p>
                      <p className="text-sm">Base yield + 2%</p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium">12-Month Lock</h4>
                      <p className="text-sm text-muted-foreground">365-day commitment</p>
                      <p className="text-sm">Base yield + 5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="iot">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">6</span>
                    </div>
                    <CardTitle>IoT & Monitoring System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Sensor Network</h3>
                  <p>
                    Each AKAR container farm is equipped with an extensive network of IoT sensors monitoring critical growing parameters:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Temperature and humidity sensors</li>
                    <li>CO2 and O2 level monitors</li>
                    <li>Water level, flow rate, and temperature sensors</li>
                    <li>pH and electrical conductivity (EC) sensors</li>
                    <li>Total dissolved solids (TDS) meters</li>
                    <li>Light intensity and spectrum analyzers</li>
                    <li>Energy consumption monitors</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium">Data Collection & Analysis</h3>
                  <p>
                    Sensor data is collected in real-time and stored on a secure cloud platform. Advanced analytics algorithms process this data to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Optimize growing conditions for each crop variety</li>
                    <li>Identify potential issues before they affect crop health</li>
                    <li>Calculate exact nutrient requirements based on plant growth stage</li>
                    <li>Reduce energy consumption through intelligent lighting and climate control</li>
                    <li>Predict harvest dates and yields with increasing accuracy</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium">Investor Dashboard</h3>
                  <p>
                    stAGRI holders gain access to a comprehensive dashboard displaying:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Live sensor data from their staked containers</li>
                    <li>Crop growth progress and projected harvest dates</li>
                    <li>Historical performance metrics and yield data</li>
                    <li>Financial performance including revenue, expenses, and projected returns</li>
                    <li>Marketplace data for buying/selling stAGRI positions</li>
                  </ul>
                  
                  <p className="mt-4">
                    This unprecedented level of transparency ensures investors can monitor their investment in real-time, building trust in the AKAR farming operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="roadmap">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">7</span>
                    </div>
                    <CardTitle>Project Roadmap</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phase 1: Foundation (Q2-Q3 2023)</h3>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Complete pilot container farm in Jakarta</li>
                        <li>Develop and test IoT monitoring system</li>
                        <li>Establish initial B2B partnerships</li>
                        <li>$AGRI token development and audit on Arbitrum</li>
                        <li>Private investment round</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phase 2: Launch (Q4 2023)</h3>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>$AGRI token public sale on Arbitrum</li>
                        <li>Platform beta launch</li>
                        <li>First 5 container farms operational</li>
                        <li>Initial stAGRI staking program on Arbitrum</li>
                        <li>Exchange listings</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phase 3: Growth (2024)</h3>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Expand to 25 container farms in Jakarta</li>
                        <li>Launch secondary marketplace for stAGRI tokens on Arbitrum</li>
                        <li>Develop governance protocol</li>
                        <li>Implement AI-driven crop optimization</li>
                        <li>Expand crop varieties</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phase 4: Expansion (2025-2026)</h3>
                      <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Regional expansion to Singapore and Malaysia</li>
                        <li>100+ container farm network</li>
                        <li>Integrated wholesale marketplace</li>
                        <li>Carbon credit generation program</li>
                        <li>Research partnerships with universities</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="governance">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">8</span>
                    </div>
                    <CardTitle>Governance Model</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Decentralized Decision Making</h3>
                  <p>
                    The AKAR ecosystem employs a hybrid governance model that balances operational efficiency with stakeholder input. $AGRI holders can participate in governance through:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Voting on new container farm locations</li>
                    <li>Approving major platform upgrades</li>
                    <li>Selecting crop varieties for new containers</li>
                    <li>Adjusting yield distribution parameters</li>
                    <li>Proposing and voting on improvement proposals</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium">Voting Mechanism</h3>
                  <p>
                    Voting power is determined by $AGRI holdings using a quadratic voting system that prevents excessive influence by large token holders. Both $AGRI and stAGRI tokens grant voting rights, with stAGRI providing additional weight for votes directly related to their specific container.
                  </p>
                  
                  <h3 className="text-lg font-medium">Operational Management</h3>
                  <p>
                    Daily operations are managed by the AKAR team of agricultural and technical experts. The team's performance is evaluated quarterly through transparent metrics visible to all token holders, ensuring accountability and alignment with investor interests.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="team">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">9</span>
                    </div>
                    <CardTitle>Team & Advisors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Core Team</h3>
                  <p>
                    The AKAR Farm team combines expertise in agriculture, technology, and finance:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col">
                      <h4 className="font-medium">Dr. Adi Suryanto</h4>
                      <span className="text-sm text-muted-foreground">CEO & Co-Founder</span>
                      <p className="text-sm mt-1">
                        Former agricultural research director with 15+ years of experience in hydroponic systems and crop science. PhD in Agricultural Engineering.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">Indra Wijaya</h4>
                      <span className="text-sm text-muted-foreground">CTO & Co-Founder</span>
                      <p className="text-sm mt-1">
                        Software architect specializing in IoT systems. Previously led engineering teams at multiple successful tech startups in Southeast Asia.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">Maria Chen</h4>
                      <span className="text-sm text-muted-foreground">CFO</span>
                      <p className="text-sm mt-1">
                        Financial strategist with experience in agricultural commodities trading and blockchain-based financial products. MBA from INSEAD.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">Alex Thomson</h4>
                      <span className="text-sm text-muted-foreground">Head of Agriculture</span>
                      <p className="text-sm mt-1">
                        Vertical farming specialist with experience managing large-scale hydroponic operations across Asia Pacific. Expert in crop optimization.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Advisors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col">
                      <h4 className="font-medium">Prof. Eko Prasetyo</h4>
                      <span className="text-sm text-muted-foreground">Agricultural Science Advisor</span>
                      <p className="text-sm mt-1">
                        Leading researcher in hydroponic crop optimization at Institut Pertanian Bogor. Author of numerous papers on controlled environment agriculture.
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <span className="text-sm text-muted-foreground">Blockchain & Tokenization Advisor</span>
                      <p className="text-sm mt-1">
                        Blockchain architect specializing in asset tokenization. Previously led projects tokenizing real estate and commodities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8" id="legal">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">10</span>
                    </div>
                    <CardTitle>Legal & Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Regulatory Framework</h3>
                  <p>
                    AKAR Farm operates within the regulatory frameworks of Indonesia and Singapore. The project has obtained all necessary permits for agricultural operations in Jakarta and complies with relevant securities regulations for the issuance of tokenized assets.
                  </p>
                  
                  <h3 className="text-lg font-medium">Risk Disclosure</h3>
                  <p>
                    Investment in $AGRI tokens and stAGRI staking involves various risks, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Agricultural operational risks (crop failure, disease, etc.)</li>
                    <li>Market risks (produce price fluctuations)</li>
                    <li>Regulatory risks (changes in securities or agricultural regulations)</li>
                    <li>Technology risks (sensor failures, smart contract vulnerabilities)</li>
                    <li>Token value volatility</li>
                  </ul>
                  <p className="mt-2">
                    Detailed risk factors are provided in the investment documentation. Investors are advised to carefully consider these risks before investing.
                  </p>
                  
                  <h3 className="text-lg font-medium">Privacy & Data Protection</h3>
                  <p>
                    AKAR Farm is committed to protecting user data and privacy. The platform complies with GDPR and relevant Indonesian data protection regulations. All sensor data is anonymized when shared publicly, and personal information is handled according to our Privacy Policy.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-lg mt-6">
                    <p className="text-sm">
                      This whitepaper is provided for informational purposes only and does not constitute an offer to sell or solicitation of an offer to buy any securities or tokens. Potential investors should consult their financial, legal, and tax advisors before making any investment decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center mt-12">
                <Button onClick={() => navigate('/connect-wallet')} size="lg" className="gap-2">
                  Connect Wallet and Start Investing <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer language={language} />
    </>
  );
};

export default Whitepaper;
