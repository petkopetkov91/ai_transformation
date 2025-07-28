import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  Download, 
  Plus,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { t } from "@/lib/translations";
import type { Report, Initiative } from "@shared/schema";

export default function Reports() {
  const queryClient = useQueryClient();
  
  const { data: reports = [], isLoading: reportsLoading } = useQuery<Report[]>({
    queryKey: ["/api/reports"],
  });

  const { data: initiatives = [] } = useQuery<Initiative[]>({
    queryKey: ["/api/initiatives"],
  });

  const generateProgressReportMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/reports/generate-progress", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "progress":
        return BarChart3;
      case "meeting_summary":
        return Calendar;
      case "initiative_overview":
        return PieChart;
      default:
        return FileText;
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "progress":
        return "Отчет за прогрес";
      case "meeting_summary":
        return "Резюме на срещи";
      case "initiative_overview":
        return "Преглед на инициативи";
      default:
        return "Общ отчет";
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "progress":
        return "bg-blue-100 text-primary";
      case "meeting_summary":
        return "bg-green-100 text-green-700";
      case "initiative_overview":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Sample reports for demo
  const sampleReports: Report[] = [
    {
      id: "report-1",
      title: "Месечен отчет за прогрес - Януари 2024",
      type: "progress",
      content: {
        insights: "През януари постигнахме значителен напредък в автоматизацията на процесите. Завършихме фазата на анализ и започнахме разработката на новата система. Обучението на персонала върви по план.",
        initiatives: [
          { title: "Автоматизация на процеси", progress: 76 },
          { title: "Цифрова стратегия", progress: 45 },
          { title: "Обучение на персонала", progress: 92 },
          { title: "Модернизация на ИТ", progress: 23 }
        ],
        generatedAt: new Date().toISOString(),
        metrics: {
          totalInitiatives: 4,
          completedTasks: 23,
          averageProgress: 59
        }
      },
      generatedBy: "user-1",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "report-2",
      title: "Преглед на инициативи - Q1 2024",
      type: "initiative_overview",
      content: {
        summary: "Първото тримесечие показа стабилен прогрес във всички ключови области на дигиталната трансформация.",
        initiatives: [
          { title: "Автоматизация на процеси", progress: 76, status: "active" },
          { title: "Цифрова стратегия", progress: 45, status: "active" }
        ],
        generatedAt: new Date().toISOString(),
      },
      generatedBy: "user-1", 
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "report-3",
      title: "Резюме на срещи - Седмица 3",
      type: "meeting_summary",
      content: {
        summary: "Проведени бяха 5 ключови срещи с общо участие от 23 заинтересовани страни.",
        meetings: [
          { title: "Седмичен преглед", date: "2024-01-15", participants: 6 },
          { title: "Техническа консултация", date: "2024-01-17", participants: 4 }
        ],
        actionItems: 12,
        decisions: 8,
        generatedAt: new Date().toISOString(),
      },
      generatedBy: "user-1",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
  ];

  const displayReports = reports.length > 0 ? reports : sampleReports;

  // Calculate overview statistics
  const overviewStats = {
    totalReports: displayReports.length,
    thisMonth: displayReports.filter(r => 
      new Date(r.createdAt).getMonth() === new Date().getMonth()
    ).length,
    progressReports: displayReports.filter(r => r.type === "progress").length,
    averageProgress: initiatives.length > 0 
      ? Math.round(initiatives.reduce((sum, init) => sum + init.progress, 0) / initiatives.length)
      : 0,
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("reports")}
        subtitle="Генериране и преглед на отчети за дигиталната трансформация"
      />

      <main className="flex-1 overflow-auto p-6">
        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Общо отчети</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.totalReports}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-primary w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Този месец</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.thisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Отчети за прогрес</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.progressReports}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-purple-600 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Среден прогрес</p>
                  <p className="text-3xl font-bold text-gray-900">{overviewStats.averageProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Activity className="text-yellow-600 w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Бързи действия</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => generateProgressReportMutation.mutate()}
                disabled={generateProgressReportMutation.isPending}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {generateProgressReportMutation.isPending ? "Генериране..." : "Отчет за прогрес"}
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Генерирайте актуален отчет за прогреса на всички инициативи
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Резюме на срещи
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Създайте резюме на проведените срещи за периода
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <Button className="w-full" variant="outline">
                <PieChart className="w-4 h-4 mr-2" />
                Преглед на инициативи
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Генерирайте подробен преглед на всички инициативи
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Генерирани отчети</h2>
          <div className="flex space-x-2">
            <Button variant="outline">Филтрирай</Button>
            <Button variant="outline">Сортирай</Button>
          </div>
        </div>

        {reportsLoading ? (
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
            {displayReports.map((report) => {
              const ReportIcon = getReportTypeIcon(report.type);
              
              return (
                <Card key={report.id} className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ReportIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {report.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getReportTypeColor(report.type)}>
                              {getReportTypeLabel(report.type)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatDate(report.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Изтегли
                        </Button>
                        <Button size="sm" variant="outline">
                          Виж
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {report.type === "progress" && report.content.insights && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">AI Анализ</h4>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {report.content.insights}
                        </p>
                      </div>
                    )}

                    {report.content.initiatives && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-3">Прогрес по инициативи</h4>
                        <div className="space-y-2">
                          {report.content.initiatives.slice(0, 3).map((initiative: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{initiative.title}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={initiative.progress} className="w-24 h-2" />
                                <span className="text-sm text-gray-500 min-w-0">{initiative.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {report.content.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">
                            {report.content.metrics.totalInitiatives}
                          </p>
                          <p className="text-xs text-gray-500">Инициативи</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">
                            {report.content.metrics.completedTasks}
                          </p>
                          <p className="text-xs text-gray-500">Завършени задачи</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">
                            {report.content.metrics.averageProgress}%
                          </p>
                          <p className="text-xs text-gray-500">Среден прогрес</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {displayReports.length === 0 && !reportsLoading && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Няма генерирани отчети
            </h3>
            <p className="text-gray-600 mb-4">
              Започнете с генериране на първия си отчет за прогрес
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => generateProgressReportMutation.mutate()}
              disabled={generateProgressReportMutation.isPending}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {generateProgressReportMutation.isPending ? "Генериране..." : "Генерирай отчет"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
