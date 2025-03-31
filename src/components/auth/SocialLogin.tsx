
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Apple, Loader2 } from "lucide-react";
import { useState } from "react";

export const SocialLogin: React.FC = () => {
  const { toast } = useToast();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // No need to handle success here as it will redirect
    } catch (error) {
      setIsGoogleLoading(false);
      // Error already handled in context
    }
  };

  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    try {
      await signInWithApple();
      // No need to handle success here as it will redirect
    } catch (error) {
      setIsAppleLoading(false);
      // Error already handled in context
    }
  };

  return (
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
        <Button 
          variant="outline" 
          className="w-full"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H11.5222V11.848H16.3042C16.1952 12.767 15.7292 14.1512 14.6122 15.0812L14.6008 15.1556L17.2222 17.1039L17.4289 17.1245C18.9088 15.4739 19.9895 13.0645 19.9895 10.1871Z" fill="#4285F4" />
              <path d="M11.5222 19.9314C13.94 19.9314 15.9666 19.0455 17.4289 17.1245L14.6122 15.0812C13.9088 15.5951 12.9215 15.9522 11.5222 15.9522C9.10223 15.9522 7.04434 14.3443 6.25335 12.0791L6.18182 12.0892L3.48304 14.1159L3.44265 14.1835C4.89384 17.5548 7.97032 19.9314 11.5222 19.9314Z" fill="#34A853" />
              <path d="M6.25334 12.0791C6.05223 11.459 5.94334 10.7975 5.94334 10.1315C5.94334 9.46557 6.05223 8.80404 6.24445 8.18396L6.24088 8.10349L3.51234 6.04421L3.44264 6.07799C2.85223 7.54624 2.5 9.19217 2.5 10.9037C2.5 12.6152 2.85223 14.2611 3.44264 15.7294L6.25334 12.0791Z" fill="#FBBC05" />
              <path d="M11.5222 4.31091C13.22 4.31091 14.4089 5.08711 15.1033 5.76188L17.5943 3.28544C15.9644 1.77444 13.94 0.879883 11.5222 0.879883C7.97032 0.879883 4.89384 3.25647 3.44264 6.62778L6.24445 9.27332C7.04434 7.00814 9.10223 4.31091 11.5222 4.31091Z" fill="#EB4335" />
            </svg>
          )}
          <span>Google</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full bg-black text-white hover:bg-black/90 border-black"
          type="button"
          onClick={handleAppleLogin}
          disabled={isAppleLoading}
        >
          {isAppleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
          ) : (
            <Apple className="mr-2 h-5 w-5" />
          )}
          <span>Apple</span>
        </Button>
      </div>
    </div>
  );
};
