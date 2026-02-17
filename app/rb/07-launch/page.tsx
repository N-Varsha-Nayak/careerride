import { StepPageWrapper } from '@/app/components/StepPageWrapper';

export default function Step07Launch() {
  return (
    <StepPageWrapper
      stepId="07-launch"
      stepName="Go Live"
      stepTitle="Release to Market"
      stepDescription="Launch your solution to the target audience. Monitor performance, gather feedback, and be ready to respond quickly to issues."
      nextStepId="/rb/08-ship"
    />
  );
}
