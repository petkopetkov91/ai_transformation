import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import Dashboard from "@/pages/dashboard";
import Chat from "@/pages/chat";
import Meetings from "@/pages/meetings";
import ProgressPage from "@/pages/progress";
import KnowledgeBase from "@/pages/knowledge-base";
import Actions from "@/pages/actions";
import Reports from "@/pages/reports";
import Templates from "@/pages/templates";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/chat" component={Chat} />
        <Route path="/meetings" component={Meetings} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/knowledge-base" component={KnowledgeBase} />
        <Route path="/actions" component={Actions} />
        <Route path="/reports" component={Reports} />
        <Route path="/templates" component={Templates} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
