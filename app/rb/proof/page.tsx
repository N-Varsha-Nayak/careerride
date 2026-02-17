'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useBuild } from '@/app/contexts/BuildContext';
import { useResume } from '@/app/contexts/ResumeContext';
import { validateURL } from '@/app/utils/validation';

interface FinalSubmissionProof {
  lovableProject: string;
  githubRepository: string;
  deployedUrl: string;
}

interface ChecklistTest {
  id: string;
  label: string;
  passed: boolean;
}

const PROOF_STORAGE_KEY = 'rb_final_submission';

const steps = [
  { id: '01-problem', label: 'Define Problem' },
  { id: '02-ideation', label: 'Brainstorm Ideas' },
  { id: '03-architecture', label: 'Design Architecture' },
  { id: '04-validation', label: 'Validate Solution' },
  { id: '05-prototype', label: 'Build Prototype' },
  { id: '06-refinement', label: 'Refine & Test' },
  { id: '07-launch', label: 'Go Live' },
  { id: '08-ship', label: 'Ship & Review' },
];

const emptyProof: FinalSubmissionProof = {
  lovableProject: '',
  githubRepository: '',
  deployedUrl: '',
};

function getChecklistTests(data: ReturnType<typeof useResume>['data']): ChecklistTest[] {
  const totalSkills =
    (data.skills?.technical?.length || 0) +
    (data.skills?.soft?.length || 0) +
    (data.skills?.tools?.length || 0);
  const summary = data.summary || '';
  const summaryLower = summary.toLowerCase();
  const actionVerbs = [
    'built',
    'led',
    'designed',
    'improved',
    'created',
    'developed',
    'launched',
    'optimized',
    'managed',
    'increased',
    'reduced',
    'implemented',
  ];
  const hasActionVerb = actionVerbs.some((verb) => summaryLower.includes(verb));
  const hasExperienceWithBullets = data.experience.some((exp) => {
    const desc = exp.description || '';
    return /\n|•|-|\u2022/.test(desc);
  });

  return [
    {
      id: 'name',
      label: 'Name provided',
      passed: Boolean(data.personalInfo?.name && data.personalInfo.name.trim().length > 0),
    },
    {
      id: 'email',
      label: 'Email provided',
      passed: Boolean(data.personalInfo?.email && data.personalInfo.email.trim().length > 0),
    },
    {
      id: 'summary-length',
      label: 'Summary is longer than 50 characters',
      passed: summary.trim().length > 50,
    },
    {
      id: 'summary-verbs',
      label: 'Summary contains action verbs',
      passed: hasActionVerb,
    },
    {
      id: 'experience',
      label: 'Experience includes bullet formatting',
      passed: hasExperienceWithBullets,
    },
    {
      id: 'education',
      label: 'At least one education entry',
      passed: data.education.length > 0,
    },
    {
      id: 'skills',
      label: 'At least five skills',
      passed: totalSkills >= 5,
    },
    {
      id: 'projects',
      label: 'At least one project',
      passed: data.projects.length > 0,
    },
    {
      id: 'phone',
      label: 'Phone number provided',
      passed: Boolean(data.personalInfo?.phone && data.personalInfo.phone.trim().length > 0),
    },
    {
      id: 'links',
      label: 'LinkedIn or GitHub link provided',
      passed: Boolean(
        (data.links?.linkedin && data.links.linkedin.trim().length > 0) ||
          (data.links?.github && data.links.github.trim().length > 0),
      ),
    },
  ];
}

export default function ProofPage() {
  const { state, getStepProgress, submitFinal } = useBuild();
  const { data } = useResume();
  const [proof, setProof] = useState<FinalSubmissionProof>(emptyProof);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROOF_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<FinalSubmissionProof>;
      setProof({
        lovableProject: parsed.lovableProject || '',
        githubRepository: parsed.githubRepository || '',
        deployedUrl: parsed.deployedUrl || '',
      });
    } catch (error) {
      console.error('Failed to restore final submission proof:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PROOF_STORAGE_KEY, JSON.stringify(proof));
  }, [proof]);

  const progress = getStepProgress();
  const stepStatuses = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        completed: state.completedSteps.has(step.id),
      })),
    [state.completedSteps],
  );
  const allStepsComplete = progress === 8;

  const checklistTests = useMemo(() => getChecklistTests(data), [data]);
  const passedChecklistTests = checklistTests.filter((test) => test.passed).length;
  const failedChecklistTests = checklistTests.filter((test) => !test.passed);
  const allChecklistTestsPassed = passedChecklistTests === 10;

  const proofValidation = useMemo(() => {
    return {
      lovableProject: validateURL(proof.lovableProject),
      githubRepository: validateURL(proof.githubRepository),
      deployedUrl: validateURL(proof.deployedUrl),
    };
  }, [proof]);

  const allProofLinksProvided =
    proofValidation.lovableProject &&
    proofValidation.githubRepository &&
    proofValidation.deployedUrl;

  const isShipped = allStepsComplete && allChecklistTestsPassed && allProofLinksProvided;

  useEffect(() => {
    if (isShipped && !state.finalSubmission.submittedAt) {
      submitFinal('Project 3 Shipped Successfully.');
    }
  }, [isShipped, state.finalSubmission.submittedAt, submitFinal]);

  const statusBadgeClass = isShipped
    ? 'bg-emerald-100 text-emerald-800'
    : 'bg-amber-100 text-amber-800';
  const statusLabel = isShipped ? 'Shipped' : 'In Progress';

  const copyFinalSubmission = async () => {
    const payload = [
      '------------------------------------------',
      'AI Resume Builder — Final Submission',
      '',
      `Lovable Project: ${proof.lovableProject || ''}`,
      `GitHub Repository: ${proof.githubRepository || ''}`,
      `Live Deployment: ${proof.deployedUrl || ''}`,
      '',
      'Core Capabilities:',
      '- Structured resume builder',
      '- Deterministic ATS scoring',
      '- Template switching',
      '- PDF export with clean formatting',
      '- Persistence + validation checklist',
      '------------------------------------------',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy final submission:', error);
    }
  };

  const handleProofChange = (field: keyof FinalSubmissionProof, value: string) => {
    setProof((prev) => ({ ...prev, [field]: value.trim() }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Proof & Artifacts</h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{progress}</div>
              <div className="text-xs text-gray-600">of 8 Complete</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass}`}>
              {statusLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl border border-gray-200 p-7">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Step Completion Overview</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {stepStatuses.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        step.completed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{step.label}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      step.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {step.completed ? 'Complete' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-7">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Artifact Collection</h2>
            <p className="text-sm text-gray-600 mb-6">
              Required before status can change to Shipped.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Lovable Project Link
                </label>
                <input
                  type="url"
                  value={proof.lovableProject}
                  onChange={(e) => handleProofChange('lovableProject', e.target.value)}
                  placeholder="https://lovable.dev/projects/..."
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    proof.lovableProject && !proofValidation.lovableProject
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-gray-200'
                  }`}
                />
                {proof.lovableProject && !proofValidation.lovableProject && (
                  <p className="mt-2 text-xs text-red-600">Enter a valid URL.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  GitHub Repository Link
                </label>
                <input
                  type="url"
                  value={proof.githubRepository}
                  onChange={(e) => handleProofChange('githubRepository', e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    proof.githubRepository && !proofValidation.githubRepository
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-gray-200'
                  }`}
                />
                {proof.githubRepository && !proofValidation.githubRepository && (
                  <p className="mt-2 text-xs text-red-600">Enter a valid URL.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Deployed URL</label>
                <input
                  type="url"
                  value={proof.deployedUrl}
                  onChange={(e) => handleProofChange('deployedUrl', e.target.value)}
                  placeholder="https://your-app.example.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    proof.deployedUrl && !proofValidation.deployedUrl
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-gray-200'
                  }`}
                />
                {proof.deployedUrl && !proofValidation.deployedUrl && (
                  <p className="mt-2 text-xs text-red-600">Enter a valid URL.</p>
                )}
              </div>
            </div>

            <div className="mt-7 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={copyFinalSubmission}
                className="px-5 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Copy Final Submission
              </button>
              {copied && <p className="mt-2 text-sm text-emerald-700">Copied to clipboard.</p>}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-28 space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Submission Gates</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Steps completed</span>
                <span className={`font-semibold ${allStepsComplete ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {progress}/8
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Checklist tests</span>
                <span
                  className={`font-semibold ${allChecklistTestsPassed ? 'text-emerald-700' : 'text-amber-700'}`}
                >
                  {passedChecklistTests}/10
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Proof links</span>
                <span className={`font-semibold ${allProofLinksProvided ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {allProofLinksProvided ? '3/3' : 'Incomplete'}
                </span>
              </div>
            </div>

            {failedChecklistTests.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-800 mb-2">Missing checklist items</p>
                <ul className="space-y-1">
                  {failedChecklistTests.map((test) => (
                    <li key={test.id} className="text-xs text-amber-700">
                      • {test.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
                {statusLabel}
              </div>
            </div>

            {isShipped && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-800 font-medium">Project 3 Shipped Successfully.</p>
              </div>
            )}

            {!isShipped && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-600">
                  Status remains In Progress until all 8 steps, all 10 checklist tests, and all 3 proof
                  links are complete.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
