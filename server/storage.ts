import { 
  type User, type InsertUser,
  type Initiative, type InsertInitiative,
  type Meeting, type InsertMeeting,
  type ActionItem, type InsertActionItem,
  type Document, type InsertDocument,
  type ChatMessage, type InsertChatMessage,
  type Report, type InsertReport
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Initiatives
  getInitiatives(): Promise<Initiative[]>;
  getInitiative(id: string): Promise<Initiative | undefined>;
  createInitiative(initiative: InsertInitiative): Promise<Initiative>;
  updateInitiative(id: string, updates: Partial<Initiative>): Promise<Initiative | undefined>;

  // Meetings
  getMeetings(): Promise<Meeting[]>;
  getMeeting(id: string): Promise<Meeting | undefined>;
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  updateMeeting(id: string, updates: Partial<Meeting>): Promise<Meeting | undefined>;

  // Action Items
  getActionItems(): Promise<ActionItem[]>;
  getActionItem(id: string): Promise<ActionItem | undefined>;
  createActionItem(actionItem: InsertActionItem): Promise<ActionItem>;
  updateActionItem(id: string, updates: Partial<ActionItem>): Promise<ActionItem | undefined>;

  // Documents
  getDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  searchDocuments(query: string): Promise<Document[]>;

  // Chat Messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Reports
  getReports(): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;

  // Analytics
  getStats(): Promise<{
    activeInitiatives: number;
    completedMeetings: number;
    openActions: number;
    overallProgress: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private initiatives: Map<string, Initiative>;
  private meetings: Map<string, Meeting>;
  private actionItems: Map<string, ActionItem>;
  private documents: Map<string, Document>;
  private chatMessages: Map<string, ChatMessage>;
  private reports: Map<string, Report>;

  constructor() {
    this.users = new Map();
    this.initiatives = new Map();
    this.meetings = new Map();
    this.actionItems = new Map();
    this.documents = new Map();
    this.chatMessages = new Map();
    this.reports = new Map();

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create default user
    const defaultUser: User = {
      id: "user-1",
      username: "ivan.petrov",
      password: "password",
      role: "manager",
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create sample initiatives
    const initiatives = [
      {
        id: "init-1",
        title: "Автоматизация на процеси",
        description: "Внедряване на автоматизирани процеси в организацията",
        status: "active",
        progress: 76,
        priority: "high",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "init-2",
        title: "Цифрова стратегия",
        description: "Разработване на цифрова стратегия за компанията",
        status: "active",
        progress: 45,
        priority: "high",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-11-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "init-3",
        title: "Обучение на персонала",
        description: "Обучение на служителите за дигитални технологии",
        status: "active",
        progress: 92,
        priority: "medium",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-08-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "init-4",
        title: "Модернизация на ИТ",
        description: "Обновяване на ИТ инфраструктурата",
        status: "active",
        progress: 23,
        priority: "high",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2025-03-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    initiatives.forEach(init => this.initiatives.set(init.id, init as Initiative));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Initiatives
  async getInitiatives(): Promise<Initiative[]> {
    return Array.from(this.initiatives.values());
  }

  async getInitiative(id: string): Promise<Initiative | undefined> {
    return this.initiatives.get(id);
  }

  async createInitiative(insertInitiative: InsertInitiative): Promise<Initiative> {
    const id = randomUUID();
    const initiative: Initiative = {
      ...insertInitiative,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.initiatives.set(id, initiative);
    return initiative;
  }

  async updateInitiative(id: string, updates: Partial<Initiative>): Promise<Initiative | undefined> {
    const existing = this.initiatives.get(id);
    if (!existing) return undefined;
    
    const updated: Initiative = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.initiatives.set(id, updated);
    return updated;
  }

  // Meetings
  async getMeetings(): Promise<Meeting[]> {
    return Array.from(this.meetings.values());
  }

  async getMeeting(id: string): Promise<Meeting | undefined> {
    return this.meetings.get(id);
  }

  async createMeeting(insertMeeting: InsertMeeting): Promise<Meeting> {
    const id = randomUUID();
    const meeting: Meeting = {
      ...insertMeeting,
      id,
      createdAt: new Date(),
    };
    this.meetings.set(id, meeting);
    return meeting;
  }

  async updateMeeting(id: string, updates: Partial<Meeting>): Promise<Meeting | undefined> {
    const existing = this.meetings.get(id);
    if (!existing) return undefined;
    
    const updated: Meeting = { ...existing, ...updates };
    this.meetings.set(id, updated);
    return updated;
  }

  // Action Items
  async getActionItems(): Promise<ActionItem[]> {
    return Array.from(this.actionItems.values());
  }

  async getActionItem(id: string): Promise<ActionItem | undefined> {
    return this.actionItems.get(id);
  }

  async createActionItem(insertActionItem: InsertActionItem): Promise<ActionItem> {
    const id = randomUUID();
    const actionItem: ActionItem = {
      ...insertActionItem,
      id,
      createdAt: new Date(),
    };
    this.actionItems.set(id, actionItem);
    return actionItem;
  }

  async updateActionItem(id: string, updates: Partial<ActionItem>): Promise<ActionItem | undefined> {
    const existing = this.actionItems.get(id);
    if (!existing) return undefined;
    
    const updated: ActionItem = { ...existing, ...updates };
    this.actionItems.set(id, updated);
    return updated;
  }

  // Documents
  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const document: Document = {
      ...insertDocument,
      id,
      createdAt: new Date(),
    };
    this.documents.set(id, document);
    return document;
  }

  async searchDocuments(query: string): Promise<Document[]> {
    const documents = Array.from(this.documents.values());
    const lowerQuery = query.toLowerCase();
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      (doc.content && doc.content.toLowerCase().includes(lowerQuery)) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }

  // Chat Messages
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Reports
  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = randomUUID();
    const report: Report = {
      ...insertReport,
      id,
      createdAt: new Date(),
    };
    this.reports.set(id, report);
    return report;
  }

  // Analytics
  async getStats(): Promise<{
    activeInitiatives: number;
    completedMeetings: number;
    openActions: number;
    overallProgress: number;
  }> {
    const initiatives = Array.from(this.initiatives.values());
    const meetings = Array.from(this.meetings.values());
    const actionItems = Array.from(this.actionItems.values());

    const activeInitiatives = initiatives.filter(init => init.status === "active").length;
    const completedMeetings = meetings.filter(meeting => meeting.status === "completed").length;
    const openActions = actionItems.filter(action => action.status === "open").length;
    
    const totalProgress = initiatives.reduce((sum, init) => sum + init.progress, 0);
    const overallProgress = initiatives.length > 0 ? Math.round(totalProgress / initiatives.length) : 0;

    return {
      activeInitiatives,
      completedMeetings,
      openActions,
      overallProgress,
    };
  }
}

export const storage = new MemStorage();
