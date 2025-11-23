# Spotify Developer Portfolio

## Overview

A developer portfolio website designed as a pixel-perfect replica of the Spotify Desktop Application (Dark Mode). This application transforms traditional portfolio elements into Spotify-themed components: skills become "top tracks," projects are presented as albums, and professional links are styled as playlist items. The application uses a modern React + TypeScript stack with Express backend, featuring a Spotify-inspired dark theme with the signature #1ED760 green accent color.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: wouter library for client-side routing. Lightweight alternative to React Router, chosen for simplicity in a single-page portfolio application.

**UI Component System**: 
- shadcn/ui components (Radix UI primitives with Tailwind CSS)
- "new-york" style variant configured
- Comprehensive component library including dialogs, dropdowns, forms, navigation, and data display components
- Custom theming system with CSS variables for Spotify color palette

**Styling Approach**:
- Tailwind CSS for utility-first styling
- Custom design system matching Spotify's exact visual specifications
- Dark mode-first design with carefully defined color tokens
- Fixed layout structure: 280px left sidebar, 90px bottom player bar, scrollable main content area
- Sticky header with transparent-to-opaque scroll transition

**State Management**: 
- TanStack Query (React Query) for server state management
- Built-in React hooks for local component state
- Custom query client with credential-based fetching

**Animation**: Framer Motion for scroll-based animations and transitions, particularly used for the hero section gradient background effects.

### Backend Architecture

**Runtime**: Node.js with Express framework using ES modules.

**Development vs Production**:
- Development mode: Vite middleware integration with HMR (Hot Module Replacement)
- Production mode: Pre-built static assets served from dist/public
- Separate entry points (index-dev.ts vs index-prod.ts) for environment-specific server configuration

**API Layer**: 
- RESTful API structure with /api prefix convention
- Request logging middleware with timing information
- JSON body parsing with raw body preservation for webhook scenarios
- CORS and credential support configured

**Storage Abstraction**:
- Interface-based storage layer (IStorage) allowing multiple implementations
- Current implementation: In-memory storage (MemStorage) using Map data structures
- Designed to be swapped with database implementations without changing application code
- CRUD operations for user management (getUser, getUserByUsername, createUser)

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL dialect.

**Schema Design**:
- Users table with UUID primary keys (using PostgreSQL's gen_random_uuid())
- Username/password authentication fields
- Zod schema validation integrated with Drizzle for type-safe insertions

**Migration Strategy**: 
- Drizzle Kit for schema management
- Migrations output to dedicated ./migrations directory
- Database push capability via npm scripts (db:push)

**Database Provider**: Configured for Neon Database (@neondatabase/serverless), a serverless PostgreSQL solution optimized for edge deployments.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (comprehensive set for accessible, unstyled components)
- Embla Carousel for carousel functionality
- Lucide React for iconography
- cmdk for command palette interfaces

**Form Management**:
- React Hook Form for performant form state management
- Hookform Resolvers for schema validation integration
- Zod for runtime type validation

**Styling & Theming**:
- Tailwind CSS with PostCSS processing
- class-variance-authority (CVA) for component variant management
- clsx + tailwind-merge for conditional className handling

**Development Tools**:
- Replit-specific plugins for development banner, runtime error overlay, and cartographer
- TypeScript for type safety across client and server
- esbuild for production server bundling

**Session Management**: 
- connect-pg-simple for PostgreSQL-backed session storage
- Designed to work with Express session middleware (though not yet implemented in routes)

**Date Handling**: date-fns library for date manipulation and formatting.

**Database Connection**: 
- Neon serverless driver for edge-compatible PostgreSQL connections
- Environment variable-based configuration (DATABASE_URL)

### Design System

The application implements an exact visual replica of Spotify's interface with specific color tokens:
- Background: #121212 (main), #000000 (sidebar/player)
- Surfaces: #181818 (cards), #282828 (hover states)
- Accent: #1ED760 (Spotify green for CTAs and highlights)
- Text: #FFFFFF (primary), #B3B3B3 (secondary/metadata)

Layout follows fixed positioning for navigation (sidebar and player bar) with independent scrolling for main content, matching Spotify's desktop application behavior.