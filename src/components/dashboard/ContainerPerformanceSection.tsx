
import React from 'react';

interface ContainerPerformanceSectionProps {
  containerName: string;
}

export const ContainerPerformanceSection: React.FC<ContainerPerformanceSectionProps> = ({ containerName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Container Farm: {containerName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium mb-2">Current Crops</h4>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Lettuce</span>
              <span>70% Ready</span>
            </li>
            <li className="flex justify-between">
              <span>Kale</span>
              <span>45% Ready</span>
            </li>
            <li className="flex justify-between">
              <span>Spinach</span>
              <span>90% Ready</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-medium mb-2">Resource Usage</h4>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Water</span>
              <span>32L/day</span>
            </li>
            <li className="flex justify-between">
              <span>Electricity</span>
              <span>14kWh/day</span>
            </li>
            <li className="flex justify-between">
              <span>Nutrients</span>
              <span>0.8kg/day</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
