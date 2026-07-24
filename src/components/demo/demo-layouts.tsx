"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FileSearch,
  Gauge,
  MessageSquareText,
  PanelRightOpen,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DemoConfig, DemoResult } from "@/data/ai-demos";
import { generateDemoResult } from "@/data/ai-demos";
import { cn } from "@/lib/utils";

type DemoLayoutProps = {
  demo: DemoConfig;
};

type DemoState = {
  primary: string;
  secondary: string;
  result: DemoResult;
  setPrimary: (value: string) => void;
  setSecondary: (value: string) => void;
  runDemo: () => void;
  resetDemo: () => void;
  useSample: (index: number) => void;
};

function useDemoState(demo: DemoConfig): DemoState {
  const [primary, setPrimary] = useState(demo.defaultPrimary);
  const [secondary, setSecondary] = useState(demo.defaultSecondary ?? "");
  const [result, setResult] = useState<DemoResult>(() =>
    generateDemoResult(demo.id, demo.defaultPrimary, demo.defaultSecondary)
  );

  function runDemo() {
    setResult(generateDemoResult(demo.id, primary, secondary));
  }

  function resetDemo() {
    setPrimary(demo.defaultPrimary);
    setSecondary(demo.defaultSecondary ?? "");
    setResult(
      generateDemoResult(demo.id, demo.defaultPrimary, demo.defaultSecondary)
    );
  }

  function useSample(index: number) {
    const sample = demo.samples[index];

    setPrimary(sample.primary);
    setSecondary(sample.secondary ?? "");
    setResult(generateDemoResult(demo.id, sample.primary, sample.secondary));
  }

  return {
    primary,
    secondary,
    result,
    setPrimary,
    setSecondary,
    runDemo,
    resetDemo,
    useSample,
  };
}

export function CandidateConsole({ demo }: DemoLayoutProps) {
  const state = useDemoState(demo);
  const firstSection = state.result.sections[0];
  const secondSection = state.result.sections[1];
  const transcriptLines = [
    ["09:41", "面试官正在追问你做过的 AI Demo 是否解决真实问题"],
    ["09:42", "识别到关键词：RAG、招聘助手、评估闭环"],
    ["09:42", "建议回答：先讲业务痛点，再讲产品边界和验证方式"],
  ];

  return (
    <main
      data-demo-layout="candidate-console"
      className="relative left-1/2 grid w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 gap-5"
    >
      <DemoTopbar
        accent="from-sky-500/15 via-background to-emerald-500/10"
        badge="AI Interview Copilot"
        description="一个面向求职者的 AI 面试工作台：面试前训练，面试中实时提示，面试后复盘，把简历、题库和岗位要求连接起来。"
        icon={<UserRound className="size-4" aria-hidden />}
        title={demo.title}
      />

      <section className="overflow-hidden rounded-lg border bg-background shadow-sm">
        <div className="flex flex-col gap-3 border-b bg-muted/25 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg border bg-card text-sm font-semibold shadow-sm">
              AI
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">面试训练舱</p>
              <p className="text-xs text-muted-foreground">
                AI PM / AIGC 产品 / RAG 应用方向
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs sm:flex sm:flex-wrap">
            <InterviewSignal label="今日训练" value="4 轮" />
            <InterviewSignal label="题库覆盖" value="82%" />
            <InterviewSignal label="实时模式" value="开启" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="grid content-start gap-4 border-b bg-muted/10 p-4 lg:border-b-0 lg:border-r">
            <div className="grid gap-2">
              <InterviewNavItem
                active
                icon={<MessageSquareText className="size-4" aria-hidden />}
                label="实时辅助"
                value="Live"
              />
              <InterviewNavItem
                icon={<Bot className="size-4" aria-hidden />}
                label="模拟面试"
                value="Mock"
              />
              <InterviewNavItem
                icon={<FileCheck2 className="size-4" aria-hidden />}
                label="简历知识库"
                value="Resume"
              />
              <InterviewNavItem
                icon={<ClipboardList className="size-4" aria-hidden />}
                label="面试题库"
                value="Bank"
              />
            </div>

            <div className="grid gap-2 rounded-lg border bg-background p-3">
              <p className="text-xs font-medium text-muted-foreground">
                候选人画像
              </p>
              <Metric label="岗位匹配" value="AI PM" />
              <Metric label="项目证据" value="3 demos" />
              <Metric label="表达策略" value="STAR + 证据" />
            </div>

            <div className="grid gap-2">
              <p className="text-xs font-medium text-muted-foreground">能力标签</p>
              <div className="flex flex-wrap gap-1.5">
                {["RAG", "Prompt", "产品拆解", "评估闭环"].map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-4 p-4">
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div data-interview-panel="live-assist">
                <InterviewFeatureCard
                  icon={<MessageSquareText className="size-4" aria-hidden />}
                  label="Live Assist"
                  title="实时面试辅助"
                  text="识别面试官问题，生成回答框架、追问预判和项目证据。"
                />
              </div>
              <div data-interview-panel="mock-interview">
                <InterviewFeatureCard
                  icon={<Bot className="size-4" aria-hidden />}
                  label="Mock"
                  title="模拟面试训练"
                  text="按岗位、轮次和难度生成面试题，支持行为面和产品面。"
                />
              </div>
              <div data-interview-panel="resume-knowledge">
                <InterviewFeatureCard
                  icon={<FileCheck2 className="size-4" aria-hidden />}
                  label="Context"
                  title="简历知识库"
                  text="把简历、项目、作品集和岗位偏好作为回答上下文。"
                />
              </div>
              <div data-interview-panel="question-bank">
                <InterviewFeatureCard
                  icon={<ClipboardList className="size-4" aria-hidden />}
                  label="Bank"
                  title="面试题库"
                  text="沉淀高频问题、追问链路和可复用答案结构。"
                />
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_340px]">
              <div className="grid gap-4">
                <section
                  data-interview-panel="floating-hint"
                  className="overflow-hidden rounded-lg border bg-card shadow-sm"
                >
                  <div className="flex flex-col gap-3 border-b bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <PanelHeading
                      icon={<PanelRightOpen className="size-4" aria-hidden />}
                      title="面试中悬浮提示"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">语音识别</Badge>
                      <Badge variant="outline">隐身提示</Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="grid gap-4">
                      <SampleBar demo={demo} onSelect={state.useSample} />

                      <label className="grid gap-2">
                        <span className="text-sm font-medium">
                          {demo.primaryLabel}
                        </span>
                        <textarea
                          className="min-h-32 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
                          onChange={(event) => state.setPrimary(event.target.value)}
                          placeholder={demo.primaryPlaceholder}
                          value={state.primary}
                        />
                      </label>

                      <ActionRow onReset={state.resetDemo} onRun={state.runDemo} />

                      <div className="grid gap-3">
                        <ChatBubble
                          label="面试官"
                          text={state.primary}
                          tone="muted"
                        />
                        <ChatBubble
                          label="AI 回答建议"
                          text={state.result.summary}
                        />
                      </div>
                    </div>

                    <aside className="grid content-start gap-3 rounded-lg border bg-background p-3">
                      <div className="flex items-center justify-between gap-3">
                        <PanelHeading
                          icon={<Sparkles className="size-4" aria-hidden />}
                          title="实时信号"
                        />
                        <Badge variant="outline">00:38</Badge>
                      </div>
                      <div className="grid gap-2">
                        {transcriptLines.map(([time, text]) => (
                          <TranscriptRow
                            key={`${time}-${text}`}
                            time={time}
                            text={text}
                          />
                        ))}
                      </div>
                      <div className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-2">
                        <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                          回答结构
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          结论先行 → 项目证据 → 指标/反馈 → 风险边界
                        </p>
                      </div>
                    </aside>
                  </div>
                </section>

                <section className="grid gap-3 md:grid-cols-3">
                  <InterviewMiniPanel
                    icon={<BadgeCheck className="size-4" aria-hidden />}
                    label="岗位匹配"
                    text="将回答自动对齐 AI 产品、RAG 应用、招聘场景关键词。"
                  />
                  <InterviewMiniPanel
                    icon={<ShieldAlert className="size-4" aria-hidden />}
                    label="风险提醒"
                    text="提示缺少线上数据、评估样本、权限边界等可追问点。"
                  />
                  <InterviewMiniPanel
                    icon={<BookOpenCheck className="size-4" aria-hidden />}
                    label="训练闭环"
                    text="把本轮问题沉淀到题库，下一轮生成更贴近岗位的追问。"
                  />
                </section>
              </div>

              <aside className="grid content-start gap-4">
                <section
                  data-interview-panel="review-report"
                  className="rounded-lg border bg-background p-4 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <PanelHeading
                      icon={<Gauge className="size-4" aria-hidden />}
                      title="面试复盘报告"
                    />
                    <Badge variant="secondary">After-call</Badge>
                  </div>
                  <div className="grid gap-3">
                    <ReviewScore label="表达清晰度" value="86%" />
                    <ReviewScore label="证据完整度" value="78%" />
                    <ReviewScore label="岗位相关度" value="91%" />
                  </div>
                  <p className="mt-4 rounded-md border bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                    下一轮建议优先补充真实用户反馈、上线指标和失败案例复盘。
                  </p>
                </section>

                <section className="grid gap-3 rounded-lg border bg-background p-4 shadow-sm">
                  <PanelHeading
                    icon={<MessageSquareText className="size-4" aria-hidden />}
                    title="追问建议"
                  />
                  <SectionList section={firstSection} />
                  <SectionList section={secondSection} />
                  <SourceStrip sources={state.result.sources} />
                </section>
              </aside>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export function KnowledgeWorkbench({ demo }: DemoLayoutProps) {
  const state = useDemoState(demo);
  const firstSection = state.result.sections[0];
  const secondSection = state.result.sections[1];

  return (
    <main
      data-demo-layout="knowledge-workbench"
      className="relative left-1/2 grid w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 gap-5"
    >
      <DemoTopbar
        accent="from-emerald-500/15 via-background to-amber-500/10"
        badge="Knowledge ops"
        description="一个面向客服和业务团队的 RAG 工作台：先检索文档，再给出可追溯答案。"
        icon={<BookOpenCheck className="size-4" aria-hidden />}
        title={demo.title}
      />

      <section className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_280px]">
        <aside className="rounded-lg border bg-background p-4 shadow-sm">
          <PanelHeading
            icon={<FileSearch className="size-4" aria-hidden />}
            title="知识库文档"
          />
          <div className="mt-4 grid gap-2">
            {[
              ["售后政策", "七天无理由、拆封审核"],
              ["会员权益 FAQ", "优惠券、活动叠加"],
              ["客服 SOP", "投诉、物流异常、升级"],
              ["产品手册", "品类、规格、注意事项"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-md border bg-muted/40 px-3 py-2"
              >
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-lg border bg-card shadow-sm">
          <div className="border-b bg-muted/40 p-4">
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <span className="text-sm text-muted-foreground">
                Ask policy, FAQ, SOP, product docs...
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-4">
            <SampleBar demo={demo} onSelect={state.useSample} />

            <label className="grid gap-2">
              <span className="text-sm font-medium">{demo.primaryLabel}</span>
              <textarea
                className="min-h-32 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => state.setPrimary(event.target.value)}
                placeholder={demo.primaryPlaceholder}
                value={state.primary}
              />
            </label>

            <ActionRow onReset={state.resetDemo} onRun={state.runDemo} />

            <div className="rounded-lg border bg-background p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <PanelHeading
                  icon={<Bot className="size-4" aria-hidden />}
                  title="RAG Answer"
                />
                <Badge variant="secondary">带引用</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {state.result.summary}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SectionList section={firstSection} />
                <SectionList section={secondSection} />
              </div>
            </div>
          </div>
        </section>

        <aside className="grid content-start gap-3 rounded-lg border bg-background p-4 shadow-sm">
          <PanelHeading
            icon={<FileCheck2 className="size-4" aria-hidden />}
            title="引用与边界"
          />
          <SourceStrip sources={state.result.sources} />
          {state.result.caution ? (
            <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                <ShieldAlert className="size-4" aria-hidden />
                人工确认
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {state.result.caution}
              </p>
            </div>
          ) : null}
          <div className="grid gap-2 rounded-md border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              检索状态
            </p>
            <Progress label="Top-K recall" value="86%" />
            <Progress label="Citation coverage" value="100%" />
            <Progress label="Escalation risk" value="Medium" />
          </div>
        </aside>
      </section>
    </main>
  );
}

export function RecruitingDashboard({ demo }: DemoLayoutProps) {
  const state = useDemoState(demo);
  const strongMatch = state.result.sections[0];
  const risks = state.result.sections[1];
  const questions = state.result.sections[2];

  return (
    <main
      data-demo-layout="recruiting-dashboard"
      className="relative left-1/2 grid w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 gap-5"
    >
      <DemoTopbar
        accent="from-violet-500/15 via-background to-cyan-500/10"
        badge="Recruiting intelligence"
        description="把 JD 与简历变成结构化对比，帮助 HR 更快准备面试，而不是自动决定录用。"
        icon={<BriefcaseBusiness className="size-4" aria-hidden />}
        title={demo.title}
      />

      <section className="grid gap-3 sm:grid-cols-4">
        <StatCard
          icon={<Gauge className="size-4" />}
          label="综合匹配"
          value={state.result.score ?? "82/100"}
        />
        <StatCard
          icon={<BadgeCheck className="size-4" />}
          label="强证据"
          value={`${strongMatch?.items.length ?? 0} 项`}
        />
        <StatCard
          icon={<ShieldAlert className="size-4" />}
          label="风险点"
          value={`${risks?.items.length ?? 0} 项`}
        />
        <StatCard
          icon={<ClipboardList className="size-4" />}
          label="面试题"
          value={`${questions?.items.length ?? 0} 个`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <PanelHeading
                icon={<UsersRound className="size-4" aria-hidden />}
                title="JD / 简历输入"
              />
              <Badge variant="outline">Human-in-the-loop</Badge>
            </div>

            <SampleBar demo={demo} onSelect={state.useSample} />

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium">{demo.primaryLabel}</span>
                <textarea
                  className="min-h-48 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
                  onChange={(event) => state.setPrimary(event.target.value)}
                  placeholder={demo.primaryPlaceholder}
                  value={state.primary}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  {demo.secondaryLabel}
                </span>
                <textarea
                  className="min-h-48 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
                  onChange={(event) => state.setSecondary(event.target.value)}
                  placeholder={demo.secondaryPlaceholder}
                  value={state.secondary}
                />
              </label>
            </div>

            <div className="mt-4">
              <ActionRow onReset={state.resetDemo} onRun={state.runDemo} />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <AnalysisColumn
              icon={<CheckCircle2 className="size-4" />}
              section={strongMatch}
            />
            <AnalysisColumn
              icon={<ShieldAlert className="size-4" />}
              section={risks}
            />
            <AnalysisColumn
              icon={<MessageSquareText className="size-4" />}
              section={questions}
            />
          </div>
        </div>

        <aside className="grid content-start gap-3 rounded-lg border bg-background p-4 shadow-sm">
          <PanelHeading
            icon={<Sparkles className="size-4" aria-hidden />}
            title="AI 初筛摘要"
          />
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {state.result.summary}
            </p>
          </div>
          <Progress label="岗位技能覆盖" value="High" />
          <Progress label="项目证据强度" value="Medium+" />
          <Progress label="决策自动化" value="Blocked" />
          <SourceStrip sources={state.result.sources} />
          {state.result.caution ? (
            <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {state.result.caution}
            </p>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

function DemoTopbar({
  accent,
  badge,
  description,
  icon,
  title,
}: {
  accent: string;
  badge: string;
  description: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section className={cn("rounded-lg border bg-linear-to-br p-5 shadow-sm", accent)}>
      <Link
        className="mb-5 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        href="/#projects"
      >
        <ArrowLeft className="size-4" aria-hidden />
        返回 My Projects
      </Link>
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="gap-1.5" variant="secondary">
            {icon}
            {badge}
          </Badge>
          <Badge variant="outline">Interactive Demo</Badge>
        </div>
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

function SampleBar({
  demo,
  onSelect,
}: {
  demo: DemoConfig;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {demo.samples.map((sample, index) => (
        <button
          key={sample.label}
          className="h-8 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          onClick={() => onSelect(index)}
          type="button"
        >
          {sample.label}
        </button>
      ))}
    </div>
  );
}

function ActionRow({
  onReset,
  onRun,
}: {
  onReset: () => void;
  onRun: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button className="gap-2" onClick={onRun} type="button">
        生成分析
        <ArrowRight className="size-4" aria-hidden />
      </Button>
      <Button className="gap-2" onClick={onReset} type="button" variant="outline">
        <RotateCcw className="size-4" aria-hidden />
        重置样例
      </Button>
    </div>
  );
}

function PanelHeading({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      {icon}
      {title}
    </div>
  );
}

function InterviewNavItem({
  active = false,
  icon,
  label,
  value,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm",
        active ? "border-sky-500/40 bg-sky-500/10" : "bg-background"
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="truncate font-medium">{label}</span>
      </span>
      <span className="text-xs text-muted-foreground">{value}</span>
    </div>
  );
}

function InterviewSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background px-3 py-2 text-center shadow-sm sm:min-w-24">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function InterviewFeatureCard({
  icon,
  label,
  text,
  title,
}: {
  icon: ReactNode;
  label: string;
  text: string;
  title: string;
}) {
  return (
    <div className="grid h-full gap-3 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-sky-500/40">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-9 place-items-center rounded-md border bg-background text-muted-foreground">
          {icon}
        </span>
        <Badge variant="outline">{label}</Badge>
      </div>
      <div className="grid gap-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function InterviewMiniPanel({
  icon,
  label,
  text,
}: {
  icon: ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <PanelHeading icon={icon} title={label} />
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function TranscriptRow({ time, text }: { time: string; text: string }) {
  return (
    <div className="grid gap-1 rounded-md bg-muted/35 px-3 py-2">
      <span className="text-[11px] font-medium text-muted-foreground">{time}</span>
      <span className="text-xs leading-relaxed text-foreground">{text}</span>
    </div>
  );
}

function ReviewScore({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-sky-500" style={{ width: value }} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function ChatBubble({
  label,
  text,
  tone = "default",
}: {
  label: string;
  text: string;
  tone?: "default" | "muted";
}) {
  return (
    <div
      className={cn(
        "grid gap-1 rounded-lg border px-3 py-2",
        tone === "muted" ? "bg-muted/40" : "bg-background"
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

function SectionList({ section }: { section?: DemoResult["sections"][number] }) {
  if (!section) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-semibold">{section.title}</h3>
      <ul className="grid gap-2">
        {section.items.map((item) => (
          <li
            key={item}
            className="rounded-md border bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalysisColumn({
  icon,
  section,
}: {
  icon: ReactNode;
  section?: DemoResult["sections"][number];
}) {
  if (!section) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <PanelHeading icon={icon} title={section.title} />
      <ul className="mt-3 grid gap-2">
        {section.items.map((item) => (
          <li
            key={item}
            className="rounded-md bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourceStrip({ sources }: { sources: string[] }) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <p className="text-xs font-medium text-muted-foreground">来源 / 证据</p>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <Badge key={source} variant="outline">
            {source}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border bg-background px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}
