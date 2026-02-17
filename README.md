# AI Resume Builder — Build Track (Project 3)

## Overview

A comprehensive Premium Build System for creating and managing Project 3: **AI Resume Builder — Build Track**.

This system implements:
- **8-step sequential workflow** with no skipping
- **Route-based gating** system that blocks access until previous steps are completed
- **Artifact upload system** with localStorage persistence
- **Premium layout** with top bar, step navigation, main workspace (70%), and build panel (30%)
- **Proof page** for final submission with status tracking

## Project Structure

```
app/
├── contexts/
│   └── BuildContext.tsx          # Global build state management
├── components/
│   ├── PremiumLayout.tsx          # Main layout wrapper
│   ├── BuildPanel.tsx             # Right-side artifact upload panel
│   └── StepGate.tsx               # Route protection component
├── rb/                            # Resume Builder routes
│   ├── 01-problem/
│   ├── 02-market/
│   ├── 03-architecture/
│   ├── 04-hld/
│   ├── 05-lld/
│   ├── 06-build/
│   ├── 07-test/
│   ├── 08-ship/
│   └── proof/
├── page.tsx                       # Home page
└── layout.tsx                     # Root layout with BuildProvider
```

## Routes

All routes follow the pattern `/rb/<step-slug>`:

- `/` - Home page with project overview
- `/rb/01-problem` - Step 1: Problem Analysis
- `/rb/02-market` - Step 2: Market Research
- `/rb/03-architecture` - Step 3: System Architecture
- `/rb/04-hld` - Step 4: High-Level Design
- `/rb/05-lld` - Step 5: Low-Level Design
- `/rb/06-build` - Step 6: Implementation Build
- `/rb/07-test` - Step 7: Testing & QA
- `/rb/08-ship` - Step 8: Deployment & Ship
- `/rb/proof` - Proof page: Final submission

## Features

### 1. Sequential Gating System
- **Step 1** is always accessible
- **Steps 2-8** require the previous step to be completed
- Attempting to access locked steps redirects to Step 1
- Visual status indicators (completed/active/locked)

### 2. Build Context (State Management)
```typescript
interface BuildContextType {
  completedSteps: Set<number>;      // Which steps are done
  artifacts: Map<number, StepArtifact>;  // Uploaded artifacts
  uploadArtifact(step, url, fileName)   // Mark step complete
  isStepCompleted(step): boolean        // Check completion
  canAccessStep(step): boolean          // Check if unlocked
  finalSubmission: { lovableLink?, githubLink?, deployLink? }
}
```

Persists to `localStorage` with key `rb_build_state`.

### 3. Premium Layout Components
- **Top Bar**: Shows project name, current step, and status badge
- **Context Header**: Visual step progress bar (numbered circles)
- **Main Workspace (70%)**: Step-specific content
- **Build Panel (30%)**: 
  - Textarea for artifact content (read-only)
  - Copy to clipboard button
  - "Build in Lovable" link
  - File upload input
  - "It Worked" / "Error" / "Screenshot" buttons
  - Next Step button (disabled until artifact uploaded)

### 4. Artifact Upload System
- File upload stores in localStorage
- Each step stores artifacts under key: `rb_step_X_artifact`
- Uploads include filename and timestamp
- Visual feedback on upload success/error

### 5. Proof Page Features
- 8-step completion status grid (2x4 grid with progress indicators)
- Overall completion percentage
- Input fields for:
  - Lovable project link
  - GitHub repository link
  - Live deployment URL
- **Copy Final Submission** button to share completion proof
- Status summary (In Progress / Complete)

## How to Use

### For Users/Builders

1. **Start at Home** (`/`)
   - Click "Start Building" to go to Step 1

2. **Complete Each Step**
   - Read the step instructions
   - Use the build panel to copy content
   - Click "Build in Lovable" to edit
   - Upload your artifact via file input or "It Worked" button
   - Next Step button becomes enabled

3. **Progress Through All 8 Steps**
   - Cannot skip
   - Cannot go backward (gating prevents access to unlocked steps)
   - Steps are sequential and mandatory

4. **Final Submission**
   - Go to `/rb/proof` page
   - View all 8-step status
   - Enter Lovable link, GitHub link, deployment link
   - Click "Copy Submission" to get shareable text

## Data Persistence

All state is persisted to localStorage:
- Key: `rb_build_state`
- Structure:
```json
{
  "completedSteps": [1, 2, 3],
  "artifacts": [[1, {...}], [2, {...}]],
  "currentStep": 3,
  "finalSubmission": {
    "lovableLink": "...",
    "githubLink": "...",
    "deployLink": "..."
  }
}
```

## Styling

Built with **Tailwind CSS** for responsive design:
- Colors: Blue/Purple theme for primary, Green/Red for status
- Layout: Flexbox-based responsive grid
- Icons: Unicode emoji for visual feedback
- Responsive: Works on desktop and tablet

## Local Development

### Start Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context API
- **Persistence**: localStorage

## Notes

- ✅ No resume builder features implemented yet (only routing & gating)
- ✅ All 8 steps accessible sequentially
- ✅ Artifacts stored locally (ready for cloud integration)
- ✅ Ready for Lovable integration
- ✅ Fully responsive design
- ✅ Step progression is enforced at the component level

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
