
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { AppleButton } from '@/components/ui/apple-button';

export interface SectionCardProps {
  title: string;
  description?: string;
  onToggle: () => void;
  isExpanded: boolean;
  onFullView?: () => void;
  children: React.ReactNode;
  summary?: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  onToggle,
  isExpanded,
  onFullView,
  children,
  summary
}: SectionCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-gray-950 rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <div className="flex gap-2">
            <AppleButton 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="px-3 text-xs"
            >
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </AppleButton>
            {onFullView && (
              <AppleButton 
                variant="outline" 
                size="sm" 
                onClick={onFullView}
                className="px-3 text-xs"
              >
                Full View
              </AppleButton>
            )}
          </div>
        </div>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>
      {isExpanded ? (
        <CardContent>
          {children}
        </CardContent>
      ) : (
        <CardContent className="pt-0">
          <div className="text-xs">{summary}</div>
        </CardContent>
      )}
    </Card>
  );
}
