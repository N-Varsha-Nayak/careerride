import { useEffect, useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';

const TESTS = [
  { id: 'jd-validation', label: 'JD required validation works', hint: 'Go to Resources > Analyze. Try clicking Analyze with empty JD. Should show red error.' },
  { id: 'short-jd-warning', label: 'Short JD warning shows for <200 chars', hint: 'Resources > Analyze. Paste a JD under 200 chars. Should show yellow warning below textarea.' },
  { id: 'skills-extraction', label: 'Skills extraction groups correctly', hint: 'Analyze a JD with "React", "Python", "AWS", "Docker". Check Results > Detected Skills shows them in correct categories.' },
  { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Analyze with company="Google" (Enterprise) vs no company (Startup). Results should show different round flows.' },
  { id: 'score-deterministic', label: 'Score calculation is deterministic', hint: 'Analyze same JD twice. baseScore should be identical both times. (Verify in localStorage with dev console.)' },
  { id: 'skill-toggle-score', label: 'Skill toggles update score live', hint: 'Results view: toggle a skill from "Need practice" to "I know". Readiness Score should increase by 2.' },
  { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh the page, open History > same item. Toggle should still be there.' },
  { id: 'history-load', label: 'History saves and loads correctly', hint: 'Create multiple analyses (Resources > Analyze multiple times). History tab should show all. Inspect localStorage `placement_history_v1`.' },
  { id: 'export-content', label: 'Export buttons copy the correct content', hint: 'Results: click "Copy 7-day plan". Paste in a text editor. Should match the rendered plan.' },
  { id: 'no-console-errors', label: 'No console errors on core pages', hint: 'Visit Dashboard, Practice, Resources, Assessments, Profile. Open browser DevTools > Console. Should be clean.' },
];

const STORAGE_KEY = 'prp_test_checklist_v1';

export function getTestChecklistStatus() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    return {};
  }
}

export function setTestChecklistStatus(status) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
}

export default function TestChecklist() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    setStatus(getTestChecklistStatus());
  }, []);

  function toggleTest(id) {
    const updated = { ...status, [id]: !status[id] };
    setStatus(updated);
    setTestChecklistStatus(updated);
  }

  function resetChecklist() {
    if (window.confirm('Reset all test items? This cannot be undone.')) {
      setStatus({});
      setTestChecklistStatus({});
    }
  }

  const passed = Object.values(status).filter(Boolean).length;
  const total = TESTS.length;
  const allPassed = passed === total;

  return (
    <div className="app-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Test Checklist</h1>
        <p className="text-sm text-gray-600 mt-1">Complete all tests before shipping the Placement Readiness Platform.</p>
      </div>

      {/* Summary Card */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">{passed}</div>
              <div className="text-sm text-gray-600 mt-1">Tests Passed</div>
              <div className="text-sm text-gray-500 mt-1">out of {total}</div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              {allPassed ? (
                <div className="text-green-700 bg-green-50 px-4 py-3 rounded-md text-sm">
                  ✓ All tests passed! Ready to ship.
                </div>
              ) : (
                <div className="text-yellow-700 bg-yellow-50 px-4 py-3 rounded-md text-sm">
                  ⚠ {total - passed} tests remaining. Fix issues before shipping.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {TESTS.map((test) => {
              const isChecked = status[test.id] || false;
              return (
                <div key={test.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTest(test.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${
                          isChecked ? 'text-green-700 line-through' : 'text-gray-900'
                        }`}
                      >
                        {test.label}
                      </div>
                      {test.hint && (
                        <div className="text-xs text-gray-600 mt-2">
                          <strong>How to test:</strong> {test.hint}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={resetChecklist}
              className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
            >
              Reset checklist
            </button>
            <div className="text-xs text-gray-500 text-center">
              Checklist persists in localStorage. Reload the page to verify data persistence.
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
