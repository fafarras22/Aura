
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SignupContainer } from "@/components/auth/SignupContainer";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <SignupContainer />;
};

export default Signup;
