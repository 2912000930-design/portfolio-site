import { DemoPage } from "@/components/demo/demo-page";
import { getDemo } from "@/data/ai-demos";

export default function KnowledgeBasePage() {
  return <DemoPage demo={getDemo("knowledge-base")} />;
}
