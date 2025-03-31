
import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "./SignupForm";
import { SocialLogin } from "./SocialLogin";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";

export const SignupContainer: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AuthHeader />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join AKAR FarmWatch and start monitoring your sustainable farming operations
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
            <SignupForm />
            <SocialLogin />
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

      <AuthFooter />
    </div>
  );
};
