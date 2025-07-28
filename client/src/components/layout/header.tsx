import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { t } from "@/lib/translations";

interface HeaderProps {
  title: string;
  subtitle: string;
  onNewConsultation?: () => void;
}

export function Header({ title, subtitle, onNewConsultation }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {onNewConsultation && (
            <Button onClick={onNewConsultation} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              {t("newConsultation")}
            </Button>
          )}
          <div className="relative">
            <button className="text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
