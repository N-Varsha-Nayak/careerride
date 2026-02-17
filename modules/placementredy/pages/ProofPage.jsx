import { useEffect, useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { getTestChecklistStatus } from './TestChecklist';

const STEPS = [
  { id: 'design', title: 'Design System Created', description: 'KodNest premium design tokens, components, and layout system.' },
  { id: 'landing', title: 'Landing Page Built', description: 'Professional landing page with feature overview and CTAs.' },
  { id: 'dashboard', title: 'Dashboard Implemented', description: 'Central hub with readiness score, skill breakdown, and weekly goals.' },
  { id: 'pages', title: 'Core Pages Built', description: 'Practice, Resources, Assessments, and Profile pages implemented.' },
  { id: 'analyzer', title: 'JD Analyzer Engine', description: 'Skill extraction, round mapping, and readiness scoring.' },
  { id: 'persistence', title: 'Data Persistence', description: 'localStorage-backed history and analysis storage.' },
  { id: 'interactivity', title: 'Skill Toggles & Scoring', description: 'Live score updates based on skill confidence changes.' },
  { id: 'validation', title: 'Input Validation & Hardening', description: 'JD validation, schema enforcement, edge case handling.' },
];

const STORAGE_KEY = 'prp_final_submission';
const STEPS_KEY = 'prp_steps_completed';

export function getProofStatus() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { lovable: '', github: '', deployment: '' };
  try {
    return JSON.parse(stored);
  } catch (e) {
    return { lovable: '', github: '', deployment: '' };
  }
}

export function setProofStatus(status) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
}

export function getStepsCompleted() {
  const stored = localStorage.getItem(STEPS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    return {};
  }
}

export function setStepsCompleted(steps) {
  localStorage.setItem(STEPS_KEY, JSON.stringify(steps));
}

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

export default function ProofPage() {
  const [submission, setSubmission] = useState(getProofStatus());
  const [steps, setSteps] = useState(getStepsCompleted());
  const [errors, setErrors] = useState({});
  const testStatus = getTestChecklistStatus();
  const testsPassingCount = Object.values(testStatus).filter(Boolean).length;
  const allTestsPassed = testsPassingCount === 10;

  function handleStepToggle(stepId) {
    const updated = { ...steps, [stepId]: !steps[stepId] };
    setSteps(updated);
    setStepsCompleted(updated);
  }

  function handleSubmissionChange(field, value) {
    const updated = { ...submission, [field]: value };
    setSubmission(updated);
    setProofStatus(updated);
    // clear error for this field when user updates it
    setErrors({ ...errors, [field]: '' });
  }

  function validateUrlsForDisplay() {
    // Only validate, don't update state - for use during render
    if (!submission.lovable.trim() || !isValidUrl(submission.lovable)) return false;
    if (!submission.github.trim() || !isValidUrl(submission.github)) return false;
    if (!submission.deployment.trim() || !isValidUrl(submission.deployment)) return false;
    return true;
  }

  function validateUrls() {
    // Validate and update errors - for use when copying
    const newErrors = {};
    if (!submission.lovable.trim()) newErrors.lovable = 'Lovable Project link is required.';
    else if (!isValidUrl(submission.lovable)) newErrors.lovable = 'Invalid URL. Must start with http:// or https://';
    
    if (!submission.github.trim()) newErrors.github = 'GitHub Repository link is required.';
    else if (!isValidUrl(submission.github)) newErrors.github = 'Invalid URL. Must start with http:// or https://';
    
    if (!submission.deployment.trim()) newErrors.deployment = 'Deployed URL is required.';
    else if (!isValidUrl(submission.deployment)) newErrors.deployment = 'Invalid URL. Must start with http:// or https://';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function copySubmission() {
    if (!validateUrls()) return;
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovable}
GitHub Repository: ${submission.github}
Live Deployment: ${submission.deployment}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence

Built with: React 19 + Tailwind CSS v4 + Vite
Storage: Browser localStorage (offline-first)
------------------------------------------`;
    navigator.clipboard.writeText(text);
    alert('Final submission copied to clipboard!');
  }

  const stepsCompletedCount = Object.values(steps).filter(Boolean).length;
  const allStepsCompleted = stepsCompletedCount === STEPS.length;
  const allLinksProvided = submission.lovable.trim() && submission.github.trim() && submission.deployment.trim();
  const allLinksValid = validateUrlsForDisplay();
  const isShipped = allStepsCompleted && allTestsPassed && allLinksValid;

  return (
    <div className="app-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Build Proof & Final Submission</h1>
        <p className="text-sm text-gray-600 mt-1">Document your work. Collect all proof. Ship the product.</p>
      </div>

      {/* Status Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${allStepsCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                {stepsCompletedCount} / {STEPS.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Steps Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${allTestsPassed ? 'text-green-600' : 'text-gray-600'}`}>
                {testsPassingCount} / 10
              </div>
              <div className="text-xs text-gray-500 mt-1">Tests Passed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${allLinksProvided ? 'text-green-600' : 'text-gray-600'}`}>
                {(submission.lovable.trim() ? 1 : 0) + (submission.github.trim() ? 1 : 0) + (submission.deployment.trim() ? 1 : 0)} / 3
              </div>
              <div className="text-xs text-gray-500 mt-1">Links Provided</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ship Status */}
      {isShipped && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg px-6 py-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">✓ SHIPPED</div>
            <p className="text-green-700 text-sm mb-4">
              You built a real product.<br />
              Not a tutorial. Not a clone.<br />
              A structured tool that solves a real problem.
            </p>
            <p className="text-green-600 font-semibold text-sm">This is your proof of work.</p>
          </div>
        </div>
      )}

      {!isShipped && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-700">
              Status: <strong>In Progress</strong> — Complete all steps, tests, and links to ship.
            </div>
          </div>
        </div>
      )}

      {/* Step Completion Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step Completion Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {STEPS.map((step) => {
              const completed = steps[step.id] || false;
              return (
                <div key={step.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                  <button
                    onClick={() => handleStepToggle(step.id)}
                    className="mt-0.5 flex-shrink-0"
                  >
                    {completed ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{step.description}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex-shrink-0">
                    {completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Artifact Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Artifact Inputs (Required for Ship Status)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Lovable Project Link
              </label>
              <input
                type="text"
                value={submission.lovable}
                onChange={(e) => handleSubmissionChange('lovable', e.target.value)}
                placeholder="https://lovable.dev/..."
                className={`w-full border rounded-md px-3 py-2 text-sm ${
                  errors.lovable ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.lovable && <div className="text-xs text-red-600 mt-1">{errors.lovable}</div>}
              {!errors.lovable && submission.lovable && (
                <div className="text-xs text-green-600 mt-1">✓ Valid URL</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                GitHub Repository Link
              </label>
              <input
                type="text"
                value={submission.github}
                onChange={(e) => handleSubmissionChange('github', e.target.value)}
                placeholder="https://github.com/username/repository"
                className={`w-full border rounded-md px-3 py-2 text-sm ${
                  errors.github ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.github && <div className="text-xs text-red-600 mt-1">{errors.github}</div>}
              {!errors.github && submission.github && (
                <div className="text-xs text-green-600 mt-1">✓ Valid URL</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Deployed URL
              </label>
              <input
                type="text"
                value={submission.deployment}
                onChange={(e) => handleSubmissionChange('deployment', e.target.value)}
                placeholder="https://prp.example.com or https://vercel.com/..."
                className={`w-full border rounded-md px-3 py-2 text-sm ${
                  errors.deployment ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.deployment && <div className="text-xs text-red-600 mt-1">{errors.deployment}</div>}
              {!errors.deployment && submission.deployment && (
                <div className="text-xs text-green-600 mt-1">✓ Valid URL</div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={copySubmission}
              disabled={!allLinksProvided}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                allLinksProvided
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Copy Final Submission
            </button>
            <div className="text-xs text-gray-500 text-center">
              Validates all URLs before copying. Copies formatted submission text.
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
