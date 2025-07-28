import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInitiativeSchema, 
  insertMeetingSchema, 
  insertActionItemSchema,
  insertDocumentSchema,
  insertChatMessageSchema,
  insertReportSchema
} from "@shared/schema";
import { 
  generateChatResponse, 
  generateMeetingSummary, 
  analyzeDocument, 
  generateActionItems,
  generateProgressInsights
} from "./services/openai";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

export async function registerRoutes(app: Express): Promise<Server> {
  // Stats endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Initiatives
  app.get("/api/initiatives", async (req, res) => {
    try {
      const initiatives = await storage.getInitiatives();
      res.json(initiatives);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch initiatives" });
    }
  });

  app.post("/api/initiatives", async (req, res) => {
    try {
      const validatedData = insertInitiativeSchema.parse(req.body);
      const initiative = await storage.createInitiative(validatedData);
      res.status(201).json(initiative);
    } catch (error) {
      res.status(400).json({ message: "Invalid initiative data" });
    }
  });

  app.patch("/api/initiatives/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateInitiative(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Initiative not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update initiative" });
    }
  });

  // Meetings
  app.get("/api/meetings", async (req, res) => {
    try {
      const meetings = await storage.getMeetings();
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  app.post("/api/meetings", async (req, res) => {
    try {
      const validatedData = insertMeetingSchema.parse(req.body);
      const meeting = await storage.createMeeting(validatedData);
      res.status(201).json(meeting);
    } catch (error) {
      res.status(400).json({ message: "Invalid meeting data" });
    }
  });

  app.patch("/api/meetings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateMeeting(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meeting" });
    }
  });

  // Generate meeting summary
  app.post("/api/meetings/:id/summary", async (req, res) => {
    try {
      const { id } = req.params;
      const meeting = await storage.getMeeting(id);
      if (!meeting || !meeting.notes) {
        return res.status(404).json({ message: "Meeting or notes not found" });
      }

      const summary = await generateMeetingSummary(meeting.notes);
      const updated = await storage.updateMeeting(id, { aiSummary: summary });
      
      res.json({ summary });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate summary" });
    }
  });

  // Action Items
  app.get("/api/action-items", async (req, res) => {
    try {
      const actionItems = await storage.getActionItems();
      res.json(actionItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch action items" });
    }
  });

  app.post("/api/action-items", async (req, res) => {
    try {
      const validatedData = insertActionItemSchema.parse(req.body);
      const actionItem = await storage.createActionItem(validatedData);
      res.status(201).json(actionItem);
    } catch (error) {
      res.status(400).json({ message: "Invalid action item data" });
    }
  });

  app.patch("/api/action-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateActionItem(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Action item not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update action item" });
    }
  });

  // Generate action items from meeting
  app.post("/api/meetings/:id/generate-actions", async (req, res) => {
    try {
      const { id } = req.params;
      const meeting = await storage.getMeeting(id);
      if (!meeting || !meeting.notes) {
        return res.status(404).json({ message: "Meeting or notes not found" });
      }

      const actions = await generateActionItems(meeting.notes);
      const createdActions = [];

      for (const action of actions) {
        const actionItem = await storage.createActionItem({
          ...action,
          assignee: action.assignee || "Неопределен",
          meetingId: id,
          status: "open",
        });
        createdActions.push(actionItem);
      }

      res.json(createdActions);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate action items" });
    }
  });

  // Documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.post("/api/documents/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { originalname, mimetype, size } = req.file;
      const { title, category } = req.body;

      // In a real app, you'd extract text content from the file
      const content = "Extracted text content would go here";
      const analysis = await analyzeDocument(content, originalname);

      const document = await storage.createDocument({
        title: title || originalname,
        filename: originalname,
        fileType: mimetype,
        fileSize: size,
        content,
        aiAnalysis: analysis,
        category: category || "general",
        tags: [],
        uploadedBy: "user-1", // In real app, get from auth
      });

      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  app.get("/api/documents/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query required" });
      }

      const documents = await storage.searchDocuments(q);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to search documents" });
    }
  });

  // Chat
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ message: "Message content required" });
      }

      // Save user message
      await storage.createChatMessage({
        content,
        role: "user",
        userId: "user-1", // In real app, get from auth
        sessionId,
      });

      // Generate AI response
      const aiResponse = await generateChatResponse(content);

      // Save AI message
      const aiMessage = await storage.createChatMessage({
        content: aiResponse,
        role: "assistant",
        userId: null,
        sessionId,
      });

      res.json(aiMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.post("/api/reports/generate-progress", async (req, res) => {
    try {
      const initiatives = await storage.getInitiatives();
      const insights = await generateProgressInsights(initiatives);
      
      const report = await storage.createReport({
        title: "Отчет за прогрес на инициативи",
        type: "progress",
        content: {
          insights,
          initiatives,
          generatedAt: new Date().toISOString(),
        },
        generatedBy: "user-1", // In real app, get from auth
      });

      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate progress report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
