
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, FileText, BarChart3, Leaf, SproutIcon, UserCircle, Globe, Lock, Wallet, Blocks, PieChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Whitepaper = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const sections = [
    { id: 'introduction', name: 'Introduction' },
    { id: 'problem', name: 'Problem Statement' },
    { id: 'solution', name: 'AKAR Solution' },
    { id: 'technology', name: 'Technology' },
    { id: 'tokenomics', name: 'Tokenomics' },
    { id: 'roadmap', name: 'Roadmap' },
    { id: 'team', name: 'Team & Advisors' },
    { id: 'legal', name: 'Legal & Compliance' }
  ];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-20">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    AKAR Whitepaper
                  </CardTitle>
                  <CardDescription>v1.0.4 - Updated April 2024</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search whitepaper..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </CardContent>
                <CardContent className="space-y-2">
                  <div className="text-sm font-medium">Table of Contents</div>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-1">
                      {sections.map((section) => (
                        <Button
                          key={section.id}
                          variant={activeSection === section.id ? "default" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => handleSectionClick(section.id)}
                        >
                          {section.name}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Reading Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={68} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    You've read 68% of the whitepaper
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">AKAR Whitepaper</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">v1.0.4</Badge>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            </div>
                    
            <section id="introduction" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Introduction</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AKAR is revolutionizing sustainable agriculture in Indonesia and Southeast Asia through the fusion of advanced container farming technology and blockchain innovation. Our mission is to ensure food security, promote sustainable farming practices, and create accessible investment opportunities in agriculture.
                </p>
                
                <p>
                  This whitepaper outlines AKAR's vision, technology, token economy, and roadmap. It serves as the definitive resource for understanding how AKAR is transforming the agricultural sector through technology-driven solutions while creating a transparent, efficient marketplace for agricultural assets through blockchain tokenization.
                </p>
                
                <div className="py-4">
                  <img 
                    src="/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png" 
                    alt="AKAR Container Farm" 
                    className="rounded-xl w-full object-cover h-64"
                  />
                </div>
                
                <h3 className="text-xl font-semibold">Vision & Mission</h3>
                <p>
                  Our vision is to create a sustainable agricultural ecosystem that leverages cutting-edge technology to address food security challenges while providing equitable access to agricultural investments through blockchain technology.
                </p>
                
                <p>
                  AKAR's mission is to:
                </p>
                
                <ul>
                  <li>Deploy smart container farms across Indonesia to increase food production in urban and remote areas</li>
                  <li>Reduce water usage and environmental impact through precision agriculture technology</li>
                  <li>Create a transparent investment platform for agricultural assets through tokenization</li>
                  <li>Empower local communities through knowledge transfer and economic opportunity</li>
                </ul>
              </div>
            </section>
            
            <section id="problem" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Problem Statement</h2>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold">Food Security Challenges</h3>
                <p>
                  Indonesia and many Southeast Asian countries face significant food security challenges due to:
                </p>
                
                <ul>
                  <li>Limited arable land and increasing urbanization</li>
                  <li>Vulnerability to climate change and extreme weather events</li>
                  <li>Complex archipelagic geography that complicates distribution</li>
                  <li>Growing population and increasing food demand</li>
                </ul>
                
                <h3 className="text-xl font-semibold">Agricultural Investment Barriers</h3>
                <p>
                  Traditional agricultural investments are hindered by:
                </p>
                
                <ul>
                  <li>High capital requirements creating barriers to entry</li>
                  <li>Lack of transparency in farm operations and performance</li>
                  <li>Illiquidity of agricultural assets</li>
                  <li>Limited access to farming expertise and technology</li>
                </ul>
                
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <h4 className="text-2xl font-bold text-primary mb-2">60%</h4>
                      <p className="text-sm">Of Indonesia's population will live in urban areas by 2025</p>
                    </div>
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <h4 className="text-2xl font-bold text-primary mb-2">40%</h4>
                      <p className="text-sm">Of agricultural production is lost due to inefficient supply chains</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="solution" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">AKAR Solution</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AKAR provides a comprehensive solution that combines advanced container farming technology with blockchain-powered tokenization to address both food security challenges and investment barriers.
                </p>
                
                <h3 className="text-xl font-semibold">Container Farming Platform</h3>
                <div className="grid md:grid-cols-2 gap-6 my-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Leaf className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Resource Efficiency</h4>
                        <p className="text-sm">Uses 95% less water than traditional farming with higher crop yields</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Location Flexibility</h4>
                        <p className="text-sm">Deployable in urban centers and remote islands, addressing Indonesia's geographical challenges</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <SproutIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Year-Round Production</h4>
                        <p className="text-sm">Climate-controlled environment enables consistent harvests regardless of external conditions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Data-Driven Farming</h4>
                        <p className="text-sm">IoT sensors and AI optimize growing conditions and predict maintenance needs</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold">Blockchain Tokenization</h3>
                <p>
                  AKAR's tokenization platform transforms how agricultural assets are owned and traded:
                </p>
                
                <ul>
                  <li>Fractional ownership lowers barriers to entry for agricultural investments</li>
                  <li>Transparent performance metrics and operations data</li>
                  <li>Liquidity through secondary market trading</li>
                  <li>Automated distribution of farming revenues through smart contracts</li>
                </ul>
                
                <div className="py-4">
                  <img 
                    src="/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png" 
                    alt="AKAR Tokenization Platform" 
                    className="rounded-xl w-full object-cover h-64"
                  />
                </div>
              </div>
            </section>
            
            <section id="technology" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Technology</h2>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold">Smart Container Farm Technology</h3>
                <p>
                  AKAR's container farms integrate multiple technologies to create optimal growing environments:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Hydroponic Systems</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Nutrient film technique and deep water culture systems maximize space utilization and nutrient efficiency.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">LED Lighting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Customized light spectrums for different crops optimize photosynthesis while minimizing energy usage.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Climate Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Precise temperature, humidity, and CO₂ management systems create ideal growing conditions year-round.</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold">IoT & Data Analytics</h3>
                <p>
                  Our proprietary sensor network and data platform enable:
                </p>
                
                <ul>
                  <li>Real-time monitoring of all environmental parameters</li>
                  <li>Predictive maintenance to minimize downtime</li>
                  <li>Machine learning algorithms that continuously improve growing recipes</li>
                  <li>Remote management capabilities via mobile and web applications</li>
                </ul>
                
                <h3 className="text-xl font-semibold">Blockchain Infrastructure</h3>
                <p>
                  AKAR's blockchain technology is built on Polygon, a layer-2 scaling solution for Ethereum, providing:
                </p>
                
                <ul>
                  <li>Low transaction costs and high throughput for efficient operations</li>
                  <li>ERC-20 standard compatibility for broad market integration</li>
                  <li>Smart contracts for automated revenue distribution and governance</li>
                  <li>Immutable record-keeping for transparent farm performance tracking</li>
                </ul>
                
                <div className="bg-muted p-6 rounded-lg my-4">
                  <h4 className="text-lg font-medium mb-2">Technical Architecture</h4>
                  <p className="text-sm mb-4">
                    AKAR's technology stack integrates farm operations with blockchain infrastructure seamlessly:
                  </p>
                  <img 
                    src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
                    alt="AKAR Technical Architecture" 
                    className="rounded-lg w-full object-cover h-48 mb-4"
                  />
                  <p className="text-xs text-muted-foreground">
                    AKAR's platform connects sensor data from container farms to the user-facing applications and blockchain layer, creating a fully integrated system.
                  </p>
                </div>
              </div>
            </section>
            
            <section id="tokenomics" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Tokenomics</h2>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold">Token Utility</h3>
                <p>
                  The $AKR token serves multiple functions within the AKAR ecosystem:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <PieChart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Ownership Representation</h4>
                        <p className="text-sm">Tokens represent fractional ownership of farm assets and entitle holders to proportional revenue</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Governance Rights</h4>
                        <p className="text-sm">Token holders can participate in decisions regarding farm operations and ecosystem development</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Blocks className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Liquidity Provision</h4>
                        <p className="text-sm">Staking tokens in liquidity pools earns additional rewards while supporting token liquidity</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Priority Access</h4>
                        <p className="text-sm">Token holders get privileged access to new farm launches and investment opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold">Token Distribution</h3>
                <p>
                  The total supply of $AKR tokens is fixed at 100,000,000, with the following allocation:
                </p>
                
                <div className="overflow-x-auto my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Allocation</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Vesting Period</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Public Sale</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell>30,000,000 $AKR</TableCell>
                        <TableCell>None</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Farm Development</TableCell>
                        <TableCell>25%</TableCell>
                        <TableCell>25,000,000 $AKR</TableCell>
                        <TableCell>25% at TGE, 25% every 6 months</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Team & Advisors</TableCell>
                        <TableCell>15%</TableCell>
                        <TableCell>15,000,000 $AKR</TableCell>
                        <TableCell>1-year cliff, then 25% every 6 months</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ecosystem Growth</TableCell>
                        <TableCell>15%</TableCell>
                        <TableCell>15,000,000 $AKR</TableCell>
                        <TableCell>10% at TGE, then 15% quarterly</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Community Rewards</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>10,000,000 $AKR</TableCell>
                        <TableCell>Released gradually over 3 years</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Liquidity Pool</TableCell>
                        <TableCell>5%</TableCell>
                        <TableCell>5,000,000 $AKR</TableCell>
                        <TableCell>Locked for 2 years</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="py-4">
                  <h4 className="text-lg font-medium mb-4">Token Utility Flow</h4>
                  <img 
                    src="/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png" 
                    alt="AKAR Token Flow" 
                    className="rounded-xl w-full max-h-80 object-contain bg-muted p-4"
                  />
                </div>
              </div>
            </section>
            
            <section id="roadmap" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Roadmap</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AKAR's development is planned across multiple phases to ensure steady growth and technological advancement:
                </p>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border py-6 pl-8">
                  <div className="relative">
                    <div className="absolute left-0 top-0 -translate-x-full -mt-0.5 mr-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">Q1</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Phase 1: Foundation (2023 Q1-Q2)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Initial container farm prototypes and testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Core team formation and advisory board establishment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Proof of concept for blockchain integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Seed funding secured</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 -translate-x-full -mt-0.5 mr-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">Q3</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Phase 2: Development (2023 Q3-Q4)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Jakarta pilot container farm deployment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Farm management system beta release</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="success">Completed</Badge>
                          <span>Smart contract development and auditing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>In Progress</Badge>
                          <span>Tokenization platform MVP development</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 -translate-x-full -mt-0.5 mr-4 bg-muted text-primary rounded-full w-10 h-10 flex items-center justify-center">Q1</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Phase 3: Expansion (2024 Q1-Q2)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Private token sale for early investors</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Expansion to 5 major Indonesian cities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Full tokenization platform launch</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Mobile application release</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 -translate-x-full -mt-0.5 mr-4 bg-muted text-primary rounded-full w-10 h-10 flex items-center justify-center">Q3</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Phase 4: Growth & Sustainability (2024 Q3-2025)</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Public token offering</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Regional expansion to Singapore, Malaysia and Vietnam</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Advanced AI farming algorithms deployment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge>Planned</Badge>
                          <span>Decentralized governance implementation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="team" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Team & Advisors</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AKAR brings together experts in agriculture, technology, and blockchain to create a truly innovative platform:
                </p>
                
                <h3 className="text-xl font-semibold">Core Team</h3>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <UserCircle className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </div>
                      <CardTitle>Farras Rahman</CardTitle>
                      <CardDescription>Founder & CEO</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>Former AgTech consultant with 10+ years experience in sustainable agriculture projects across Southeast Asia.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <UserCircle className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </div>
                      <CardTitle>Rani Wijaya</CardTitle>
                      <CardDescription>CTO</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>Blockchain developer and IoT specialist with previous experience at major Indonesian tech companies.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <UserCircle className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </div>
                      <CardTitle>Dr. Bambang Suryanto</CardTitle>
                      <CardDescription>Chief Agricultural Officer</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>PhD in Horticultural Science with expertise in hydroponic systems and crop optimization.</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold">Advisors</h3>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Prof. Sarah Chen</CardTitle>
                      <CardDescription>Blockchain Economics Advisor</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>Professor of Tokenomics at National University of Singapore and consultant to multiple successful blockchain projects.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Robert Tanaka</CardTitle>
                      <CardDescription>Agricultural Innovation Advisor</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>Former executive at leading vertical farming companies with expertise in scaling agricultural operations.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Indra Gunawan</CardTitle>
                      <CardDescription>Investment & Strategy Advisor</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <p>Partner at Antler VC with deep expertise in Southeast Asian markets and agrifood investments.</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-xl font-semibold">Partners & Supporters</h3>
                <div className="py-6">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <img 
                        src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
                        alt="Antler VC" 
                        className="h-12 mx-auto object-contain"
                      />
                      <p className="mt-2 text-sm font-medium">Antler VC</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src="/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png" 
                        alt="Indodax" 
                        className="h-12 mx-auto object-contain"
                      />
                      <p className="mt-2 text-sm font-medium">Indodax</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src="/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png" 
                        alt="Astra Digital" 
                        className="h-12 mx-auto object-contain"
                      />
                      <p className="mt-2 text-sm font-medium">Astra Digital</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="legal" className="space-y-6">
              <h2 className="text-3xl font-bold border-b pb-2">Legal & Compliance</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  AKAR is committed to operating within all applicable regulatory frameworks while advocating for progressive regulation that supports innovation in agricultural technology and digital assets.
                </p>
                
                <h3 className="text-xl font-semibold">Regulatory Approach</h3>
                <p>
                  Our approach to compliance includes:
                </p>
                
                <ul>
                  <li>Consultation with Indonesian and regional regulatory authorities</li>
                  <li>Implementing comprehensive KYC/AML procedures for all token purchasers</li>
                  <li>Regular security audits of smart contracts and platform infrastructure</li>
                  <li>Transparent reporting of farm operations and token performance</li>
                </ul>
                
                <div className="bg-muted p-6 rounded-lg my-6">
                  <h4 className="text-lg font-medium mb-2">Disclaimer</h4>
                  <p className="text-sm">
                    This whitepaper is for informational purposes only and does not constitute an offer to sell or solicitation of an offer to buy any securities, tokens or other financial instruments. AKAR tokens may not be purchased by residents of jurisdictions where such purchase would be prohibited. Prospective token purchasers should conduct their own due diligence and consult with legal and financial advisors before making any investment decisions.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold">Risk Factors</h3>
                <p>
                  Potential investors should be aware of various risks associated with agricultural projects and digital assets, including but not limited to:
                </p>
                
                <ul>
                  <li>Regulatory uncertainty in the blockchain and digital asset space</li>
                  <li>Agricultural risks including crop failure, disease, and natural disasters</li>
                  <li>Market volatility affecting token prices</li>
                  <li>Technology risks related to smart contracts and blockchain infrastructure</li>
                </ul>
                
                <p>
                  For a complete analysis of all risk factors, please refer to our comprehensive Risk Disclosure document available on our website.
                </p>
              </div>
            </section>
            
            <div className="my-8 p-6 bg-muted rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-6">
                For more information about AKAR, our technology, or investment opportunities, please contact:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">General Inquiries</h3>
                  <p className="text-sm mb-1">Email: info@akar.cloud</p>
                  <p className="text-sm">Phone: (+62)85 156142193</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Visit Us</h3>
                  <p className="text-sm mb-1">AKAR Technologies</p>
                  <p className="text-sm">Jakarta Innovation Center</p>
                  <p className="text-sm">Jalan Sudirman 123, Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t pt-6">
              <Button variant="outline" size="sm">
                {`← Previous Section`}
              </Button>
              <Button variant="outline" size="sm">
                {`Next Section →`}
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
