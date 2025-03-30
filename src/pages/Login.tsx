
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purpose, any login works
      toast({
        title: "Login successful",
        description: "Welcome back to AKAR FarmWatch",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
              alt="AKAR Logo" 
              className="h-10"
            />
          </Link>
        </div>
      </header>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your AKAR FarmWatch dashboard
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="apple"
                  className="w-full py-6 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.0003 2C6.4773 2 2.0003 6.477 2.0003 12C2.0003 17.523 6.4773 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM12.0003 3.5C16.7033 3.5 20.5003 7.297 20.5003 12C20.5003 16.703 16.7033 20.5 12.0003 20.5C7.2973 20.5 3.5003 16.703 3.5003 12C3.5003 7.297 7.2973 3.5 12.0003 3.5ZM9.0003 7.5V16.5L18.0003 12L9.0003 7.5Z" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H11.5222V11.848H16.3042C16.1952 12.767 15.7292 14.1512 14.6122 15.0812L14.6008 15.1556L17.2222 17.1039L17.4289 17.1245C18.9088 15.4739 19.9895 13.0645 19.9895 10.1871Z" fill="#4285F4" />
                    <path d="M11.5222 19.9314C13.94 19.9314 15.9666 19.0455 17.4289 17.1245L14.6122 15.0812C13.9088 15.5951 12.9215 15.9522 11.5222 15.9522C9.10223 15.9522 7.04434 14.3443 6.25335 12.0791L6.18182 12.0892L3.48304 14.1159L3.44265 14.1835C4.89384 17.5548 7.97032 19.9314 11.5222 19.9314Z" fill="#34A853" />
                    <path d="M6.25334 12.0791C6.05223 11.459 5.94334 10.7975 5.94334 10.1315C5.94334 9.46557 6.05223 8.80404 6.24445 8.18396L6.24088 8.10349L3.51234 6.04421L3.44264 6.07799C2.85223 7.54624 2.5 9.19217 2.5 10.9037C2.5 12.6152 2.85223 14.2611 3.44264 15.7294L6.25334 12.0791Z" fill="#FBBC05" />
                    <path d="M11.5222 4.31091C13.22 4.31091 14.4089 5.08711 15.1033 5.76188L17.5943 3.28544C15.9644 1.77444 13.94 0.879883 11.5222 0.879883C7.97032 0.879883 4.89384 3.25647 3.44264 6.62778L6.24445 9.27332C7.04434 7.00814 9.10223 4.31091 11.5222 4.31091Z" fill="#EB4335" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H8.898V12h1.54v-1.333c0-3.09 1.797-4.439 4.217-4.439 1.223 0 2.271.123 2.584.175v2.874h-1.771c-1.39 0-1.667.66-1.667 1.63v1.093h3.332l-.434 2.89h-2.898v7.010C18.347 21.13 22 16.992 22 12z" fill="#1877F2" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AKAR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
