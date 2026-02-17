import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step04Validation() {
  return (
    <StepPageWrapper
      stepId="04-validation"
      stepName="Validate Solution"
      stepTitle="Test Assumptions"
      stepDescription="Validate your solution approach. Run tests, get feedback, and refine based on results. Does this actually solve the problem?"
      nextStepId="/rb/05-prototype"
    />
  );
}
