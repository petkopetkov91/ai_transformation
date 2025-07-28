import { Header } from "@/components/layout/header";
import { ChatInterface } from "@/components/chat/chat-interface";
import { t } from "@/lib/translations";

export default function Chat() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("aiChatAssistant")}
        subtitle="Получете интелигентна помощ за вашата дигитална трансформация"
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <ChatInterface sessionId="main-chat" />
        </div>
      </main>
    </div>
  );
}
