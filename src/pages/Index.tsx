
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-xl overflow-hidden bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <img src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" alt="AKAR Logo" className="h-16" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AKAR FarmWatch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Advanced Container Agriculture for Sustainable Food Production</p>
          <div className="mt-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading your monitoring dashboard...</p>
            <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-4 overflow-hidden">
              <div className="h-full bg-primary w-1/2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
