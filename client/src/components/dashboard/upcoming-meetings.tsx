import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { t } from "@/lib/translations";
import type { Meeting } from "@shared/schema";

export function UpcomingMeetings() {
  const { data: meetings = [], isLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
  });

  const upcomingMeetings = meetings
    .filter(meeting => new Date(meeting.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3);

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("upcomingMeetings")}</span>
            <Button size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-blue-100 text-primary";
      case "medium":
        return "bg-green-100 text-green-700";
      case "low":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return t("highPriority");
      case "medium":
        return t("mediumPriority");
      case "low":
        return t("lowPriority");
      default:
        return priority;
    }
  };

  const formatMeetingTime = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    const day = date.toLocaleDateString("bg-BG", { weekday: "long" });
    const time = date.toLocaleTimeString("bg-BG", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
    return `${day}, ${time}`;
  };

  // Sample upcoming meetings data for demo
  const sampleMeetings = [
    {
      id: "meeting-1",
      title: "Преглед на стратегията",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
      duration: 60,
      participants: [
        { name: "Участник 1" },
        { name: "Участник 2" },
        { name: "Участник 3" },
      ],
      priority: "high",
    },
    {
      id: "meeting-2", 
      title: "Технически преглед",
      scheduledAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // in 4 days
      duration: 60,
      participants: [
        { name: "Участник 1" },
        { name: "Участник 2" },
      ],
      priority: "medium",
    },
    {
      id: "meeting-3",
      title: "Финален одит", 
      scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // in 5 days
      duration: 90,
      participants: [
        { name: "Участник 1" },
        { name: "Участник 2" },
        { name: "Участник 3" },
        { name: "Участник 4" },
      ],
      priority: "low",
    },
  ];

  const displayMeetings = upcomingMeetings.length > 0 ? upcomingMeetings : sampleMeetings;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
          <span>{t("upcomingMeetings")}</span>
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary/90">
            <Plus className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayMeetings.map((meeting: any) => (
          <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{meeting.title}</h3>
              <Badge className={getPriorityColor(meeting.priority)}>
                {getPriorityLabel(meeting.priority)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {formatMeetingTime(meeting.scheduledAt)}
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {meeting.participants?.slice(0, 4).map((participant: any, index: number) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                +{meeting.participants?.length || 0} {t("participants")}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
