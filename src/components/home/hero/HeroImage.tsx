
import React from "react";
import { ContainerFarmGame } from "@/components/game/ContainerFarmGame";

export const HeroImage: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border shadow-lg bg-white p-4 flex items-center justify-center">
      <ContainerFarmGame />
    </div>
  );
};
