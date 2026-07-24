import { InterviewLanding } from "@/components/demo/interview-landing";
import { getDemo } from "@/data/ai-demos";

export default function InterviewAssistantPage() {
  return <InterviewLanding demo={getDemo("interview-assistant")} />;
}
