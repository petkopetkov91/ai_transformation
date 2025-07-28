import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye
} from "lucide-react";
import { t } from "@/lib/translations";
import type { Document } from "@shared/schema";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
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

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "strategy":
        return "bg-purple-100 text-purple-700";
      case "process":
        return "bg-blue-100 text-blue-700";
      case "training":
        return "bg-green-100 text-green-700";
      case "technical":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "strategy":
        return "Стратегия";
      case "process":
        return "Процеси";
      case "training":
        return "Обучение";
      case "technical":
        return "Техническо";
      default:
        return "Общо";
    }
  };

  // Sample documents for demo
  const sampleDocuments: Document[] = [
    {
      id: "doc-1",
      title: "Дигитална стратегия 2024",
      filename: "digital-strategy-2024.pdf",
      fileType: "application/pdf",
      fileSize: 2.3 * 1024 * 1024,
      content: "Стратегически документ за дигитална трансформация...",
      aiAnalysis: "Този документ представя всеобхватна стратегия за дигитална трансформация...",
      tags: ["стратегия", "дигитализация", "2024"],
      category: "strategy",
      uploadedBy: "user-1",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "doc-2",
      title: "Анализ на процесите",
      filename: "process-analysis.xlsx",
      fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      fileSize: 1.8 * 1024 * 1024,
      content: "Детайлен анализ на съществуващите бизнес процеси...",
      aiAnalysis: "Анализът показва възможности за оптимизация в няколко ключови области...",
      tags: ["процеси", "анализ", "оптимизация"],
      category: "process",
      uploadedBy: "user-1",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "doc-3",
      title: "Презентация за ръководството",
      filename: "management-presentation.pptx",
      fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      fileSize: 4.2 * 1024 * 1024,
      content: "Презентация на резултатите от дигиталната трансформация...",
      aiAnalysis: "Презентацията ефективно представя постигнатия напредък...",
      tags: ["презентация", "резултати", "ръководство"],
      category: "strategy",
      uploadedBy: "user-1",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "doc-4",
      title: "План за обучение на персонала",
      filename: "training-plan.pdf",
      fileType: "application/pdf",
      fileSize: 1.5 * 1024 * 1024,
      content: "Подробен план за обучение на служителите...",
      aiAnalysis: "Планът за обучение обхваща всички необходими области...",
      tags: ["обучение", "персонал", "план"],
      category: "training",
      uploadedBy: "user-1",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  const displayDocuments = documents.length > 0 ? documents : sampleDocuments;

  const filteredDocuments = displayDocuments.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.content && doc.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "Всички" },
    { value: "strategy", label: "Стратегия" },
    { value: "process", label: "Процеси" },
    { value: "training", label: "Обучение" },
    { value: "technical", label: "Техническо" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("knowledgeBase")}
        subtitle="Централизиран достъп до всички документи и знания"
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            {t("uploadDocument")}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => {
              const Icon = getFileIcon(document.fileType);
              const iconColors = getFileIconColor(document.fileType);
              
              return (
                <Card key={document.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-semibold text-gray-900 truncate">
                          {document.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getCategoryColor(document.category)}>
                            {getCategoryLabel(document.category)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatFileSize(document.fileSize)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {document.content?.substring(0, 120)}...
                    </p>
                    
                    {document.aiAnalysis && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <h4 className="text-xs font-medium text-blue-900 mb-1">AI Анализ</h4>
                        <p className="text-xs text-blue-800 line-clamp-2">
                          {document.aiAnalysis.substring(0, 100)}...
                        </p>
                      </div>
                    )}
                    
                    {document.tags && document.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {document.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {document.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{document.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        {formatDate(document.createdAt)}
                      </span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredDocuments.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Няма намерени документи
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Опитайте с различни ключови думи" : "Качете първия си документ за започване"}
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              {t("uploadDocument")}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
