import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { t } from "@/lib/translations";
import type { Initiative } from "@shared/schema";

export function ProgressChart() {
  const { data: initiatives = [], isLoading } = useQuery<Initiative[]>({
    queryKey: ["/api/initiatives"],
  });

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("progressInitiatives")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-primary";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {t("progressInitiatives")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initiatives.slice(0, 4).map((initiative) => (
            <div key={initiative.id}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {initiative.title}
                </span>
                <span className="text-sm text-gray-500">{initiative.progress}%</span>
              </div>
              <Progress 
                value={initiative.progress} 
                className="h-2"
                style={{
                  '--progress-background': getProgressColor(initiative.progress)
                } as React.CSSProperties}
              />
            </div>
          ))}

          <Button 
            variant="ghost" 
            className="w-full mt-6 text-primary hover:text-primary/90"
          >
            {t("viewDetailedProgress")} <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
