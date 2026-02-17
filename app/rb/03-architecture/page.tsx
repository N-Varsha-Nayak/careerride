import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step03Architecture() {
  return (
    <StepPageWrapper
      stepId="03-architecture"
      stepName="Design Architecture"
      stepTitle="Plan the Solution Structure"
      stepDescription="Design the technical architecture. How will the solution be built? What components, systems, and workflows are needed?"
      nextStepId="/rb/04-validation"
    />
  );
}
