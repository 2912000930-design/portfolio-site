"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  ClipboardList,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  FolderOpen,
  Gauge,
  Globe2,
  Layers3,
  MessageSquareText,
  PanelRightOpen,
  RotateCcw,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  UploadCloud,
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
  const thirdSection = state.result.sections[2];
  const directoryGroups = [
    {
      title: "基础指南",
      items: ["PandaWiki 介绍", "快速上手", "接入 AI 模型", "版本升级"],
    },
    {
      title: "AI 问答机器人",
      items: ["DingTalk", "Feishu", "WeCom", "API 调用机器人"],
    },
    {
      title: "文档管理",
      items: ["创建新文档", "导入文档", "文档处理状态", "发布 Wiki 站点"],
    },
  ];
  const importPipelines = [
    ["URL Import", "12 pages", "已学习"],
    ["Sitemap", "84 nodes", "队列中"],
    ["RSS", "6 feeds", "同步中"],
    ["File Upload", "18 files", "已索引"],
  ];
  const analyticsRows = [
    ["如何接入 AI 模型", "192.168.0.81", "3 小时前"],
    ["支持给不同文档设置权限吗", "218.74.22.84", "4 小时前"],
    ["怎么导入产品 FAQ", "192.168.0.81", "5 小时前"],
  ];

  return (
    <main
      data-demo-layout="knowledge-workbench"
      data-knowledge-panel="pandawiki-shell"
      className="relative left-1/2 w-[calc(100vw-1rem)] -translate-x-1/2 overflow-hidden bg-[#f4f6fb] px-3 py-4 text-slate-950 sm:w-[calc(100vw-2rem)] sm:px-5"
    >
      <section className="mx-auto grid min-h-[calc(100dvh-2rem)] w-[min(1440px,calc(100vw-1.5rem))] gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="grid content-between gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-5">
            <div className="grid justify-items-center gap-3 border-b border-slate-100 pb-5">
              <div className="grid size-14 place-items-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
                PW
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">PandaWiki</p>
                <p className="text-xs text-slate-500">AI Knowledge Base</p>
              </div>
            </div>

            <nav className="grid gap-2">
              {[
                ["文档", "Docs", <BookOpenCheck key="docs" className="size-4" />],
                ["分析", "Analytics", <BarChart3 key="analytics" className="size-4" />],
                ["设置", "Settings", <Settings key="settings" className="size-4" />],
              ].map(([label, value, icon], index) => (
                <div
                  key={String(label)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors",
                    index === 0
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {icon}
                    <span className="font-medium">{label}</span>
                  </span>
                  <span className="text-xs opacity-70">{value}</span>
                </div>
              ))}
            </nav>
          </div>

          <div className="grid gap-3">
            {["官方网站", "帮助文档", "交流群"].map((item) => (
              <button
                key={item}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                type="button"
              >
                {item}
              </button>
            ))}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700">
              免费版 · v0.5.4
            </div>
          </div>
        </aside>

        <section className="grid gap-4">
          <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:text-slate-950"
                href="/#projects"
              >
                <ArrowLeft className="size-4" aria-hidden />
                My Projects
              </Link>
              <div className="hidden h-8 w-px bg-slate-200 md:block" />
              <div>
                <p className="text-sm font-semibold">{demo.title}</p>
                <p className="text-xs text-slate-500">
                  PandaWiki inspired enterprise knowledge base demo
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-600 text-white hover:bg-blue-600">
                AI Search
              </Badge>
              <Badge variant="outline">Public Wiki</Badge>
              <Button className="h-10 rounded-xl bg-slate-950 px-4 text-white hover:bg-slate-800">
                创建文档
              </Button>
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_420px]">
            <div className="grid gap-4">
              <section
                data-knowledge-panel="wiki-portal"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative grid min-h-[360px] content-center gap-7 border-b border-slate-100 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-10 text-center">
                  <div className="mx-auto grid max-w-3xl gap-4">
                    <Badge className="mx-auto w-fit bg-slate-950 text-white hover:bg-slate-950">
                      PandaWiki Portal
                    </Badge>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                      欢迎使用企业 AI 知识库
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      汇集产品文档、技术文档、FAQ 和客服 SOP，用 AI Q&A 与 AI Search 帮团队快速找到可信答案。
                    </p>
                  </div>

                  <div className="mx-auto grid w-full max-w-3xl gap-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
                      <Search className="size-5 text-slate-400" aria-hidden />
                      <span className="min-w-0 flex-1 text-sm text-slate-400">
                        Search docs or ask: {state.primary}
                      </span>
                      <Badge variant="outline">AI</Badge>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["如何配置 HTTPS", "PandaWiki 会消耗多少 Token", "如何接入飞书机器人"].map(
                        (item) => (
                          <button
                            key={item}
                            className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                            type="button"
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
                  {[
                    ["PandaWiki 介绍", "面向企业的 AI 知识库搭建系统，支持文档门户、AI 问答和搜索。"],
                    ["快速上手", "从安装、创建知识库、配置模型到发布 Wiki 站点的完整流程。"],
                    ["接入百智云在线模型", "配置模型供应商、Token、推荐模型和调用限额。"],
                    ["演示 Demo", "包含管理员账号、知识库地址、前台站点和自动重置数据。"],
                    ["基础指南", "安装 PandaWiki、升级、权限、HTTPS、文档管理。"],
                    ["AI 问答机器人", "接入 DingTalk、Feishu、WeCom，也支持 API 调用。"],
                  ].map(([title, text], index) => (
                    <article
                      key={title}
                      className="grid min-h-40 content-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                          {index % 2 === 0 ? (
                            <FileText className="size-4 text-blue-600" aria-hidden />
                          ) : (
                            <FolderOpen className="size-4 text-amber-500" aria-hidden />
                          )}
                          <h2 className="text-base font-semibold">{title}</h2>
                        </div>
                        <p className="text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                      <span className="justify-self-end text-xs font-medium text-blue-600">
                        查看详情
                      </span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <PanelHeading
                      icon={<FolderOpen className="size-4 text-blue-600" aria-hidden />}
                      title="目录 / 文档"
                    />
                    <Badge variant="outline">124 docs</Badge>
                  </div>
                  <div className="grid gap-3">
                    {directoryGroups.map((group) => (
                      <div key={group.title} className="grid gap-2">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <FolderOpen className="size-4 text-amber-500" aria-hidden />
                          {group.title}
                        </div>
                        <div className="grid gap-1.5 pl-6">
                          {group.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between border-b border-dashed border-slate-200 py-2 text-sm"
                            >
                              <span className="flex items-center gap-2 text-slate-700">
                                <FileText className="size-4 text-blue-500" aria-hidden />
                                {item}
                              </span>
                              <span className="text-xs text-slate-400">3 小时前</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside
                  data-knowledge-panel="source-import"
                  className="grid content-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <PanelHeading
                    icon={<UploadCloud className="size-4 text-emerald-600" aria-hidden />}
                    title="多来源导入"
                  />
                  <p className="text-xs leading-6 text-slate-500">
                    支持通过网页 URL、Sitemap、RSS 和离线文件导入内容，并自动进入学习队列。
                  </p>
                  {importPipelines.map(([type, count, status]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium">{type}</span>
                      <span className="text-xs text-slate-500">
                        {count} · {status}
                      </span>
                    </div>
                  ))}
                  <Progress label="Embedding progress" value="92%" />
                  <Progress label="Citation coverage" value="100%" />
                </aside>
              </section>
            </div>

            <aside className="grid gap-4">
              <section
                data-knowledge-panel="ai-qa-modal"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div className="flex gap-2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600">
                      AI Q&A
                    </Badge>
                    <Badge variant="outline">仅搜索文档</Badge>
                  </div>
                  <Badge variant="secondary">Esc</Badge>
                </div>
                <div className="grid gap-4 p-4">
                  <div className="justify-self-end rounded-xl bg-blue-600 px-4 py-2 text-sm text-white">
                    {state.primary}
                  </div>

                  <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <PanelHeading
                        icon={<Sparkles className="size-4 text-blue-600" aria-hidden />}
                        title="正在回答"
                      />
                      <span className="text-xs text-slate-500">共找到 5 个结果</span>
                    </div>
                    <p className="text-sm leading-7 text-slate-700">
                      {state.result.summary}
                    </p>
                    <div className="grid gap-3">
                      <SectionList section={firstSection} />
                      <SectionList section={secondSection} />
                    </div>
                    <SourceStrip sources={state.result.sources} />
                  </div>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">{demo.primaryLabel}</span>
                    <textarea
                      className="min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed outline-none transition focus-visible:ring-1 focus-visible:ring-blue-500"
                      onChange={(event) => state.setPrimary(event.target.value)}
                      placeholder={demo.primaryPlaceholder}
                      value={state.primary}
                    />
                  </label>
                  <SampleBar demo={demo} onSelect={state.useSample} />
                  <ActionRow onReset={state.resetDemo} onRun={state.runDemo} />
                </div>
              </section>

              <section
                data-knowledge-panel="model-config"
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <PanelHeading
                    icon={<Database className="size-4 text-violet-600" aria-hidden />}
                    title="模型配置"
                  />
                  <Badge variant="outline">Baizhi Cloud</Badge>
                </div>
                <Progress label="Chat model" value="gpt-4.1-mini" />
                <Progress label="Embedding model" value="text-embedding-3" />
                <Progress label="Token budget" value="68%" />
              </section>

              <section
                data-knowledge-panel="analytics"
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <PanelHeading
                    icon={<Gauge className="size-4 text-amber-600" aria-hidden />}
                    title="访问分析"
                  />
                  <Badge variant="secondary">124 questions</Badge>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {analyticsRows.map(([question, client, time]) => (
                    <div
                      key={`${question}-${time}`}
                      className="grid grid-cols-[1fr_auto] gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0"
                    >
                      <span className="text-xs font-medium text-slate-700">
                        {question}
                      </span>
                      <span className="text-xs text-slate-400">{time}</span>
                      <span className="text-[11px] text-slate-400">{client}</span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>

          <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_1fr_1fr]">
            <div className="grid gap-2">
              <PanelHeading
                icon={<Globe2 className="size-4 text-blue-600" aria-hidden />}
                title="发布渠道"
              />
              <p className="text-sm leading-6 text-slate-600">
                Wiki 网站可嵌入官网，也能同步到 DingTalk、Feishu、WeCom 机器人。
              </p>
            </div>
            <div className="grid gap-2">
              <PanelHeading
                icon={<Layers3 className="size-4 text-emerald-600" aria-hidden />}
                title="学习状态"
              />
              <Progress label="Docs indexed" value="118 / 124" />
              <Progress label="Failed chunks" value="0" />
            </div>
            <div className="grid gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <PanelHeading
                icon={<ShieldAlert className="size-4 text-amber-700" aria-hidden />}
                title="人工确认边界"
              />
              <p className="text-xs leading-6 text-amber-800">
                {state.result.caution ??
                  "涉及退款、法务、权限变更等敏感动作时，只给建议并要求人工确认。"}
              </p>
              <SectionList section={thirdSection} />
            </div>
          </section>
        </section>
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
