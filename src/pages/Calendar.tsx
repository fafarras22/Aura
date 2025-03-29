
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarDays, CalendarPlus } from "lucide-react";
import { format } from "date-fns";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useToast } from "@/hooks/use-toast";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<string>("month");
  const { isDeveloperMode } = useDeveloperMode();
  const { toast } = useToast();

  // Mock events data
  const events = [
    { id: 1, title: "Lettuce Harvest", date: "2023-07-18", type: "harvest" },
    { id: 2, title: "System Maintenance", date: "2023-07-25", type: "maintenance" },
    { id: 3, title: "Planting - Spinach", date: "2023-07-05", type: "planting" },
    { id: 4, title: "Water Quality Check", date: "2023-07-10", type: "maintenance" },
    { id: 5, title: "Client Visit", date: "2023-07-20", type: "visit" }
  ];

  // Filter events for the selected date if date is selected
  const selectedDateEvents = date 
    ? events.filter(event => event.date === format(date, 'yyyy-MM-dd'))
    : [];

  const handleAddEvent = () => {
    toast({
      title: "Add New Event",
      description: "This function will allow adding new calendar events",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Farm Calendar</h1>
        
        <div className="flex space-x-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select>
          
          {isDeveloperMode && (
            <Button onClick={handleAddEvent}>
              <CalendarPlus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" /> 
              Farm Calendar
            </CardTitle>
            <CardDescription>
              Manage and view all farm events and schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-3 pointer-events-auto"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="mr-2 h-5 w-5" /> 
              {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            <CardDescription>
              Events and schedules for the selected date
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-md">
                    <Badge variant={
                      event.type === 'harvest' ? 'success' :
                      event.type === 'maintenance' ? 'default' :
                      event.type === 'planting' ? 'secondary' : 'outline'
                    }>
                      {event.type}
                    </Badge>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {date ? 'No events for this date' : 'Select a date to view events'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Calendar Management (Admin Only)</CardTitle>
            <CardDescription>Advanced calendar configuration and event management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <CalendarPlus className="mr-2 h-4 w-4" /> Add Recurring Events
              </Button>
              <Button variant="outline" className="justify-start">
                <CalendarDays className="mr-2 h-4 w-4" /> Manage Event Types
              </Button>
              <Button variant="outline" className="justify-start">
                <CalendarClock className="mr-2 h-4 w-4" /> Set Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarPage;
