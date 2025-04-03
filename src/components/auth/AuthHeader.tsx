
import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo/Logo";

export const AuthHeader: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <Link to="/">
          <Logo size="lg" showText={false} />
        </Link>
      </div>
    </header>
  );
};
