// Update the HomeHeader component to include setLanguage prop
// We need to update the prop types to match the usage in ExploreSolutions.tsx and LearnMore.tsx

import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface HomeHeaderProps {
  language: "en" | "id" | "ko";
  setLanguage?: React.Dispatch<React.SetStateAction<"en" | "id" | "ko">>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ language, setLanguage }) => {
  return (
    <div>Header Component</div>
  );
};

export default HomeHeader;
