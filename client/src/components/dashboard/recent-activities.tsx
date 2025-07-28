import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, AlertTriangle, TrendingUp } from "lucide-react";
import { t } from "@/lib/translations";

const activities = [
  {
    id: 1,
    title: "Среща за преглед завършена",
    time: "Преди 2 часа",
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    title: "Нов документ добавен в базата знания",
    time: "Преди 4 часа",
    icon: Upload,
    iconColor: "text-primary",
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    title: "Действие с висок приоритет създадено",
    time: "Вчера",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Отчет за прогрес генериран",
    time: "Вчера",
    icon: TrendingUp,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
];

export function RecentActivities() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {t("recentActivities")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
                <Icon className={`${activity.iconColor} w-4 h-4`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
