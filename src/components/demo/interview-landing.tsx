import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  MessageSquareText,
  Mic2,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DemoConfig } from "@/data/ai-demos";
import { cn } from "@/lib/utils";

type InterviewLandingProps = {
  demo: DemoConfig;
};

const loginHref = "/demos/interview-assistant/login";
const appHref = "/demos/interview-assistant/app";

export function InterviewLanding({ demo }: InterviewLandingProps) {
  return (
    <main
      data-interview-landing="gank-style"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#f7f8fb] text-slate-950"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_38%),linear-gradient(180deg,#ffffff_0%,#f7f8fb_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <section className="relative mx-auto flex min-h-screen w-[min(1180px,calc(100vw-2rem))] flex-col">
        <header className="flex items-center justify-between gap-4 py-5">
          <Link
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950"
            href="/#projects"
          >
            <ArrowLeft className="size-4" aria-hidden />
            My Projects
          </Link>
          <Link className="flex items-center gap-2" href="/demos/interview-assistant">
            <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white shadow-sm">
              <Bot className="size-5" aria-hidden />
            </span>
            <span className="font-semibold">AI Interview Coach</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
            <Link className="transition hover:text-slate-950" href="#features">
              Features
            </Link>
            <Link className="transition hover:text-slate-950" href="#reviews">
              Reviews
            </Link>
            <Link className="transition hover:text-slate-950" href="#platform">
              Platform
            </Link>
            <Link className="transition hover:text-slate-950" href="#pricing">
              Pricing
            </Link>
          </nav>
          <Button
            asChild
            className="h-9 rounded-full bg-slate-950 px-4 text-white hover:bg-slate-800"
          >
            <Link href={loginHref}>Login</Link>
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(500px,1.04fr)] lg:py-20">
          <div className="grid gap-8">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-white">
                <Sparkles className="mr-1 size-3.5" aria-hidden />
                AI Interview Coach
              </Badge>
              <Badge className="border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-white">
                AI 智能面试助手
              </Badge>
              <Badge className="border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-white">
                {demo.eyebrow}
              </Badge>
            </div>

            <div className="grid gap-5">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Master Your Interview with AI
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-xl">
                Practice realistic interviews, get instant AI feedback, and land your dream job.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-[linear-gradient(135deg,#111827,#4f46e5)] px-6 text-white shadow-[0_18px_50px_rgba(79,70,229,0.28)] hover:opacity-95"
              >
                <Link href={`${loginHref}?next=practice`}>
                  Start Free Interview
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-slate-200 bg-white px-6 text-slate-950 shadow-sm hover:bg-slate-50"
                variant="outline"
              >
                <Link href={`${loginHref}?next=resume`}>
                  Upload Resume
                  <Upload className="ml-2 size-4" aria-hidden />
                </Link>
              </Button>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3">
              <HeroMetric label="Mock Interviews Completed" value="10,000+" />
              <HeroMetric label="User Satisfaction" value="95%" />
              <HeroMetric label="Companies Covered" value="500+" />
            </div>
          </div>

          <HeroProductVisual />
        </div>
      </section>

      <section
        id="features"
        className="relative mx-auto grid w-[min(1180px,calc(100vw-2rem))] gap-8 py-20"
      >
        <SectionHeader
          eyebrow="Complete workflow"
          title="Everything candidates need before the real interview"
          text="A full AI interview training platform for students, graduates, career changers, technical candidates, and global job seekers."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureTile
            icon={<Mic2 className="size-5" aria-hidden />}
            title="Realistic mock interviews"
            text="Practice technical, behavioral, and HR interviews with role-aware AI questions."
          />
          <FeatureTile
            icon={<BrainCircuit className="size-5" aria-hidden />}
            title="Instant AI feedback"
            text="Get scores for communication, confidence, answer quality, and technical accuracy."
          />
          <FeatureTile
            icon={<Upload className="size-5" aria-hidden />}
            title="Resume analysis"
            text="Upload a PDF resume and receive skills, experience, project, and weakness analysis."
          />
          <FeatureTile
            icon={<BarChart3 className="size-5" aria-hidden />}
            title="Job matching"
            text="Compare your target role with company expectations and receive a preparation plan."
          />
        </div>
      </section>

      <section
        id="reviews"
        className="relative mx-auto grid w-[min(1180px,calc(100vw-2rem))] gap-8 py-20"
      >
        <SectionHeader
          eyebrow="Loved by candidates"
          title="Built for real preparation, not generic chatbot answers"
          text="The platform turns practice sessions into measurable improvement plans."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <ReviewCard
            name="Maya Chen"
            role="New grad SWE"
            text="The AI interviewer pushed me on follow-up questions that felt very close to my real onsite."
          />
          <ReviewCard
            name="Alex Rivera"
            role="Career switcher"
            text="Resume analysis helped me turn project descriptions into concrete impact stories."
          />
          <ReviewCard
            name="Jun Park"
            role="Product manager"
            text="The score breakdown made it obvious where I was rambling and where I needed better examples."
          />
        </div>
      </section>

      <section
        id="pricing"
        className="relative mx-auto grid w-[min(1180px,calc(100vw-2rem))] gap-8 py-20"
      >
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
          <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div className="grid content-center gap-5">
              <Badge className="w-fit bg-slate-950 text-white hover:bg-slate-950">
                Dashboard Preview
              </Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                From first practice to final report in one workspace.
              </h2>
              <p className="text-base leading-8 text-slate-600">
                Login creates a polished app experience with Dashboard,
                Interview Practice, Resume Analysis, Job Matching, History,
                Performance Report, and Settings.
              </p>
              <Button
                asChild
                className="h-11 w-fit rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800"
              >
                <Link href={appHref}>
                  Explore Dashboard
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <DashboardPreview />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroProductVisual() {
  return (
    <div className="relative min-h-[560px]">
      <div className="absolute inset-x-3 top-8 rounded-[36px] border border-slate-200 bg-white/85 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <DashboardPreview />
      </div>

      <div className="absolute -left-2 bottom-20 w-72 rounded-3xl border border-indigo-100 bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-indigo-600 text-white">
            <Bot className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold">AI Interviewer</p>
            <p className="text-xs text-slate-500">Question 2 of 6</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Tell me about a project where you had to solve a difficult technical
          problem.
        </p>
      </div>

      <div className="absolute right-0 top-0 w-64 rounded-3xl border border-emerald-100 bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">AI Feedback</span>
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            87/100
          </Badge>
        </div>
        <ScoreLine label="Communication" value="85%" />
        <ScoreLine label="Technical" value="78%" />
        <ScoreLine label="Confidence" value="80%" />
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-slate-950 text-white shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="text-xs text-white/45">AI Interview Coach</span>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[160px_1fr]">
        <div className="hidden content-start gap-2 md:grid">
          {["Dashboard", "Practice", "Resume", "Reports"].map((item, index) => (
            <div
              key={item}
              className={cn(
                "rounded-2xl border px-3 py-2 text-sm",
                index === 0
                  ? "border-indigo-300/35 bg-indigo-300/15 text-indigo-100"
                  : "border-white/8 bg-white/5 text-white/58"
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <PreviewStat icon={<BadgeCheck className="size-4" />} label="Interview Score" value="82/100" />
            <PreviewStat icon={<MessageSquareText className="size-4" />} label="Questions" value="6" />
            <PreviewStat icon={<ShieldCheck className="size-4" />} label="Readiness" value="High" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">Recent Interviews</span>
              <Badge className="bg-indigo-300 text-slate-950 hover:bg-indigo-300">
                Live demo
              </Badge>
            </div>
            <div className="grid gap-2">
              <HintLine text="Software Engineer Interview · Score 85 · Today" />
              <HintLine text="Product Manager Interview · Score 78 · Yesterday" />
              <HintLine text="Google SWE Preparation · Algorithms + System Design" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{label}</p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  text,
  title,
}: {
  eyebrow: string;
  text: string;
  title: string;
}) {
  return (
    <div className="mx-auto grid max-w-3xl justify-items-center gap-3 text-center">
      <Badge className="border-slate-200 bg-white text-indigo-700 shadow-sm hover:bg-white">
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function FeatureTile({
  icon,
  text,
  title,
}: {
  icon: ReactNode;
  text: string;
  title: string;
}) {
  return (
    <div className="grid min-h-64 content-between rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
        {icon}
      </span>
      <div className="grid gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-7 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function ReviewCard({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-[linear-gradient(135deg,#4f46e5,#111827)] text-white">
          <UsersRound className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
      <p className="text-sm leading-7 text-slate-600">"{text}"</p>
    </div>
  );
}

function PreviewStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="mb-3 text-white/48">{icon}</div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-white/45">{label}</p>
    </div>
  );
}

function HintLine({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-xs leading-5 text-white/62">
      {text}
    </div>
  );
}

function ScoreLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 grid gap-1.5">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: value }} />
      </div>
    </div>
  );
}
