import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step02Ideation() {
  return (
    <StepPageWrapper
      stepId="02-ideation"
      stepName="Brainstorm Ideas"
      stepTitle="Generate Solution Concepts"
      stepDescription="Brainstorm multiple approaches to solve the problem. Think creatively about different angles and methodologies. Quantity over quality at this stage."
      nextStepId="/rb/03-architecture"
    />
  );
}
