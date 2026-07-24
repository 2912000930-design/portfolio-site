import { DemoPage } from "@/components/demo/demo-page";
import { getDemo } from "@/data/ai-demos";

export default function RecruitingAssistantPage() {
  return <DemoPage demo={getDemo("recruiting-assistant")} />;
}
