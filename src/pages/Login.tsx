
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { LoginContainer } from "@/components/auth/LoginContainer";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AuthHeader />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginContainer isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>

      <AuthFooter />
    </div>
  );
};

export default Login;
