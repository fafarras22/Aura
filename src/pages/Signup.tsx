
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDeveloperMode } from "@/context/DeveloperModeContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useDeveloperMode();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, this would create a new user account in the database
      toast({
        title: "Account created",
        description: "Welcome to AKAR FarmWatch!",
      });
      
      // Automatically log in the user as a client/guest
      const loginSuccess = login(name, password);
      
      if (loginSuccess) {
        navigate("/dashboard");
      }
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

      {/* Signup Container */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join AKAR FarmWatch and start monitoring your sustainable farming operations
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Your full name"
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="agree-terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/terms-of-service" className="font-medium text-primary hover:text-primary/80">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="font-medium text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="apple"
                  className="w-full py-6 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
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

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H11.5222V11.848H16.3042C16.1952 12.767 15.7292 14.1512 14.6122 15.0812L14.6008 15.1556L17.2222 17.1039L17.4289 17.1245C18.9088 15.4739 19.9895 13.0645 19.9895 10.1871Z" fill="#4285F4" />
                    <path d="M11.5222 19.9314C13.94 19.9314 15.9666 19.0455 17.4289 17.1245L14.6122 15.0812C13.9088 15.5951 12.9215 15.9522 11.5222 15.9522C9.10223 15.9522 7.04434 14.3443 6.25335 12.0791L6.18182 12.0892L3.48304 14.1159L3.44265 14.1835C4.89384 17.5548 7.97032 19.9314 11.5222 19.9314Z" fill="#34A853" />
                    <path d="M6.25334 12.0791C6.05223 11.459 5.94334 10.7975 5.94334 10.1315C5.94334 9.46557 6.05223 8.80404 6.24445 8.18396L6.24088 8.10349L3.51234 6.04421L3.44264 6.07799C2.85223 7.54624 2.5 9.19217 2.5 10.9037C2.5 12.6152 2.85223 14.2611 3.44264 15.7294L6.25334 12.0791Z" fill="#FBBC05" />
                    <path d="M11.5222 4.31091C13.22 4.31091 14.4089 5.08711 15.1033 5.76188L17.5943 3.28544C15.9644 1.77444 13.94 0.879883 11.5222 0.879883C7.97032 0.879883 4.89384 3.25647 3.44264 6.62778L6.24445 9.27332C7.04434 7.00814 9.10223 4.31091 11.5222 4.31091Z" fill="#EB4335" />
                  </svg>
                  <span className="ml-2">Google</span>
                </Button>
                
                <Button variant="outline" className="w-full bg-black text-white hover:bg-black/90 border-black">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.6 7.1c-1 0-1.9.8-2.8.8-.9 0-2.2-.8-3.6-.8C7.5 7.1 4.9 9 4.9 12.6c0 2.2.9 4.5 2 5.9 1 1.3 1.9 2.4 3.2 2.4 1.3 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.1 3.1-2.4.7-.9 1.2-1.9 1.6-3.1-4.1-1.5-3.8-7.3.4-8.3C19.9 4.1 17.4 4 16.6 7.1z" />
                    <path d="M15.3 3.6c.8-1 1.3-2.2 1.3-3.6-1.3.1-2.9.9-3.8 2-1 1-1.5 2.2-1.5 3.6 1.4.1 2.9-.9 4-2z" />
                  </svg>
                  <span className="ml-2">Apple</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
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

export default Signup;
