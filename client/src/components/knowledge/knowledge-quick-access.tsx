import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, FileSpreadsheet, Presentation, Upload, Search } from "lucide-react";
import { t } from "@/lib/translations";
import type { Document } from "@shared/schema";

export function KnowledgeQuickAccess() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return FileText;
    if (fileType.includes("sheet") || fileType.includes("excel")) return FileSpreadsheet;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return Presentation;
    return FileText;
  };

  const getFileIconColor = (fileType: string) => {
    if (fileType.includes("pdf")) return "text-red-600 bg-red-100";
    if (fileType.includes("sheet") || fileType.includes("excel")) return "text-green-600 bg-green-100";
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return "text-blue-600 bg-blue-100";
    return "text-gray-600 bg-gray-100";
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `Преди ${diffDays} дни`;
    return `Преди ${Math.ceil(diffDays / 7)} седмици`;
  };

  // Sample documents for demo
  const sampleDocuments = [
    {
      id: "doc-1",
      title: "Дигитална стратегия 2024",
      filename: "digital-strategy-2024.pdf",
      fileType: "application/pdf",
      fileSize: 2.3 * 1024 * 1024,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: "doc-2",
      title: "Анализ на процесите",
      filename: "process-analysis.xlsx",
      fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      fileSize: 1.8 * 1024 * 1024,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    },
    {
      id: "doc-3",
      title: "Презентация за ръководството",
      filename: "management-presentation.pptx",
      fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      fileSize: 4.2 * 1024 * 1024,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // yesterday
    },
  ];

  const displayDocuments = documents.length > 0 ? documents : sampleDocuments;

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("knowledgeBaseQuickAccess")}</span>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              {t("uploadDocument")}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
          <span>{t("knowledgeBaseQuickAccess")}</span>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            {t("uploadDocument")}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {displayDocuments.map((document: any) => {
            const Icon = getFileIcon(document.fileType);
            const iconColors = getFileIconColor(document.fileType);
            
            return (
              <div
                key={document.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{document.title}</h3>
                    <p className="text-sm text-gray-500">
                      {document.fileType.includes("pdf") ? "PDF" : 
                       document.fileType.includes("excel") ? "XLSX" : "PPTX"} • {formatFileSize(document.fileSize)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {t("lastUpdated")}: {formatLastUpdated(new Date(document.createdAt))}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t("searchKnowledge")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="ghost" className="ml-4 text-primary hover:text-primary/90">
              {t("viewAllDocuments")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
