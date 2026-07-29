import { CandidateConsole, KnowledgeWorkbench } from "@/components/demo/demo-layouts";
import type { DemoConfig } from "@/data/ai-demos";

type Props = {
  demo: DemoConfig;
};

export function DemoPage({ demo }: Props) {
  if (demo.id === "knowledge-base") {
    return <KnowledgeWorkbench demo={demo} />;
  }

  return <CandidateConsole demo={demo} />;
}
