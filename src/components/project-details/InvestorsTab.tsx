
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface InvestorsTabProps {
  investors: number;
}

const InvestorsTab = ({ investors }: InvestorsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investors</CardTitle>
        <CardDescription>People investing in this farm project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-6 text-center">
          <div>
            <div className="flex items-center justify-center rounded-full bg-blue-100 p-6 mx-auto mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold">{investors}</h3>
            <p className="text-muted-foreground">Total investors</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorsTab;
