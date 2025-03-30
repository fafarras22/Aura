
import React from "react";
import { ShoppingCart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Solutions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            From urban farming containers to comprehensive monitoring systems, AKAR offers end-to-end solutions for modern agriculture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">Container Farms</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Fully equipped, turnkey container farming solutions that can be deployed anywhere. Each container is a complete ecosystem optimized for plant growth.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Modular design for easy scaling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Comprehensive environmental controls</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Remote monitoring capabilities</span>
              </li>
            </ul>
            <Button variant="apple-outline" className="rounded-full mt-4">
              Learn More
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LineChart className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">Monitoring Dashboard</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our advanced dashboard gives you complete visibility into your farm's operations, allowing you to monitor and control all aspects remotely.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Real-time environmental monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Predictive maintenance alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Yield and performance analytics</span>
              </li>
            </ul>
            <Button variant="apple-outline" className="rounded-full mt-4">
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
