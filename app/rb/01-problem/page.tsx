import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step01Problem() {
  return (
    <StepPageWrapper
      stepId="01-problem"
      stepName="Define Problem"
      stepTitle="Identify the Core Problem"
      stepDescription="Start by clearly defining the problem your project will solve. What's the pain point? Who experiences it? What's the impact?"
      nextStepId="/rb/02-ideation"
    />
  );
}
