import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTestChecklistStatus } from './TestChecklist';
import { getProofStatus, getStepsCompleted } from './ProofPage';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const TOTAL_TESTS = 10;
const TOTAL_STEPS = 8;

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

export default function ShipPage() {
  const router = useRouter();
  const testStatus = getTestChecklistStatus();
  const proof = getProofStatus();
  const steps = getStepsCompleted();

  const testsPassingCount = Object.values(testStatus).filter(Boolean).length;
  const allTestsPassed = testsPassingCount === TOTAL_TESTS;
  const stepsCompletedCount = Object.values(steps).filter(Boolean).length;
  const allStepsCompleted = stepsCompletedCount === TOTAL_STEPS;
  const allLinksProvided = proof.lovable.trim() && proof.github.trim() && proof.deployment.trim();
  const allLinksValid = allLinksProvided && isValidUrl(proof.lovable) && isValidUrl(proof.github) && isValidUrl(proof.deployment);
  const isShipped = allStepsCompleted && allTestsPassed && allLinksValid;

  useEffect(() => {
    if (!allTestsPassed) {
      router.replace('/dashboard/prep/test');
    }
  }, [allTestsPassed, router]);

  if (!allTestsPassed) {
    return null;
  }

  return (
    <div className="app-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Deployment & Shipping</h1>
        <p className="text-sm text-gray-600 mt-1">Ready to deploy the Placement Readiness Platform.</p>
      </div>

      {isShipped && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg px-6 py-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-700 mb-3">SHIPPED</div>
            <p className="text-green-700 text-base mb-4 leading-relaxed">
              You built a real product.<br />
              Not a tutorial. Not a clone.<br />
              A structured tool that solves a real problem.
            </p>
            <p className="text-green-600 font-semibold text-sm">This is your proof of work.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pre-Ship Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${allTestsPassed ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'} px-4 py-3 rounded-md text-sm mb-4`}>
              {allTestsPassed ? 'Done' : 'Pending'} All 10 quality tests passed ({testsPassingCount}/10)
            </div>
            <div className={`${allStepsCompleted ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'} px-4 py-3 rounded-md text-sm mb-4`}>
              {allStepsCompleted ? 'Done' : 'Pending'} All 8 development steps completed ({stepsCompletedCount}/8)
            </div>
            <div className={`${allLinksValid ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'} px-4 py-3 rounded-md text-sm mb-4`}>
              {allLinksValid ? 'Done' : 'Pending'} All 3 proof links provided and valid
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong className="block text-gray-900">Platform:</strong>
                Placement Readiness Platform (KodNest)
              </div>
              <div>
                <strong className="block text-gray-900">Status:</strong>
                <span className={`font-semibold ${isShipped ? 'text-green-700' : 'text-yellow-700'}`}>
                  {isShipped ? 'SHIPPED' : 'IN PROGRESS'}
                </span>
              </div>
              <div>
                <strong className="block text-gray-900">Local Data:</strong>
                localStorage (offline-first, no external APIs)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}