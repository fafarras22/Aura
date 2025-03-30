
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleButton } from "@/components/ui/apple-button";
import { BriefcaseBusiness, MapPin, Users, Heart, Zap, Coffee, Clock, ArrowRight, Leaf, Code, BarChart3, GlobeIcon } from 'lucide-react';

// Job interface
interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  posted: string;
  description: string;
  requirements: string[];
}

const Careers = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Join the AKAR Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us revolutionize agriculture through technology and sustainability.
          </p>
        </section>
        
        {/* Why Join Us */}
        <section className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <img 
            src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png"
            alt="AKAR Team" 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Why Join AKAR?</h2>
            <p className="text-white/90 mb-6">
              At AKAR, we're not just building container farms—we're creating a sustainable future for agriculture. Join our diverse team of innovators, engineers, and sustainability experts making a real impact.
            </p>
            <Button variant="apple" className="rounded-full">
              Learn About Our Culture
            </Button>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Benefits & Perks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard 
              icon={<Heart className="w-5 h-5" />}
              title="Health & Wellness"
              description="Comprehensive medical, dental, and vision coverage for you and your dependents."
            />
            
            <BenefitCard 
              icon={<Zap className="w-5 h-5" />}
              title="Growth Opportunities"
              description="Professional development budget and clear career advancement paths."
            />
            
            <BenefitCard 
              icon={<Leaf className="w-5 h-5" />}
              title="Sustainability Focus"
              description="Work on projects that make a positive environmental impact."
            />
            
            <BenefitCard 
              icon={<Coffee className="w-5 h-5" />}
              title="Work-Life Balance"
              description="Flexible working hours and generous paid time off policy."
            />
            
            <BenefitCard 
              icon={<Clock className="w-5 h-5" />}
              title="Remote Work Options"
              description="Hybrid work model with flexible remote work possibilities."
            />
            
            <BenefitCard 
              icon={<Users className="w-5 h-5" />}
              title="Inclusive Culture"
              description="Diverse, collaborative environment that values every voice."
            />
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Open Positions</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {jobListings.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="engineering" className="space-y-4">
              {jobListings.filter(job => job.department === 'Engineering').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="business" className="space-y-4">
              {jobListings.filter(job => job.department === 'Business Development').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="operations" className="space-y-4">
              {jobListings.filter(job => job.department === 'Operations').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="design" className="space-y-4">
              {jobListings.filter(job => job.department === 'Design').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Our Values */}
        <section className="space-y-6 bg-gradient-to-br from-primary/5 to-primary/20 p-8 rounded-xl">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GlobeIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Sustainability First</h3>
              <p>
                Every decision we make is guided by our commitment to environmental sustainability and responsible resource management.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Code className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Innovation & Excellence</h3>
              <p>
                We push the boundaries of what's possible in agriculture, continuously seeking new solutions and striving for excellence.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Collaborative Community</h3>
              <p>
                We believe in the power of diverse perspectives and foster an inclusive environment where everyone can contribute their best.
              </p>
            </div>
          </div>
        </section>
        
        {/* Apply Section */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">Don't See the Right Fit?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about our mission. Send us your resume and tell us why you'd be a great addition to the AKAR team.
          </p>
          <div className="flex justify-center mt-6">
            <AppleButton variant="green" className="px-8 py-3">
              Submit Open Application
            </AppleButton>
          </div>
        </section>
      </div>
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Job Card Component
const JobCard = ({ job }: { job: JobListing }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1 gap-1">
              <BriefcaseBusiness className="w-4 h-4" />
              <span>{job.department}</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">{job.type}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{job.description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold">Key Requirements:</h4>
          <ul className="list-disc list-inside space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-sm">{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
        <Button className="gap-2">
          View & Apply <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Mock job listings
const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Jakarta, Indonesia (Remote Option)',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Join our engineering team to develop and maintain our proprietary farm management software and blockchain integration systems.',
    requirements: [
      '5+ years of full-stack development experience',
      'Strong knowledge of React, Node.js, and TypeScript',
      'Experience with blockchain technologies, preferably Polygon ecosystem',
      'Background in IoT or agricultural technology a plus'
    ]
  },
  {
    id: '2',
    title: 'Agricultural Technology Specialist',
    department: 'Operations',
    location: 'Bandung, Indonesia',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Lead the implementation and optimization of our container farming systems, ensuring maximum efficiency and crop yield.',
    requirements: [
      'Degree in Agricultural Science, Engineering, or related field',
      'Experience with hydroponics or vertical farming systems',
      'Knowledge of environmental control systems and sensor networks',
      'Strong problem-solving and analytical skills'
    ]
  },
  {
    id: '3',
    title: 'Blockchain Business Development Manager',
    department: 'Business Development',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Drive the adoption of our tokenization platform and develop strategic partnerships within the blockchain and agricultural sectors.',
    requirements: [
      'Proven track record in business development or sales in blockchain/crypto space',
      'Strong understanding of tokenization and DeFi concepts',
      'Excellent relationship-building and communication skills',
      'Knowledge of agricultural industry a plus'
    ]
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote (Indonesia-based)',
    type: 'Full-time',
    posted: '5 days ago',
    description: 'Create beautiful, intuitive user interfaces for our farm management platform and tokenization dashboard.',
    requirements: [
      '3+ years of UI/UX design experience for web applications',
      'Proficiency in Figma and modern design systems',
      'Experience designing data visualization and dashboards',
      'Understanding of blockchain user experience challenges'
    ]
  },
  {
    id: '5',
    title: 'Operations Manager',
    department: 'Operations',
    location: 'Surabaya, Indonesia',
    type: 'Full-time',
    posted: '2 weeks ago',
    description: 'Oversee the daily operations of our container farms, ensuring optimal performance, maintenance, and logistics coordination.',
    requirements: [
      'Experience in operations management, preferably in agriculture or manufacturing',
      'Strong leadership and team management skills',
      'Knowledge of supply chain management and logistics',
      'Problem-solving mindset with attention to detail'
    ]
  }
];

export default Careers;
