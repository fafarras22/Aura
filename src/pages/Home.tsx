
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, SproutIcon, DropletIcon, LineChart, Sparkles, ShoppingCart } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero section */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
              alt="AKAR Logo" 
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                About
              </a>
              <a href="#solutions" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#technology" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Technology
              </a>
              <a href="#tokenization" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Tokenization
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="apple" size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative w-full min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white to-accent/20"></div>
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Revolutionizing Urban Farming for a Sustainable Future
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                AKAR delivers cutting-edge farming solutions with smart container technology. 
                Monitor, analyze, and optimize your farm with our advanced systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <AppleButton variant="primary" className="px-8 py-3">
                  Explore Solutions
                </AppleButton>
                <AppleButton variant="secondary" className="px-8 py-3">
                  Learn More
                </AppleButton>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Advanced Container Farm" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">About AKAR</h2>
            <p className="text-gray-600">
              AKAR is pioneering the future of sustainable urban farming with smart container technology, 
              bridging the gap between advanced agriculture and modern technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Farming</h3>
              <p className="text-gray-600">
                Our container farms use 95% less water than traditional farming methods while maximizing crop yield.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <SproutIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Technology</h3>
              <p className="text-gray-600">
                Advanced sensors monitor every aspect of the growing environment for optimal plant health.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Water Efficiency</h3>
              <p className="text-gray-600">
                Precision irrigation and water recycling systems conserve this precious resource.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solutions section */}
      <section id="solutions" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Solutions</h2>
            <p className="text-gray-600">
              From urban farming containers to comprehensive monitoring systems, AKAR offers end-to-end solutions for modern agriculture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Container Farms</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Fully equipped, turnkey container farming solutions that can be deployed anywhere. Each container is a complete ecosystem optimized for plant growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Modular design for easy scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Comprehensive environmental controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Remote monitoring capabilities</span>
                </li>
              </ul>
              <Button variant="apple-outline" className="rounded-full mt-4">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Monitoring Dashboard</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Our advanced dashboard gives you complete visibility into your farm's operations, allowing you to monitor and control all aspects remotely.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Real-time environmental monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Predictive maintenance alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm text-gray-600">Yield and performance analytics</span>
                </li>
              </ul>
              <Button variant="apple-outline" className="rounded-full mt-4">
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology section */}
      <section id="technology" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <p className="text-gray-600">
              AKAR combines cutting-edge technology with sustainable farming practices to create the most efficient growing systems.
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden mb-16 h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
              alt="AKAR Technology" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-lg">
              <h3 className="text-3xl font-bold text-white mb-4">Smart Monitoring Systems</h3>
              <p className="text-white/90 mb-6">
                Our proprietary sensor network provides continuous data on all critical growing parameters, ensuring optimal conditions around the clock.
              </p>
              <Button variant="apple" className="rounded-full">
                Explore Technology
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Growth Optimization</h3>
              <p className="text-gray-600">
                Machine learning algorithms analyze growing conditions to provide recommendations for improved yields.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DropletIcon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Irrigation Systems</h3>
              <p className="text-gray-600">
                Precise water delivery systems ensure each plant receives exactly what it needs, when it needs it.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Comprehensive data collection and analysis for continuous improvement of farming operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokenization section */}
      <section id="tokenization" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Tokenization</h2>
            <p className="text-gray-600">
              AKAR is pioneering agricultural investment through blockchain technology, allowing investors to participate in the future of farming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Invest in Sustainable Agriculture</h3>
              <p className="text-gray-600 mb-6">
                Through our innovative tokenization model, you can own a stake in container farms and participate in the growing sustainable agriculture market.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Transparent Investment</h4>
                    <p className="text-sm text-gray-600">Full visibility into farm operations and performance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Fractional Ownership</h4>
                    <p className="text-sm text-gray-600">Start with any investment size that fits your portfolio</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-primary font-medium text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Blockchain Security</h4>
                    <p className="text-sm text-gray-600">Built on Polygon PoC for reliable, secure transactions</p>
                  </div>
                </li>
              </ul>
              <Link to="/tokenization">
                <Button variant="apple" className="rounded-full">
                  Learn About Tokenization
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Current Offerings</h3>
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">Polygon PoC</span>
              </div>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm A</span>
                    <span className="text-primary">70% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20 MATIC per token</span>
                    <span>300/500 tokens sold</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm B</span>
                    <span className="text-primary">45% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>25 MATIC per token</span>
                    <span>225/500 tokens sold</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Container Farm C</span>
                    <span className="text-primary">90% Funded</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>18 MATIC per token</span>
                    <span>450/500 tokens sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform the future of farming?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join AKAR in our mission to make sustainable agriculture accessible, efficient, and profitable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button variant="apple" size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full text-white border-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
                alt="AKAR Logo" 
                className="h-10 mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm mb-4">
                Revolutionizing sustainable farming through smart container technology.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
                </li>
                <li>
                  <a href="#technology" className="text-gray-400 hover:text-white transition-colors">Technology</a>
                </li>
                <li>
                  <a href="#tokenization" className="text-gray-400 hover:text-white transition-colors">Tokenization</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <span className="block">123 Innovation Street</span>
                  <span className="block">Singapore, 123456</span>
                </li>
                <li>
                  <a href="mailto:contact@akar.com" className="text-gray-400 hover:text-white transition-colors">contact@akar.com</a>
                </li>
                <li>
                  <a href="tel:+6512345678" className="text-gray-400 hover:text-white transition-colors">+65 1234 5678</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} AKAR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
