import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Filter,
  Search
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertActionItemSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { t } from "@/lib/translations";
import type { ActionItem } from "@shared/schema";
import { z } from "zod";

const actionItemFormSchema = insertActionItemSchema.extend({
  dueDate: z.string().optional(),
});

export default function Actions() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: actionItems = [], isLoading } = useQuery<ActionItem[]>({
    queryKey: ["/api/action-items"],
  });

  const createActionMutation = useMutation({
    mutationFn: async (data: z.infer<typeof actionItemFormSchema>) => {
      const formattedData = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      };
      const response = await apiRequest("POST", "/api/action-items", formattedData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/action-items"] });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateActionMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ActionItem> }) => {
      const response = await apiRequest("PATCH", `/api/action-items/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/action-items"] });
    },
  });

  const form = useForm<z.infer<typeof actionItemFormSchema>>({
    resolver: zodResolver(actionItemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      status: "open",
      dueDate: "",
    },
  });

  const onSubmit = (data: z.infer<typeof actionItemFormSchema>) => {
    createActionMutation.mutate(data);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Висок";
      case "medium":
        return "Среден";
      case "low":
        return "Нисък";
      default:
        return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-primary";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Отворено";
      case "in_progress":
        return "В ход";
      case "completed":
        return "Завършено";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return AlertCircle;
      case "in_progress":
        return Clock;
      case "completed":
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  // Sample action items for demo
  const sampleActionItems: ActionItem[] = [
    {
      id: "action-1",
      title: "Разработване на техническа спецификация",
      description: "Подготовка на детайлна техническа спецификация за новата автоматизирана система",
      assignee: "Стефан Николов",
      priority: "high",
      status: "in_progress",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      meetingId: null,
      initiativeId: "init-1",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "action-2",
      title: "Обучение на потребителите",
      description: "Организиране и провеждане на обучителни сесии за крайните потребители",
      assignee: "Мария Георгиeva",
      priority: "medium",
      status: "open",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      meetingId: "meeting-1",
      initiativeId: "init-3",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "action-3",
      title: "Тестване на системата",
      description: "Извършване на пълно тестване на функционалностите на новата система",
      assignee: "Димитър Стоянов",
      priority: "high",
      status: "completed",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      meetingId: null,
      initiativeId: "init-1",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "action-4",
      title: "Актуализация на документацията",
      description: "Обновяване на всички процедурни документи след внедряването на промените",
      assignee: "Елена Димитрова",
      priority: "low",
      status: "open",
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      meetingId: "meeting-2",
      initiativeId: "init-2",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  const displayActionItems = actionItems.length > 0 ? actionItems : sampleActionItems;

  const filteredActionItems = displayActionItems.filter(item => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    updateActionMutation.mutate({ id, updates: { status: newStatus } });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("actionsList")}
        subtitle="Управление на задачи и действия от срещи и инициативи"
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Търсене по заглавие, отговорник или описание..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всички</SelectItem>
                <SelectItem value="open">Отворени</SelectItem>
                <SelectItem value="in_progress">В ход</SelectItem>
                <SelectItem value="completed">Завършени</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Приоритет</SelectItem>
                <SelectItem value="high">Висок</SelectItem>
                <SelectItem value="medium">Среден</SelectItem>
                <SelectItem value="low">Нисък</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Ново действие
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Създаване на ново действие</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Заглавие</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Въведете заглавие на действието" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Подробно описание на действието" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="assignee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Отговорник</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Име на отговорника" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Приоритет</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high">Висок</SelectItem>
                              <SelectItem value="medium">Среден</SelectItem>
                              <SelectItem value="low">Нисък</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Срок</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Отказ
                    </Button>
                    <Button type="submit" disabled={createActionMutation.isPending}>
                      {createActionMutation.isPending ? "Създаване..." : "Създай"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActionItems.map((item) => {
              const StatusIcon = getStatusIcon(item.status);
              const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && item.status !== "completed";
              
              return (
                <Card key={item.id} className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <StatusIcon className={`w-5 h-5 ${
                            item.status === "completed" ? "text-green-600" : 
                            item.status === "in_progress" ? "text-yellow-600" : "text-blue-600"
                          }`} />
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge className={getPriorityColor(item.priority)}>
                            {getPriorityLabel(item.priority)}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusLabel(item.status)}
                          </Badge>
                          {isOverdue && (
                            <Badge className="bg-red-100 text-red-700">
                              Просрочено
                            </Badge>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-gray-600 mb-3">{item.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{item.assignee}</span>
                          </div>
                          {item.dueDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                                {formatDate(item.dueDate)}
                              </span>
                            </div>
                          )}
                          <span>Създадено: {formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {item.status !== "completed" && (
                          <>
                            {item.status === "open" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(item.id, "in_progress")}
                                disabled={updateActionMutation.isPending}
                              >
                                Започни
                              </Button>
                            )}
                            {item.status === "in_progress" && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(item.id, "completed")}
                                disabled={updateActionMutation.isPending}
                              >
                                Завърши
                              </Button>
                            )}
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          Редактирай
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredActionItems.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Няма намерени действия
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all" 
                ? "Опитайте с различни филтри" 
                : "Създайте първото си действие за започване"}
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ново действие
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
