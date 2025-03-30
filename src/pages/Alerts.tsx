import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Slider
} from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { getMockAlerts, Alert as AlertType } from '@/services/mockDataService';

const filterSchema = z.object({
  type: z.enum(['info', 'warning', 'error']).optional(),
  containerNumber: z.string().optional(),
  isRead: z.boolean().optional(),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
});

const alertSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  type: z.enum(['info', 'warning', 'error']),
  containerNumber: z.string().min(1, {
    message: "Container number must be at least 1 character.",
  }),
  isRead: z.boolean().default(false),
  timestamp: z.date().default(new Date()),
})

const Alerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertType[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [isMarkAsReadLoading, setIsMarkAsReadLoading] = useState(false);
  const [isMarkAllAsReadLoading, setIsMarkAllAsReadLoading] = useState(false);

  const form = useForm<z.infer<typeof alertSchema>>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "info",
      containerNumber: "",
      isRead: false,
      timestamp: new Date(),
    },
  })

  const filterForm = useForm<z.infer<typeof filterSchema>>({
    defaultValues: {
      type: undefined,
      containerNumber: undefined,
      isRead: undefined,
      dateRange: undefined,
    },
  });

  useEffect(() => {
    // Fetch mock alerts on component mount
    const mockAlerts = getMockAlerts();
    setAlerts(mockAlerts);
    setFilteredAlerts(mockAlerts);
  }, []);

  const applyFilters = (filters: z.infer<typeof filterSchema>) => {
    let newFilteredAlerts = [...alerts];

    if (filters.type) {
      newFilteredAlerts = newFilteredAlerts.filter(alert => alert.type === filters.type);
    }

    if (filters.containerNumber) {
      newFilteredAlerts = newFilteredAlerts.filter(alert =>
        alert.containerNumber.toLowerCase().includes(filters.containerNumber!.toLowerCase())
      );
    }

    if (filters.isRead !== undefined) {
      newFilteredAlerts = newFilteredAlerts.filter(alert => alert.isRead === filters.isRead);
    }

    if (filters.dateRange?.from && filters.dateRange?.to) {
      newFilteredAlerts = newFilteredAlerts.filter(alert => {
        const alertDate = new Date(alert.timestamp).getTime();
        const fromDate = new Date(filters.dateRange!.from!).getTime();
        const toDate = new Date(filters.dateRange!.to!).getTime();
        return alertDate >= fromDate && alertDate <= toDate;
      });
    }

    setFilteredAlerts(newFilteredAlerts);
    setIsFilterOpen(false);
  };

  const handleCreateAlert = (values: z.infer<typeof alertSchema>) => {
    const newAlert: AlertType = {
      id: String(Date.now()),
      ...values,
      timestamp: new Date(),
    };

    setAlerts([newAlert, ...alerts]);
    setFilteredAlerts([newAlert, ...filteredAlerts]);
    setIsCreateAlertOpen(false);
    toast({
      title: "Success",
      description: "Alert created successfully.",
    });
  };

  const handleEditAlert = (values: z.infer<typeof alertSchema>) => {
    if (!selectedAlert) return;

    const updatedAlerts = alerts.map(alert =>
      alert.id === selectedAlert.id ? { ...alert, ...values } : alert
    );

    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
    setIsEditAlertOpen(false);
    toast({
      title: "Success",
      description: "Alert updated successfully.",
    });
  };

  const handleDeleteAlert = () => {
    if (!selectedAlert) return;

    const updatedAlerts = alerts.filter(alert => alert.id !== selectedAlert.id);
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "Alert deleted successfully.",
    });
  };

  const handleMarkAsRead = async (alertId: string) => {
    setIsMarkAsReadLoading(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedAlerts = alerts.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    );

    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
    setIsMarkAsReadLoading(false);
    toast({
      title: "Success",
      description: "Alert marked as read.",
    });
  };

  const handleMarkAllAsRead = async () => {
    setIsMarkAllAsReadLoading(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedAlerts = alerts.map(alert => ({ ...alert, isRead: true }));
    setAlerts(updatedAlerts);
    setFilteredAlerts(updatedAlerts);
    setIsMarkAllAsReadLoading(false);
    toast({
      title: "Success",
      description: "All alerts marked as read.",
    });
  };

  const handleClearFilters = () => {
    filterForm.reset();
    setFilteredAlerts([...alerts]);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <CardTitle className="text-2xl font-bold">Alerts</CardTitle>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            Filter
          </Button>
          <Button onClick={() => setIsCreateAlertOpen(true)}>
            Create Alert
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            Here is a list of recent alerts in your system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[120px]">Container</TableHead>
                <TableHead className="w-[150px]">Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.title}</TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Badge
                      variant={alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'outline'}
                    >
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.containerNumber}</TableCell>
                  <TableCell>
                    {format(new Date(alert.timestamp), "MMM d, yyyy h:mm a")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAlert(alert);
                                setIsEditAlertOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit alert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAlert(alert);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete alert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {!alert.isRead && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isMarkAsReadLoading}
                                onClick={() => handleMarkAsRead(alert.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark as read</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No alerts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-between items-center">
                    <span>Total: {filteredAlerts.length} alerts</span>
                    <Button
                      variant="outline"
                      disabled={isMarkAllAsReadLoading}
                      onClick={handleMarkAllAsRead}
                    >
                      Mark All as Read
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Alerts</DialogTitle>
            <DialogDescription>
              Filter alerts based on type, container number, read status, and
              date range.
            </DialogDescription>
          </DialogHeader>
          <Form {...filterForm}>
            <form
              onSubmit={filterForm.handleSubmit(applyFilters)}
              className="space-y-4"
            >
              <FormField
                control={filterForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="containerNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Container Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Container number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="isRead"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Read Status</FormLabel>
                      <FormDescription>
                        Only show unread alerts
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value?.from && !field.value?.to && "text-muted-foreground"
                            )}
                          >
                            {field.value?.from ? (
                              field.value?.to ? (
                                <>
                                  {format(field.value.from, "MMM d, yyyy")} -{" "}
                                  {format(field.value.to, "MMM d, yyyy")}
                                </>
                              ) : (
                                format(field.value.from, "MMM d, yyyy")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center" side="bottom">
                        <Calendar
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2020-01-01")
                          }
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
                <Button type="submit">Apply Filters</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Create Alert Dialog */}
      <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Alert</DialogTitle>
            <DialogDescription>
              Create a new alert to notify users of important events.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateAlert)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Alert title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Alert message"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="containerNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Container Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Container number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setIsCreateAlertOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Alert Dialog */}
      <Dialog open={isEditAlertOpen} onOpenChange={setIsEditAlertOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Alert</DialogTitle>
            <DialogDescription>
              Edit the selected alert details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditAlert)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Alert title" {...field} defaultValue={selectedAlert?.title} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Alert message"
                        className="resize-none"
                        {...field}
                        defaultValue={selectedAlert?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={selectedAlert?.type}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="containerNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Container Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Container number" {...field} defaultValue={selectedAlert?.containerNumber} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setIsEditAlertOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Alert</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this alert? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteAlert}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alerts;
