import {
  CandidateConsole,
  KnowledgeWorkbench,
  RecruitingDashboard,
} from "@/components/demo/demo-layouts";
import type { DemoConfig } from "@/data/ai-demos";

type Props = {
  demo: DemoConfig;
};

export function DemoPage({ demo }: Props) {
  if (demo.id === "interview-assistant") {
    return <CandidateConsole demo={demo} />;
  }

  if (demo.id === "knowledge-base") {
    return <KnowledgeWorkbench demo={demo} />;
  }

  return <RecruitingDashboard demo={demo} />;
}
