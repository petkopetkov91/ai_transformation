# Digital Transformation Management System

## Overview

This is a comprehensive digital transformation management system built with a modern full-stack architecture. The application provides AI-powered assistance for managing digital transformation initiatives, meetings, action items, and knowledge management. It features a React frontend with TypeScript, an Express.js backend, PostgreSQL database with Drizzle ORM, and OpenAI integration for intelligent features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between frontend and backend
- **File Upload**: Multer for handling document uploads
- **Build System**: ESBuild for production builds

### Database Design
- **Primary Database**: PostgreSQL (configured via Neon serverless)
- **Schema Management**: Drizzle migrations with schema definitions in shared folder
- **Key Tables**: Users, Initiatives, Meetings, Action Items, Documents, Chat Messages, Reports

## Key Components

### Core Entities
1. **Users**: Authentication and role-based access (managers)
2. **Initiatives**: Digital transformation projects with progress tracking
3. **Meetings**: Scheduled meetings with AI-generated summaries
4. **Action Items**: Tasks linked to meetings and initiatives
5. **Documents**: Knowledge base with file storage and search
6. **Chat Messages**: AI conversation history
7. **Reports**: Generated progress reports and analytics

### AI Integration
- **OpenAI GPT-4o**: Used for chat responses, meeting summaries, document analysis, and progress insights
- **Multilingual Support**: Primary language is Bulgarian with AI responses in Bulgarian
- **Context-Aware**: AI assistant understands digital transformation domain

### User Interface Components
- **Dashboard**: Overview with stats, progress charts, and recent activities
- **Chat Interface**: AI-powered consultation with expandable view
- **Meeting Management**: Scheduling, tracking, and AI summary generation
- **Progress Tracking**: Visual progress bars and initiative status
- **Knowledge Base**: Document upload, search, and categorization
- **Action Items**: Task management with priority and status tracking
- **Reports**: Analytics and progress report generation
- **Templates**: Reusable templates for common processes

## Data Flow

1. **User Authentication**: Users log in with username/password (role-based access)
2. **Dashboard Loading**: Fetches stats, recent activities, and progress data
3. **AI Interactions**: Chat messages sent to OpenAI API with context
4. **Data Persistence**: All entities stored in PostgreSQL via Drizzle ORM
5. **Real-time Updates**: React Query handles cache invalidation and refetching
6. **File Handling**: Documents uploaded via Multer and stored with metadata

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **drizzle-orm & drizzle-kit**: Type-safe database operations and migrations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Unstyled, accessible UI primitives
- **react-hook-form & @hookform/resolvers**: Form management
- **zod**: Runtime type validation
- **openai**: OpenAI API integration
- **multer**: File upload handling

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

### UI Components
- Comprehensive component library built on Radix UI primitives
- Custom design system with CSS variables for theming
- Responsive design with mobile-first approach

## Deployment Strategy

### Development
- **Dev Server**: Vite dev server with HMR for frontend
- **Backend**: tsx for TypeScript execution in development
- **Database**: Drizzle migrations for schema management

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Environment**: Production mode with error handling

### Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **OpenAI**: API key via OPENAI_API_KEY environment variable
- **Build**: Single command builds both frontend and backend
- **Start**: Production server runs bundled code

The system is designed for scalability with clear separation of concerns, type safety throughout, and modern development practices. The AI integration provides intelligent assistance while maintaining data privacy and user control.