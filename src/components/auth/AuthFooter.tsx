
import React from "react";

export const AuthFooter: React.FC = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AKAR. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
