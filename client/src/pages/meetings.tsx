import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, FileText, Plus, Bot } from "lucide-react";
import { t } from "@/lib/translations";
import { apiRequest } from "@/lib/queryClient";
import type { Meeting } from "@shared/schema";

export default function Meetings() {
  const queryClient = useQueryClient();
  const { data: meetings = [], isLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
  });

  const generateSummaryMutation = useMutation({
    mutationFn: async (meetingId: string) => {
      const response = await apiRequest("POST", `/api/meetings/${meetingId}/summary`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
    },
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("bg-BG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins}мин`;
    }
    return `${mins}мин`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "scheduled":
        return "bg-blue-100 text-primary";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Завършена";
      case "scheduled":
        return "Планирана";
      case "cancelled":
        return "Отменена";
      default:
        return status;
    }
  };

  // Sample meetings for demo
  const sampleMeetings: Meeting[] = [
    {
      id: "meeting-1",
      title: "Седмичен преглед на прогреса",
      description: "Преглед на напредъка по всички активни инициативи",
      scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 60,
      status: "completed",
      participants: ["Иван Петров", "Мария Георгиева", "Димитър Стоянов"],
      notes: "Обсъдихме напредъка по автоматизацията на процесите. Решихме да ускорим внедряването на новата система. Следващи стъпки: завършване на тестването до края на седмицата.",
      aiSummary: "",
      createdAt: new Date(),
    },
    {
      id: "meeting-2",
      title: "Консултация с ИТ отдела",
      description: "Обсъждане на техническите изисквания за новата платформа",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      duration: 90,
      status: "scheduled",
      participants: ["Иван Петров", "Стефан Николов", "Елена Димитрова"],
      notes: "",
      aiSummary: "",
      createdAt: new Date(),
    },
    {
      id: "meeting-3",
      title: "Презентация пред ръководството",
      description: "Представяне на резултатите от дигиталната трансформация",
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      duration: 120,
      status: "scheduled",
      participants: ["Иван Петров", "Георги Петков", "Анна Стефанова", "Николай Иванов"],
      notes: "",
      aiSummary: "",
      createdAt: new Date(),
    },
  ];

  const displayMeetings = meetings.length > 0 ? meetings : sampleMeetings;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("meetingTracking")}
        subtitle="Управление и проследяване на срещи с AI анализ"
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <Button variant="outline">Всички</Button>
            <Button variant="outline">Планирани</Button>
            <Button variant="outline">Завършени</Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Нова среща
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-24 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayMeetings.map((meeting) => (
              <Card key={meeting.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {meeting.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{meeting.description}</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>
                      {getStatusLabel(meeting.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(meeting.scheduledAt.toString())}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatDuration(meeting.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{meeting.participants.length} участника</span>
                    </div>
                  </div>

                  {meeting.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Бележки от срещата
                      </h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {meeting.notes}
                      </p>
                    </div>
                  )}

                  {meeting.aiSummary && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Резюме
                      </h4>
                      <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                        {meeting.aiSummary}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Редактирай
                      </Button>
                      <Button variant="outline" size="sm">
                        Виж подробности
                      </Button>
                    </div>
                    
                    {meeting.status === "completed" && meeting.notes && !meeting.aiSummary && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => generateSummaryMutation.mutate(meeting.id)}
                        disabled={generateSummaryMutation.isPending}
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        {generateSummaryMutation.isPending ? "Генериране..." : "Генерирай резюме"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
