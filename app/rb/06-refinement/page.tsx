import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step06Refinement() {
  return (
    <StepPageWrapper
      stepId="06-refinement"
      stepName="Refine & Test"
      stepTitle="Polish and Validate"
      stepDescription="Refine the prototype based on testing and feedback. Improve user experience, fix bugs, and optimize for performance."
      nextStepId="/rb/07-launch"
    />
  );
}
