import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Search,
  Plus,
  Eye,
  Star,
  Copy,
  Settings
} from "lucide-react";
import { t } from "@/lib/translations";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  rating: number;
  downloads: number;
  tags: string[];
  preview: string;
  createdAt: Date;
}

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Template data
  const templates: Template[] = [
    {
      id: "template-1",
      title: "План за дигитална трансформация",
      description: "Всеобхватен шаблон за планиране и управление на дигитална трансформация в организацията",
      category: "strategy",
      type: "plan",
      difficulty: "intermediate",
      estimatedTime: "2-3 часа",
      rating: 4.8,
      downloads: 156,
      tags: ["стратегия", "планиране", "трансформация"],
      preview: "1. Анализ на текущото състояние\n2. Визия и цели\n3. Roadmap за внедряване\n4. Управление на риска...",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "template-2",
      title: "Матрица за оценка на процесите",
      description: "Шаблон за анализ и оценка на съществуващите бизнес процеси преди автоматизация",
      category: "process",
      type: "assessment",
      difficulty: "beginner",
      estimatedTime: "1-2 часа",
      rating: 4.6,
      downloads: 203,
      tags: ["процеси", "анализ", "оценка"],
      preview: "Критерии за оценка:\n- Сложност на процеса\n- Честота на изпълнение\n- Потенциал за автоматизация...",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "template-3",
      title: "План за обучение на персонала",
      description: "Структуриран план за обучение на служителите в дигитални технологии и нови процеси",
      category: "training",
      type: "plan",
      difficulty: "beginner",
      estimatedTime: "1 час",
      rating: 4.9,
      downloads: 89,
      tags: ["обучение", "персонал", "развитие"],
      preview: "Модули за обучение:\n1. Основи на дигиталните технологии\n2. Нови работни процеси\n3. Инструменти и платформи...",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "template-4",
      title: "Презентация за ръководството",
      description: "Готова презентация за представяне на резултатите от дигиталната трансформация",
      category: "communication",
      type: "presentation",
      difficulty: "intermediate",
      estimatedTime: "30 минути",
      rating: 4.7,
      downloads: 134,
      tags: ["презентация", "резултати", "ръководство"],
      preview: "Структура на презентацията:\n- Постигнати цели\n- Ключови метрики\n- ROI анализ\n- Следващи стъпки...",
      createdAt: new Date("2024-01-25"),
    },
    {
      id: "template-5",
      title: "Checklist за технически одит",
      description: "Подробен списък за проверка на техническата готовност преди внедряване на нови системи",
      category: "technical",
      type: "checklist",
      difficulty: "advanced",
      estimatedTime: "3-4 часа",
      rating: 4.5,
      downloads: 67,
      tags: ["одит", "техническо", "системи"],
      preview: "Области за проверка:\n✓ Мрежова инфраструктура\n✓ Сигурност на данните\n✓ Интеграция със системи...",
      createdAt: new Date("2024-01-30"),
    },
    {
      id: "template-6",
      title: "Формуляр за обратна връзка",
      description: "Шаблон за събиране на обратна връзка от служителите относно новите процеси",
      category: "feedback",
      type: "form",
      difficulty: "beginner",
      estimatedTime: "15 минути",
      rating: 4.4,
      downloads: 178,
      tags: ["обратна връзка", "анкета", "служители"],
      preview: "Въпроси:\n1. Как оценявате новите процеси? (1-5)\n2. Какви затруднения срещате?\n3. Предложения за подобрение...",
      createdAt: new Date("2024-02-01"),
    },
  ];

  const categories = [
    { value: "all", label: "Всички категории" },
    { value: "strategy", label: "Стратегия" },
    { value: "process", label: "Процеси" },
    { value: "training", label: "Обучение" },
    { value: "communication", label: "Комуникация" },
    { value: "technical", label: "Техническо" },
    { value: "feedback", label: "Обратна връзка" },
  ];

  const types = [
    { value: "all", label: "Всички типове" },
    { value: "plan", label: "План" },
    { value: "assessment", label: "Оценка" },
    { value: "presentation", label: "Презентация" },
    { value: "checklist", label: "Списък" },
    { value: "form", label: "Формуляр" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "strategy":
        return "bg-purple-100 text-purple-700";
      case "process":
        return "bg-blue-100 text-blue-700";
      case "training":
        return "bg-green-100 text-green-700";
      case "communication":
        return "bg-orange-100 text-orange-700";
      case "technical":
        return "bg-red-100 text-red-700";
      case "feedback":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Начинаещ";
      case "intermediate":
        return "Средно";
      case "advanced":
        return "Напреднал";
      default:
        return difficulty;
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category;
  };

  const getTypeLabel = (type: string) => {
    return types.find(t => t.value === type)?.label || type;
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !searchQuery || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesType = selectedType === "all" || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title={t("templates")}
        subtitle="Готови шаблони и рамки за дигитална трансформация"
      />

      <main className="flex-1 overflow-auto p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Търсене на шаблони..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            {categories.slice(0, 4).map(category => (
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
            <Plus className="w-4 h-4 mr-2" />
            Нов шаблон
          </Button>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {categories.slice(1).map(category => {
            const count = templates.filter(t => t.category === category.value).length;
            return (
              <Card 
                key={category.value} 
                className={`shadow-sm cursor-pointer transition-all ${
                  selectedCategory === category.value ? 'ring-2 ring-primary' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{category.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold text-gray-900 mb-2">
                      {template.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {getCategoryLabel(template.category)}
                      </Badge>
                      <Badge variant="outline">
                        {getTypeLabel(template.type)}
                      </Badge>
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {getDifficultyLabel(template.difficulty)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Преглед:</h4>
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {template.preview}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(template.rating)}
                    <span className="text-sm text-gray-500 ml-1">
                      ({template.rating})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {template.downloads} изтегляния
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    Време: {template.estimatedTime}
                  </span>
                  <span className="text-sm text-gray-500">
                    {template.createdAt.toLocaleDateString("bg-BG")}
                  </span>
                </div>
                
                {template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Изтегли
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Няма намерени шаблони
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Опитайте с различни ключови думи" : "Изберете различна категория или тип"}
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
              }}
            >
              Изчисти филтрите
            </Button>
          </div>
        )}

        {/* Popular Templates Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Популярни шаблони</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 4)
              .map((template) => (
                <Card key={`popular-${template.id}`} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 text-sm">
                      {template.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(template.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {template.downloads} изтегляния
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
