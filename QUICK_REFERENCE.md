# 🚀 AI Resume Builder — Quick Reference

## Project 3: Build Track - Developer Cheatsheet

---

## 📍 Quick Navigation

| What | URL | Purpose |
|------|-----|---------|
| Home | http://localhost:3000 | Project overview |
| Step 1 | /rb/01-problem | Always open |
| Step 8 | /rb/08-ship | Last step |
| Proof | /rb/proof | Final submission |

---

## 🔑 Key Files

```
BuildContext.tsx      → Global state (completedSteps, artifacts)
PremiumLayout.tsx     → Main layout (70/30 split)
BuildPanel.tsx        → Upload panel (right side)
StepGate.tsx          → Route protection
page.tsx (step X)     → Step content
```

---

## 💻 Using Global State

```typescript
import { useBuild } from '@/app/contexts/BuildContext';

function MyComponent() {
  const {
    completedSteps,      // Set<number>
    artifacts,           // Map<number, StepArtifact>
    isStepCompleted,     // (step: number) => boolean
    canAccessStep,       // (step: number) => boolean
    uploadArtifact,      // (step, url, fileName) => void
    finalSubmission,     // { lovableLink?, githubLink?, deployLink? }
    setFinalSubmission   // (data) => void
  } = useBuild();
  
  // Examples:
  if (isStepCompleted(1)) { /* Step 1 done */ }
  if (canAccessStep(3)) { /* User can access Step 3 */ }
  uploadArtifact(1, 'url', 'filename.txt');
}
```

---

## 📦 Step Template

```typescript
'use client';

import { PremiumLayout } from '@/app/components/PremiumLayout';
import { StepGate } from '@/app/components/StepGate';

export default function StepXX() {
  return (
    <StepGate step={N}>
      <PremiumLayout step={N} title="Step XX — Title">
        {/* Your content here */}
      </PremiumLayout>
    </StepGate>
  );
}
```

---

## 🎨 Layout Components

### PremiumLayout Props
```typescript
<PremiumLayout 
  step={1}              // Step number (1-8)
  title="Problem"      // Step title
  artifactContent=""   // Optional: pre-fill textarea
>
  {children}           // Step content
</PremiumLayout>
```

### BuildPanel Props
```typescript
<BuildPanel
  step={1}             // Current step number
  title="Problem"     // Step title
  artifactContent=""  // Optional: textarea content
/>
```

---

## 🔄 State Persistence

### How to Check localStorage
```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('rb_build_state')));

// Clear state:
localStorage.removeItem('rb_build_state');
```

### State Structure
```javascript
{
  completedSteps: [1, 2, 3],
  artifacts: [
    [1, {stepNumber: 1, artifactUrl: "...", fileName: "..."}]
  ],
  currentStep: 3,
  finalSubmission: {
    lovableLink: "...",
    githubLink: "...",
    deployLink: "..."
  }
}
```

---

## 🛠️ Common Tasks

### Mark Step as Complete
```typescript
const { uploadArtifact } = useBuild();
uploadArtifact(1, 'https://example.com/artifact', 'file.txt');
```

### Check if Step is Completed
```typescript
const { isStepCompleted } = useBuild();
const isDone = isStepCompleted(3);
```

### Check if Step is Accessible
```typescript
const { canAccessStep } = useBuild();
const canAccess = canAccessStep(5);
```

### Update Final Submission
```typescript
const { setFinalSubmission } = useBuild();
setFinalSubmission({
  lovableLink: 'https://lovable.dev/...',
  githubLink: 'https://github.com/...',
  deployLink: 'https://myapp.com'
});
```

---

## 🚀 Server Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint code
npm run lint
```

---

## 🎯 Flow Control

### Normal Flow
```
Step 1 (complete)
  ↓
Step 2 (unlocked)
  ↓
Step 3 (unlocked)
  ... (repeat)
  ↓
Step 8 (complete)
  ↓
/rb/proof (submit)
```

### Gating Logic
```typescript
canAccessStep(step) {
  if (step === 1) return true;           // Always accessible
  return completedSteps.has(step - 1);   // Need previous step
}
```

### Route Protection
```typescript
if (!canAccessStep(step)) {
  router.push('/rb/01-problem');  // Redirect to Step 1
}
```

---

## 🎨 Styling Quick Reference

### Colors Used
| Use | Tailwind | Hex |
|-----|----------|-----|
| Primary | blue-600 | #2563EB |
| Success | green-600 | #16A34A |
| Warning | orange-600 | #EA580C |
| Error | red-600 | #DC2626 |
| Locked | gray-600 | #4B5563 |

### Common Classes
```
Rounded: rounded-lg (border-radius: 0.5rem)
Shadow: shadow-sm (subtle)
Padding: p-6 (1.5rem), p-4 (1rem)
Gap: gap-4 (1rem between children)
Width: w-full (100%), w-7/10 (70%), w-3/10 (30%)
```

---

## 📊 Debug Checklist

| Issue | Check |
|-------|-------|
| Step won't unlock | localStorage shows completedSteps? |
| Files not uploading | Browser console errors? |
| State not persisting | localStorage accessible? |
| Route gating broken | StepGate wraps component? |
| Styling off | Tailwind CSS loaded? |

---

## 💾 localStorage Keys

```
rb_build_state              → Main state object
rb_step_1_artifact_content  → File content
rb_step_1_artifact_filename → File name
rb_step_2_artifact_content
rb_step_2_artifact_filename
... (repeat for steps 1-8)
```

---

## 🎓 Example: Custom Build Panel

```typescript
import { BurnPanel } from '@/app/components/BuildPanel';
import { useBuild } from '@/app/contexts/BuildContext';

export function CustomBuildPanel() {
  const { uploadArtifact, isStepCompleted } = useBuild();
  
  const handleUpload = () => {
    uploadArtifact(1, 'https://url', 'file.txt');
  };
  
  return (
    <div>
      {isStepCompleted(1) && <p>✓ Step complete!</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
```

---

## 🔗 Important URLs

- **Dev Server**: http://localhost:3000
- **Lovable**: https://lovable.dev
- **Repo Template**: /rb/[step-number]-[title]

---

## 📝 Notes

- Step 1 always accessible (no gating)
- Steps 2-8 require previous completion
- Next button disabled until artifact uploaded
- localStorage persists across browser sessions
- State loads on app mount (useEffect in BuildContext)
- All routes wrapped in BuildProvider (layout.tsx)

---

## 🎯 Next Developer

- Modify steps in `/app/rb/XX-name/page.tsx`
- Change colors in component Tailwind classes
- Add features in BuildPanel or PremiumLayout
- Extend BuildContext for new state
- Use useBuild() hook anywhere to access state

**Happy building! 🚀**
