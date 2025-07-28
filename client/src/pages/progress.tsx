import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Target, TrendingUp, AlertCircle } from "lucide-react";
import { t } from "@/lib/translations";
import type { Initiative } from "@shared/schema";

export default function ProgressPage() {
  const { data: initiatives = [], isLoading } = useQuery<Initiative[]>({
    queryKey: ["/api/initiatives"],
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-primary";
    if (progress >= 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-primary";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
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
      case "active":
        return "bg-blue-100 text-primary";
      case "completed":
        return "bg-green-100 text-green-700";
      case "paused":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активна";
      case "completed":
        return "Завършена";
      case "paused":
        return "Паузирана";
      default:
        return status;
    }
  };

  // Sample initiatives for demo
  const sampleInitiatives: Initiative[] = [
    {
      id: "init-1",
      title: "Автоматизация на процеси",
      description: "Внедряване на автоматизирани процеси в организацията за подобряване на ефективността",
      status: "active",
      progress: 76,
      priority: "high",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "init-2",
      title: "Цифрова стратегия",
      description: "Разработване на цифрова стратегия за компанията с фокус върху иновациите",
      status: "active",
      progress: 45,
      priority: "high",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-11-30"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "init-3",
      title: "Обучение на персонала",
      description: "Обучение на служителите за дигитални технологии и нови процеси",
      status: "active",
      progress: 92,
      priority: "medium",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-08-31"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "init-4",
      title: "Модернизация на ИТ",
      description: "Обновяване на ИТ инфраструктурата и внедряване на облачни решения",
      status: "active",
      progress: 23,
      priority: "high",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const displayInitiatives = initiatives.length > 0 ? initiatives : sampleInitiatives;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("progressInitiatives")}
        subtitle="Детайлен преглед на прогреса по всички инициативи"
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <Button variant="outline">Всички</Button>
            <Button variant="outline">Активни</Button>
            <Button variant="outline">Завършени</Button>
            <Button variant="outline">Паузирани</Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Target className="w-4 h-4 mr-2" />
            Нова инициатива
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {displayInitiatives.map((initiative) => (
              <Card key={initiative.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {initiative.title}
                        </CardTitle>
                        <Badge className={getStatusColor(initiative.status)}>
                          {getStatusLabel(initiative.status)}
                        </Badge>
                        <Badge className={getPriorityColor(initiative.priority)}>
                          {getPriorityLabel(initiative.priority)}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{initiative.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getProgressColor(initiative.progress)}`}>
                        {initiative.progress}%
                      </div>
                      <div className="text-sm text-gray-500">завършено</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Прогрес</span>
                      <span>{initiative.progress}% от 100%</span>
                    </div>
                    <Progress 
                      value={initiative.progress} 
                      className="h-3"
                      style={{
                        '--progress-background': getProgressBgColor(initiative.progress)
                      } as React.CSSProperties}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Начало: {initiative.startDate ? formatDate(initiative.startDate) : "Не е определено"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Край: {initiative.endDate ? formatDate(initiative.endDate) : "Не е определено"}
                      </span>
                    </div>
                  </div>

                  {initiative.progress < 30 && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        Тази инициатива изостава от графика. Необходимо е внимание.
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Виж подробности
                      </Button>
                      <Button variant="outline" size="sm">
                        Редактирай
                      </Button>
                      <Button variant="outline" size="sm">
                        Добави задача
                      </Button>
                    </div>
                    
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Актуализирай прогрес
                    </Button>
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
