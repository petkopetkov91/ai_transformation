import { Header } from "@/components/layout/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ChatInterface } from "@/components/chat/chat-interface";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings";
import { KnowledgeQuickAccess } from "@/components/knowledge/knowledge-quick-access";
import { t } from "@/lib/translations";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const handleNewConsultation = () => {
    setLocation("/chat");
  };

  const handleExpandChat = () => {
    setLocation("/chat");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("dashboard")}
        subtitle={t("dashboardOverview")}
        onNewConsultation={handleNewConsultation}
      />

      <main className="flex-1 overflow-auto p-6">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ChatInterface
              sessionId="dashboard-chat"
              isCompact={true}
              onExpandClick={handleExpandChat}
            />
          </div>
          <RecentActivities />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProgressChart />
          <UpcomingMeetings />
        </div>

        <KnowledgeQuickAccess />
      </main>
    </div>
  );
}
