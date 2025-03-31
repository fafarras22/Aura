
import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SocialLogin } from "./SocialLogin";

interface LoginContainerProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ isLoading, setIsLoading }) => {
  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to access your AKAR FarmWatch dashboard
        </p>
      </div>

      <div className="mt-8 bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
        <SocialLogin />
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};
