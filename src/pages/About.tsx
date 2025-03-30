
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppleButton } from "@/components/ui/apple-button";
import { Users, Target, Award, Shield, Leaf, BarChart3, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About AKAR</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming agriculture through containerized farming technology and blockchain innovation.
          </p>
        </section>
        
        {/* Our Story */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                AKAR was founded in 2022 with a singular vision: to revolutionize agriculture in Indonesia and beyond through sustainable, technology-driven farming solutions.
              </p>
              <p className="text-lg mb-4">
                Our journey began when our founders, a team of agricultural engineers and blockchain specialists, recognized the challenges facing traditional farming in an era of climate change and growing food insecurity.
              </p>
              <p className="text-lg">
                The solution was clear: create modular, efficient farming units that could operate anywhere, and use blockchain technology to democratize investment in agriculture, making it accessible to everyone.
              </p>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
                alt="AKAR Founders" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="space-y-6 bg-gradient-to-br from-primary/5 to-primary/20 p-8 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="text-primary w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-lg">
                To create a sustainable food future by developing and deploying innovative container farming technology that maximizes efficiency, minimizes environmental impact, and promotes accessibility through blockchain-enabled investment.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="text-primary w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="text-lg">
                A world where sustainable, high-quality food is produced efficiently and locally, accessible to all communities regardless of geography, climate, or economic status.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p>
                  We are committed to environmental stewardship through resource-efficient farming practices that reduce water usage, eliminate pesticides, and minimize carbon footprint.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparency</h3>
                <p>
                  We believe in open, honest operations and communication. Our blockchain technology ensures complete traceability and accountability in all our processes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p>
                  We continuously seek new ways to improve our technology, processes, and products, embracing change and pushing the boundaries of what's possible in agriculture.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p>
                  We are dedicated to supporting the communities we operate in, creating economic opportunities and improving food security for local populations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Education</h3>
                <p>
                  We believe in sharing knowledge about sustainable farming practices and blockchain technology to empower individuals and organizations globally.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Team */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeamMember 
              name="Aditya Pratama" 
              role="Chief Executive Officer"
              bio="With 15+ years of experience in agritech, Aditya leads AKAR's vision of revolutionizing farming through containerization and blockchain."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
            
            <TeamMember 
              name="Siti Rahmania" 
              role="Chief Technology Officer"
              bio="A blockchain pioneer with a background in agricultural engineering, Siti drives AKAR's technological innovation and product development."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
            
            <TeamMember 
              name="Budi Santoso" 
              role="Chief Operations Officer"
              bio="An operations expert specializing in supply chain management, Budi ensures the efficient deployment and maintenance of AKAR's container farms."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
            
            <TeamMember 
              name="Maya Wijaya" 
              role="Chief Sustainability Officer"
              bio="With a doctorate in environmental science, Maya leads AKAR's initiatives for sustainable farming practices and minimal ecological impact."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
            
            <TeamMember 
              name="Darmawan Putra" 
              role="Chief Financial Officer"
              bio="A seasoned financial expert with experience in both traditional finance and cryptocurrency, Darmawan manages AKAR's financial strategy and investor relations."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
            
            <TeamMember 
              name="Lina Hartono" 
              role="Head of Global Partnerships"
              bio="With extensive experience in international business development, Lina spearheads AKAR's expansion efforts and strategic partnerships worldwide."
              imageSrc="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png"
            />
          </div>
        </section>
        
        {/* Investors & Partners */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Our Supporters</h2>
          <p className="text-lg mb-6">
            AKAR is proud to be supported by industry-leading investors and partners who share our vision for a sustainable agricultural future.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            <a href="https://www.antler.co" target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-center h-[100px] w-full">
                <img 
                  src="https://assets-global.website-files.com/5d121ce15cf420419d2d0a13/6539c22d6ea8e0a8bbca8ab4_Antler-black.svg" 
                  alt="Antler Logo" 
                  className="max-h-12 dark:invert"
                />
              </div>
            </a>
            
            <a href="https://indodax.com" target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-center h-[100px] w-full">
                <img 
                  src="https://indodax.com/v2/images/logo-indodax.svg" 
                  alt="Indodax Logo" 
                  className="max-h-10 dark:invert"
                />
              </div>
            </a>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-center h-[100px] w-full">
                <img 
                  src="https://astradigital.co.id/wp-content/uploads/2023/02/logo-new-ad.png" 
                  alt="Astra Digital Logo" 
                  className="max-h-12 dark:invert"
                />
              </div>
            </a>
          </div>
        </section>
        
        {/* Contact */}
        <section className="space-y-6 bg-muted p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center">Get In Touch</h2>
          <p className="text-center text-lg mb-6">
            Have questions about AKAR? We'd love to hear from you.
          </p>
          
          <div className="flex justify-center">
            <AppleButton variant="green" className="px-8 py-3">
              Contact Us
            </AppleButton>
          </div>
        </section>
      </div>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, bio, imageSrc }: { name: string; role: string; bio: string; imageSrc: string }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-xl overflow-hidden bg-muted">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-primary font-medium">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
};

export default About;
