import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, CheckCircle, ClipboardList, PieChart } from "lucide-react";
import { t } from "@/lib/translations";

interface StatsData {
  activeInitiatives: number;
  completedMeetings: number;
  openActions: number;
  overallProgress: number;
}

export function StatsCards() {
  const { data: stats, isLoading } = useQuery<StatsData>({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statsConfig = [
    {
      title: t("activeInitiatives"),
      value: stats.activeInitiatives,
      icon: Rocket,
      color: "blue",
      change: "+8% от миналия месец",
      changeType: "positive" as const,
    },
    {
      title: t("completedMeetings"),
      value: stats.completedMeetings,
      icon: CheckCircle,
      color: "green",
      change: "+15% от миналия месец",
      changeType: "positive" as const,
    },
    {
      title: t("openActions"),
      value: stats.openActions,
      icon: ClipboardList,
      color: "yellow",
      change: "-3% от миналия месец",
      changeType: "negative" as const,
    },
    {
      title: t("overallProgress"),
      value: `${stats.overallProgress}%`,
      icon: PieChart,
      color: "purple",
      change: "+12% от миналия месец",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        const iconBgColor = {
          blue: "bg-blue-100",
          green: "bg-green-100",
          yellow: "bg-yellow-100",
          purple: "bg-purple-100",
        }[stat.color];
        
        const iconColor = {
          blue: "text-primary",
          green: "text-green-600",
          yellow: "text-yellow-600",
          purple: "text-purple-600",
        }[stat.color];

        return (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${iconColor} w-6 h-6`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span 
                  className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
