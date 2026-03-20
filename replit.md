# AAGE Intelligence

## Project Overview
A React/Vite frontend application migrated from Lovable to Replit. It appears to be an intelligence/analytics dashboard called "AAGE Intelligence" with survey data exploration features (Employer, Candidate, Graduate, Intern categories).

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite 8
- **UI**: Tailwind CSS, shadcn/ui (Radix UI components)
- **Routing**: React Router v6
- **State**: TanStack React Query
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod

## Project Structure
- `src/` - Main source code
  - `App.tsx` - Root component with routing
  - `pages/` - Page components (Index, NotFound)
  - `components/` - Reusable UI components
  - `hooks/` - Custom React hooks
  - `context/` - React context providers
  - `data/` - Static data files
  - `lib/` - Utility functions

## Running the Project
The app runs via the "Start application" workflow which executes `npm run dev` on port 5000.

## Replit Migration Notes
- Removed `lovable-tagger` (Lovable-specific dev dependency, incompatible with Vite 8)
- Updated `vite.config.ts`: host set to `0.0.0.0`, port set to `5000`, `allowedHosts: true` for Replit proxy compatibility
- Packages installed with `--legacy-peer-deps`

## Deployment
- Configured for static deployment: `npm run build` produces `dist/`
