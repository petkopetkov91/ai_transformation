import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { t } from "@/lib/translations";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  TrendingUp,
  Book,
  ClipboardList,
  FileText,
  LayoutTemplate,
  Bot,
  User,
  MoreVertical,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";

const navigationItems = [
  { href: "/", icon: LayoutDashboard, label: t("dashboard") },
  { href: "/chat", icon: MessageSquare, label: t("aiChatAssistant") },
  { href: "/meetings", icon: Calendar, label: t("meetingTracking") },
  { href: "/progress", icon: TrendingUp, label: t("progressInitiatives") },
  { href: "/knowledge-base", icon: Book, label: t("knowledgeBase") },
  { href: "/actions", icon: ClipboardList, label: t("actionsList") },
  { href: "/reports", icon: FileText, label: t("reports") },
  { href: "/templates", icon: LayoutTemplate, label: t("templates") },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AI Асистент</h1>
            <p className="text-sm text-gray-500">Дигитална Трансформация</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-blue-50 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        {/* Отдели Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Отдели</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/marketing">
                    {t("marketing")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/hr">
                    {t("hr")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/new-cars">
                    {t("newCars")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/service">
                    {t("service")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/spare-parts">
                    {t("spareParts")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/departments/customer-service">
                    {t("customerService")}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-gray-600 w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Петко Петков</p>
            <p className="text-xs text-gray-500">{t("transformationManager")}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
