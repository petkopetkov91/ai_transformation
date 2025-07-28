export const translations = {
  // Navigation
  dashboard: "Табло за управление",
  aiChatAssistant: "AI Чат асистент",
  meetingTracking: "Проследяване на срещи",
  progressInitiatives: "Прогрес по инициативи",
  knowledgeBase: "База знания",
  actionsList: "Списък действия",
  reports: "Отчети",
  templates: "Шаблони",

  // Dashboard
  dashboardOverview: "Преглед на дигиталната трансформация",
  newConsultation: "Нова консултация",
  activeInitiatives: "Активни инициативи",
  completedMeetings: "Завършени срещи",
  openActions: "Отворени действия",
  overallProgress: "Общ прогрес",
  recentActivities: "Последни дейности",
  upcomingMeetings: "Предстоящи срещи",
  knowledgeBaseQuickAccess: "База знания - Бърз достъп",

  // Chat
  chatPlaceholder: "Напишете вашето съобщение...",
  chatGreeting: "Здравейте! Как мога да ви помогна с дигиталната трансформация днес?",

  // Progress
  automationProcess: "Автоматизация на процеси",
  digitalStrategy: "Цифрова стратегия",
  staffTraining: "Обучение на персонала",
  itModernization: "Модернизация на ИТ",
  viewDetailedProgress: "Виж подробен прогрес",

  // Meetings
  addMeeting: "Добави среща",
  highPriority: "Висок приоритет",
  mediumPriority: "Среден приоритет",
  lowPriority: "Нисък приоритет",
  participants: "участника",

  // Knowledge Base
  uploadDocument: "Качи документ",
  searchKnowledge: "Търсене в базата знания...",
  viewAllDocuments: "Виж всички документи",
  lastUpdated: "Последно актуализиран",

  // Actions
  inProgress: "В ход",
  completed: "Завършено",

  // Time
  hoursAgo: "часа",
  daysAgo: "дни",
  yesterday: "Вчера",
  ago: "Преди",

  // User
  transformationManager: "Мениджър по трансформация",

  // Common
  loading: "Зареждане...",
  error: "Грешка",
  save: "Запази",
  cancel: "Отказ",
  delete: "Изтрий",
  edit: "Редактирай",
  view: "Виж",
  download: "Изтегли",
  upload: "Качи",
  search: "Търсене",
  filter: "Филтрирай",
  sort: "Сортирай",
  refresh: "Обнови",
  close: "Затвори",
  open: "Отвори",
  yes: "Да",
  no: "Не",
  ok: "ОК",

  // Status
  active: "Активен",
  inactive: "Неактивен",
  pending: "Чакащ",
  draft: "Чернова",
  published: "Публикуван",
  archived: "Архивиран",

  // File types
  pdf: "PDF",
  doc: "DOC",
  docx: "DOCX",
  xls: "XLS",
  xlsx: "XLSX",
  ppt: "PPT",
  pptx: "PPTX",
  txt: "TXT",

  // Departments
  departments: "Отдели",
  marketing: "Маркетинг",
  hr: "Човешки ресурси",
  newCars: "Нови автомобили",
  service: "Сервиз",
  spareParts: "Резервни части",
  customerService: "Клиентско обслужване",
};

export function t(key: keyof typeof translations): string {
  return translations[key] || key;
}
