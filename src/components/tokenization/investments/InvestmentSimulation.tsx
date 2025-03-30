
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Investment } from './types';

interface InvestmentSimulationProps {
  investment: Investment;
}

export const InvestmentSimulation: React.FC<InvestmentSimulationProps> = ({ investment }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(investment.minAmount);
  const [duration, setDuration] = useState<number>(investment.duration);

  const calculatePotentialReturn = (amount: number, rate: number, duration: number): number => {
    return amount * (1 + (rate / 100) * (duration / 12));
  };

  const potentialReturn = calculatePotentialReturn(investmentAmount, investment.returnRate, duration);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Investment Simulation</CardTitle>
        <CardDescription>Simulate your investment and see potential returns.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Investment Amount (IDR)</Label>
          <Input
            id="amount"
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Investment Duration (Months)</Label>
          <Slider
            id="duration"
            defaultValue={[investment.duration]}
            max={24}
            min={6}
            step={1}
            onValueChange={(value) => setDuration(value[0])}
          />
          <p className="text-sm text-muted-foreground">
            Selected Duration: {duration} months
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">
            Potential Return: {formatCurrency(potentialReturn)}
          </p>
        </div>
        <Button>Invest Now</Button>
      </CardContent>
    </Card>
  );
};
