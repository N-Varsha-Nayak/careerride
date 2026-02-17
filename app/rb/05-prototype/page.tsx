import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step05Prototype() {
  return (
    <StepPageWrapper
      stepId="05-prototype"
      stepName="Build Prototype"
      stepTitle="Create Working Model"
      stepDescription="Build a minimum viable product or prototype. Focus on core functionality. Speed matters more than polish at this stage."
      nextStepId="/rb/06-refinement"
    />
  );
}
