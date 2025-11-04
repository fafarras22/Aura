import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Database, BarChart3, Users, Cpu, Leaf, TrendingUp } from "lucide-react";

export const FarmOSHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Complete Farm Management Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              AKAR Farm OS manages your entire farm operation - from sensors to sales, HR to AI analytics. 
              Deploy in minutes, scale to thousands of farms.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/farm-os')}>
                Request Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </div>
            
            <div className="pt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Farms Connected</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Database className="w-8 h-8" />}
              title="Operations"
              description="Full farm operations management"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Sales Analytics"
              description="Real-time sales tracking & B2B integration"
            />
            <FeatureCard 
              icon={<Leaf className="w-8 h-8" />}
              title="Sensors & IoT"
              description="Climate, water, and production monitoring"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="HR Management"
              description="Workforce scheduling & payroll"
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8" />}
              title="AI Analytics"
              description="Business intelligence & predictions"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Financial Integration"
              description="Connect to 3rd party financial services"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
    <div className="text-primary mb-3">{icon}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
