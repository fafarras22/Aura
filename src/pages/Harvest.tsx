import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, CheckCircle, Clock, PackageCheck, PackagePlus, XCircle } from "lucide-react";
import { getMockHarvests } from "@/services/mockDataService";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const Harvest = () => {
  const harvests = getMockHarvests();

  // Filter harvests by status
  const readyHarvests = harvests.filter(harvest => harvest.status === 'ready');
  const inProgressHarvests = harvests.filter(harvest => harvest.status === 'in progress');
  const completedHarvests = harvests.filter(harvest => harvest.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Harvest</h1>
          <p className="text-muted-foreground">
            Manage and track all harvest activities in the container farm
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            {readyHarvests.length} Ready
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            {inProgressHarvests.length} In Progress
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            {completedHarvests.length} Completed
          </Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Harvest Overview</CardTitle>
          <CardDescription>
            Track the status of each harvest and manage upcoming harvests
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {harvests.map(harvest => (
            <div key={harvest.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold">{harvest.crop}</div>
                {harvest.status === 'ready' && (
                  <Badge variant="success">
                    <PackagePlus className="h-4 w-4 mr-2" />
                    Ready
                  </Badge>
                )}
                {harvest.status === 'in progress' && (
                  <Badge variant="secondary">
                    <Clock className="h-4 w-4 mr-2" />
                    In Progress
                  </Badge>
                )}
                {harvest.status === 'completed' && (
                  <Badge variant="default">
                    <PackageCheck className="h-4 w-4 mr-2" />
                    Completed
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Quantity: {harvest.quantity} {harvest.unit}
              </div>
              <div className="text-sm text-muted-foreground">
                Date: {harvest.date}
              </div>
              <div className="mt-2">
                <HarvestScheduleCard />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Harvest;

function HarvestScheduleCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Harvest Schedule</CardTitle>
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pl-2 pt-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
