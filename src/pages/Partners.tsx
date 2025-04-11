
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppleButton } from "@/components/ui/apple-button";
import { Handshake, Building, Leaf, Landmark, Building2, Globe, Award, BarChart3, ArrowRight } from 'lucide-react';

// Partner interface
interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Investor' | 'Technology' | 'Distribution' | 'Research';
  description: string;
  website: string;
}

const Partners = () => {
  // Function to handle logo errors by providing a fallback
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg'; 
    e.currentTarget.classList.add('opacity-50');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Partners & Ecosystem</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AKAR collaborates with industry leaders, innovators, and change-makers to revolutionize agriculture through technology and sustainability.
          </p>
        </section>
        
        {/* Key Partners */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Key Strategic Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <a href="https://www.antler.co" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="h-16 flex items-center justify-center">
                    <img 
                      src="https://assets.website-files.com/5d121ce15cf420419d2d0a13/5d268f7f1e8b180e22e1d23f_Antler-black.svg" 
                      alt="Antler Logo" 
                      className="max-h-10" 
                      onError={handleLogoError}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">Antler</CardTitle>
                  <CardDescription>
                    Early-stage VC enabling and investing in exceptional founders building the defining companies of tomorrow.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Badge icon={<Building className="w-4 h-4" />} label="Strategic Investor" />
                </CardFooter>
              </Card>
            </a>
            
            <a href="https://indodax.com" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="h-16 flex items-center justify-center">
                    <img 
                      src="https://images.static-thomann.de/pics/bdb/536957/17444876_800.jpg" 
                      alt="Indodax Logo" 
                      className="max-h-10" 
                      onError={handleLogoError}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">Indodax</CardTitle>
                  <CardDescription>
                    Indonesia's largest and most trusted cryptocurrency exchange, supporting AKAR's tokenization platform.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Badge icon={<BarChart3 className="w-4 h-4" />} label="Blockchain Partner" />
                </CardFooter>
              </Card>
            </a>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="h-16 flex items-center justify-center">
                    <img 
                      src="https://astradigital.co.id/wp-content/themes/astradigital/assets/img/logo/logo-2.webp" 
                      alt="Astra Digital Logo" 
                      className="max-h-10" 
                      onError={handleLogoError}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">Astra Digital</CardTitle>
                  <CardDescription>
                    Digital arm of Astra International, driving technological innovation and digital transformation across Indonesia.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Badge icon={<Globe className="w-4 h-4" />} label="Technology Partner" />
                </CardFooter>
              </Card>
            </a>
            
            <a href="https://www.angoventures.id" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="h-16 flex items-center justify-center">
                    <img 
                      src="https://www.angoventures.id/assets/img/logo-compact.png" 
                      alt="ANGO VC Logo" 
                      className="max-h-10" 
                      onError={handleLogoError}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">ANGO VC</CardTitle>
                  <CardDescription>
                    Leading Indonesian venture capital firm specializing in early-stage agritech and sustainability investments.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Badge icon={<Building className="w-4 h-4" />} label="Strategic Investor" />
                </CardFooter>
              </Card>
            </a>
          </div>
        </section>
        
        {/* Partner Categories */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Our Partnership Ecosystem</h2>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Building className="text-primary" />
                Investment Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.filter(partner => partner.category === 'Investor').map(partner => (
                  <PartnerLogo key={partner.id} partner={partner} onError={handleLogoError} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="text-primary" />
                Technology Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.filter(partner => partner.category === 'Technology').map(partner => (
                  <PartnerLogo key={partner.id} partner={partner} onError={handleLogoError} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="text-primary" />
                Distribution Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.filter(partner => partner.category === 'Distribution').map(partner => (
                  <PartnerLogo key={partner.id} partner={partner} onError={handleLogoError} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Leaf className="text-primary" />
                Research & Innovation Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.filter(partner => partner.category === 'Research').map(partner => (
                  <PartnerLogo key={partner.id} partner={partner} onError={handleLogoError} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits of Partnership */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/20 p-8 rounded-xl space-y-6">
          <h2 className="text-3xl font-bold">Partner With AKAR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                At AKAR, we believe that transforming agriculture requires collaboration. We're always looking for partners who share our vision of a sustainable, tech-enabled future for farming.
              </p>
              <p className="text-lg mb-6">
                Whether you're an investor, technology provider, distributor, or research institution, there are numerous opportunities to collaborate and create mutual value.
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold text-xl">Partnership Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <span>Access to cutting-edge agricultural technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <span>Participation in blockchain-enabled agricultural tokenization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <span>Co-development of sustainable farming solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <span>Joint research and innovation opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-4">Become a Partner</h3>
                <p className="mb-4">
                  Interested in exploring partnership opportunities with AKAR? Get in touch with our partnerships team to discuss how we can collaborate.
                </p>
                <AppleButton variant="green" className="w-full">
                  Contact Partnership Team
                </AppleButton>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-4">Partner Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-between">
                      Partnership Brochure <ArrowRight size={16} />
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-between">
                      Technology Integration Guide <ArrowRight size={16} />
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-between">
                      Investment Opportunities <ArrowRight size={16} />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Partnership Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Expanding Access to Sustainable Agriculture</CardTitle>
                  <Award className="text-primary" />
                </div>
                <CardDescription>
                  Partnership with Indonesian Ministry of Agriculture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Through our collaboration with the Indonesian Ministry of Agriculture, AKAR has deployed container farms in 12 provinces across Indonesia, providing sustainable farming technology to rural communities and enhancing food security.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="gap-2">
                  Read Case Study <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Pioneering Blockchain in Agriculture</CardTitle>
                  <Award className="text-primary" />
                </div>
                <CardDescription>
                  Partnership with Indodax
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our strategic partnership with Indodax has enabled AKAR to create Indonesia's first blockchain-based agricultural investment platform, democratizing access to farming investments and creating new revenue streams for local farmers.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="gap-2">
                  Read Case Study <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
};

// Partner Logo Component
const PartnerLogo = ({ partner, onError }: { partner: Partner, onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void }) => {
  return (
    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-center h-[100px] hover:shadow-md transition-all">
        <img 
          src={partner.logo} 
          alt={`${partner.name} Logo`} 
          className="max-h-12 max-w-full"
          onError={onError}
        />
      </div>
    </a>
  );
};

// Mock partners with updated, more reliable logo URLs
const partners: Partner[] = [
  {
    id: '1',
    name: 'Antler',
    logo: 'https://assets.website-files.com/5d121ce15cf420419d2d0a13/5d268f7f1e8b180e22e1d23f_Antler-black.svg',
    category: 'Investor',
    description: 'Early-stage VC enabling and investing in exceptional founders building the defining companies of tomorrow.',
    website: 'https://www.antler.co'
  },
  {
    id: '2',
    name: 'Indodax',
    logo: 'https://images.static-thomann.de/pics/bdb/536957/17444876_800.jpg',
    category: 'Technology',
    description: 'Indonesia\'s largest cryptocurrency exchange supporting AKAR\'s tokenization platform.',
    website: 'https://indodax.com'
  },
  {
    id: '3',
    name: 'Astra Digital',
    logo: 'https://astradigital.co.id/wp-content/themes/astradigital/assets/img/logo/logo-2.webp',
    category: 'Technology',
    description: 'Digital arm of Astra International, driving technological innovation across Indonesia.',
    website: '#'
  },
  {
    id: '4',
    name: 'BCA',
    logo: 'https://cdn.freebiesupply.com/logos/large/2x/bca-bank-central-asia-logo-png-transparent.png',
    category: 'Investor',
    description: 'Indonesia\'s largest private bank providing financial services and investment support.',
    website: '#'
  },
  {
    id: '5',
    name: 'Bukalapak',
    logo: 'https://assets.bukalapak.com/sigil/bukalapak-logo-primary.svg',
    category: 'Distribution',
    description: 'E-commerce platform helping distribute AKAR\'s farm products to consumers across Indonesia.',
    website: '#'
  },
  {
    id: '6',
    name: 'Institut Pertanian Bogor',
    logo: 'https://1000logos.net/wp-content/uploads/2022/08/IPB-University-Logo.png',
    category: 'Research',
    description: 'Leading agricultural university partnering on research and development of farming technology.',
    website: '#'
  },
  {
    id: '7',
    name: 'Polygon',
    logo: 'https://altcoinsbox.com/wp-content/uploads/2023/01/polygon-matic-logo.png',
    category: 'Technology',
    description: 'Blockchain platform powering AKAR\'s tokenization ecosystem with low-cost, sustainable transactions.',
    website: '#'
  },
  {
    id: '8',
    name: 'GoTo Group',
    logo: 'https://gotocompany.com/img/logo/goto_light.svg',
    category: 'Distribution',
    description: 'Indonesia\'s largest tech company providing logistics and distribution support for AKAR products.',
    website: '#'
  },
  {
    id: '9',
    name: 'Kementan RI',
    logo: 'https://pertanian.go.id/home/img/logo-kementan-2021b.png',
    category: 'Research',
    description: 'Indonesian Ministry of Agriculture partnering on food security initiatives and rural deployment.',
    website: '#'
  },
  {
    id: '10',
    name: 'Telkom Indonesia',
    logo: 'https://seeklogo.com/images/T/telkom-indonesia-logo-CEC385B9D5-seeklogo.com.png',
    category: 'Technology',
    description: 'Indonesia\'s largest telecommunications company supporting IoT connectivity for AKAR farms.',
    website: '#'
  },
  {
    id: '11',
    name: 'East Ventures',
    logo: 'https://east.vc/wp-content/uploads/2021/01/EV-Logo-Standard-Original.png',
    category: 'Investor',
    description: 'Venture capital firm focused on early-stage startups in Southeast Asia.',
    website: '#'
  },
  {
    id: '12',
    name: 'Universitas Indonesia',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Universitas_Indonesia_logo.svg/1200px-Universitas_Indonesia_logo.svg.png',
    category: 'Research',
    description: 'Top Indonesian university collaborating on blockchain technology research and development.',
    website: '#'
  },
  {
    id: '13',
    name: 'ANGO VC',
    logo: 'https://www.angoventures.id/assets/img/logo-compact.png',
    category: 'Investor',
    description: 'Leading Indonesian venture capital firm specializing in early-stage agritech and sustainability investments.',
    website: 'https://www.angoventures.id'
  },
  {
    id: '14',
    name: 'Telkom University',
    logo: 'https://www.telkomuniversity.ac.id/wp-content/uploads/2019/07/Logo-Telkom-University-768x802.png',
    category: 'Research',
    description: 'Leading private technology-focused university in Indonesia contributing to agricultural innovation research.',
    website: 'https://telkomuniversity.ac.id'
  }
];

export default Partners;
