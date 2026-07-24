import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Gauge,
  History,
  LayoutDashboard,
  MessageSquareText,
  Mic2,
  Settings,
  Star,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type InterviewAppSection =
  | "dashboard"
  | "practice"
  | "resume"
  | "jobs"
  | "history"
  | "report"
  | "settings";

type InterviewAppProps = {
  section?: InterviewAppSection;
};

const navItems: {
  href: string;
  icon: ReactNode;
  label: string;
  section: InterviewAppSection;
}[] = [
  {
    href: "/demos/interview-assistant/app",
    icon: <LayoutDashboard className="size-4" aria-hidden />,
    label: "Dashboard",
    section: "dashboard",
  },
  {
    href: "/demos/interview-assistant/app/practice",
    icon: <MessageSquareText className="size-4" aria-hidden />,
    label: "Interview Practice",
    section: "practice",
  },
  {
    href: "/demos/interview-assistant/app/resume",
    icon: <FileText className="size-4" aria-hidden />,
    label: "Resume Analysis",
    section: "resume",
  },
  {
    href: "/demos/interview-assistant/app/jobs",
    icon: <BriefcaseBusiness className="size-4" aria-hidden />,
    label: "Job Matching",
    section: "jobs",
  },
  {
    href: "/demos/interview-assistant/app/history",
    icon: <History className="size-4" aria-hidden />,
    label: "Interview History",
    section: "history",
  },
  {
    href: "/demos/interview-assistant/app/report",
    icon: <BarChart3 className="size-4" aria-hidden />,
    label: "Performance Report",
    section: "report",
  },
  {
    href: "/demos/interview-assistant/app/settings",
    icon: <Settings className="size-4" aria-hidden />,
    label: "Settings",
    section: "settings",
  },
];

export function InterviewApp({ section = "dashboard" }: InterviewAppProps) {
  return (
    <main className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 bg-[#f6f7fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <Link className="flex items-center gap-2" href="/demos/interview-assistant">
              <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-white">
                <Bot className="size-5" aria-hidden />
              </span>
              <span className="font-semibold">AI Interview Coach</span>
            </Link>
            <Link className="text-slate-400 hover:text-slate-950" href="/demos/interview-assistant">
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>

          <nav className="mt-6 grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  section === item.section
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                )}
                href={item.href}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
            <p className="text-sm font-semibold text-indigo-950">Next session</p>
            <p className="mt-1 text-xs leading-5 text-indigo-700">
              Google SWE mock interview · Today 4:00 PM
            </p>
            <Button
              asChild
              className="mt-3 h-9 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
            >
              <Link href="/demos/interview-assistant/app/practice">Practice now</Link>
            </Button>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur">
            <div>
              <p className="text-sm text-slate-500">AI interview training platform</p>
              <h1 className="text-xl font-semibold">{titleForSection(section)}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="hidden bg-emerald-100 text-emerald-700 hover:bg-emerald-100 sm:inline-flex">
                Pro Trial
              </Badge>
              <span className="grid size-10 place-items-center rounded-full bg-slate-950 text-white">
                A
              </span>
            </div>
          </header>

          <div className="p-5 lg:p-7">
            {section === "dashboard" ? <DashboardHome /> : null}
            {section === "practice" ? <PracticePage /> : null}
            {section === "resume" ? <ResumeAnalysisPage /> : null}
            {section === "jobs" ? <JobMatchingPage /> : null}
            {section === "history" ? <HistoryPage /> : null}
            {section === "report" ? <ReportPage /> : null}
            {section === "settings" ? <SettingsPage /> : null}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardHome() {
  return (
    <div className="grid gap-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back, Alex 👋
            </h2>
            <p className="mt-2 text-slate-600">
              Your interview readiness improved 12% this week.
            </p>
          </div>
          <Button asChild className="h-11 rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800">
            <Link href="/demos/interview-assistant/app/practice">
              Start new mock interview
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={<Gauge className="size-5" />} label="Interview Score" value="82/100" />
        <MetricCard icon={<MessageSquareText className="size-5" />} label="Communication" value="85%" />
        <MetricCard icon={<BrainIcon />} label="Technical Knowledge" value="78%" />
        <MetricCard icon={<Star className="size-5" />} label="Confidence" value="80%" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Panel title="Skills" action="Weekly trend">
          <ProgressBar label="Communication" value="85%" />
          <ProgressBar label="Technical Knowledge" value="78%" />
          <ProgressBar label="Confidence" value="80%" />
        </Panel>
        <Panel title="Today's Training" action="3 tasks">
          <TaskItem title="Behavioral warm-up" text="Practice STAR answers" />
          <TaskItem title="System design questions" text="Focus on trade-offs" />
          <TaskItem title="Resume follow-ups" text="Add measurable impact" />
        </Panel>
      </div>

      <Panel title="Recent Interviews" action="View all">
        <InterviewRow role="Software Engineer Interview" score="85" date="Today" />
        <InterviewRow role="Product Manager Interview" score="78" date="Yesterday" />
      </Panel>
    </div>
  );
}

function PracticePage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Panel title="AI Mock Interview" action="Setup">
        <FormSelect label="Job Role" values={["Software Engineer", "Data Scientist", "Product Manager", "Marketing"]} />
        <FormSelect label="Difficulty" values={["Easy", "Medium", "Hard"]} />
        <FormSelect label="Interview Type" values={["Technical Interview", "Behavioral Interview", "HR Interview"]} />
        <Button className="mt-2 h-11 rounded-xl bg-slate-950 text-white hover:bg-slate-800">
          Start Interview
        </Button>
      </Panel>
      <div className="grid gap-5">
        <Panel title="Live Interview Flow" action="Step 2">
          <ChatBubble speaker="AI Interviewer" text="Hi Alex, I am your AI interviewer. I will ask a few questions and give feedback after each answer." />
          <ChatBubble speaker="AI Interviewer" text="Tell me about yourself." />
          <ChatBubble speaker="AI Interviewer" text="Explain your previous project." />
          <ChatBubble speaker="AI Interviewer" text="Why should we hire you?" />
          <label className="grid gap-2">
            <span className="text-sm font-medium">Text input</span>
            <textarea
              className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              placeholder="Type your answer here..."
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">
              Submit answer
            </Button>
            <Button className="rounded-xl" variant="outline">
              <Mic2 className="mr-2 size-4" aria-hidden />
              Voice recording
            </Button>
          </div>
        </Panel>
        <div className="grid gap-4 md:grid-cols-5">
          <ScoreCard label="Overall Score" value="87/100" />
          <ScoreCard label="Communication Score" value="85%" />
          <ScoreCard label="Answer Quality" value="88%" />
          <ScoreCard label="Confidence Score" value="80%" />
          <ScoreCard label="Technical Accuracy" value="84%" />
        </div>
      </div>
    </div>
  );
}

function ReportPage() {
  return (
    <div className="grid gap-5">
      <Panel title="Interview Performance Report" action="Overall Score 87/100">
        <div className="grid gap-4 md:grid-cols-3">
          <ScoreCard label="Overall Score" value="87/100" />
          <ScoreCard label="Communication" value="85%" />
          <ScoreCard label="Technical Accuracy" value="84%" />
        </div>
      </Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Strengths" action="2 highlights">
          <CheckLine text="Clear communication" />
          <CheckLine text="Strong technical explanation" />
        </Panel>
        <Panel title="Weaknesses" action="2 issues">
          <WarningLine text="Too many filler words" />
          <WarningLine text="Lack of concrete examples" />
        </Panel>
        <Panel title="AI Suggestions" action="Coach note">
          <p className="rounded-2xl bg-indigo-50 p-4 text-sm leading-7 text-indigo-900">
            "Use STAR method when answering behavioral questions."
          </p>
        </Panel>
      </div>
      <Panel title="Recommended Practice" action="Next">
        <NumberedItem index="1." text="Leadership questions" />
        <NumberedItem index="2." text="System design questions" />
      </Panel>
    </div>
  );
}

function ResumeAnalysisPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <Panel title="Upload PDF Resume" action="PDF Resume">
        <div className="flex min-h-48 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          <Upload className="mr-2 size-4" aria-hidden />
          Drop your PDF Resume
        </div>
        <Button className="mt-4 h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800">
          Analyze Resume
        </Button>
      </Panel>
      <div className="grid gap-5">
        <Panel title="Resume Score" action="88/100">
          <div className="grid gap-4 md:grid-cols-4">
            <ScoreCard label="Skills" value="92%" />
            <ScoreCard label="Experience" value="84%" />
            <ScoreCard label="Projects" value="88%" />
            <ScoreCard label="Weaknesses" value="3" />
          </div>
        </Panel>
        <Panel title="Suggestions" action="AI analysis">
          <CheckLine text="Improve project descriptions" />
          <CheckLine text="Add measurable achievements" />
          <CheckLine text="Recommended interview questions based on your resume" />
        </Panel>
      </div>
    </div>
  );
}

function JobMatchingPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <Panel title="Target company" action="Input">
        <FormInput label="Target company" value="Google" />
        <FormInput label="Position" value="Software Engineer" />
        <Button className="mt-2 h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800">
          Generate plan
        </Button>
      </Panel>
      <div className="grid gap-5">
        <Panel title="Google SWE Interview Preparation" action="Job Matching">
          <div className="grid gap-4 md:grid-cols-3">
            <TopicList title="Required Skills" items={["Algorithms", "System Design", "Distributed Systems"]} />
            <TopicList title="Expected Questions" items={["Coding trade-offs", "Scalability", "Teamwork"]} />
            <TopicList title="Preparation Plan" items={["Daily practice", "Mock interviews", "Resume stories"]} />
          </div>
        </Panel>
        <Panel title="Behavioral Topics" action="Company style">
          <CheckLine text="Leadership" />
          <CheckLine text="Teamwork" />
        </Panel>
      </div>
    </div>
  );
}

function HistoryPage() {
  return (
    <Panel title="Interview History" action="All records">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="py-3">Date</th>
              <th className="py-3">Role</th>
              <th className="py-3">Score</th>
              <th className="py-3">Duration</th>
              <th className="py-3">Feedback</th>
            </tr>
          </thead>
          <tbody>
            <HistoryRow date="Today" role="Software Engineer" score="85" duration="32m" feedback="View detailed report" />
            <HistoryRow date="Yesterday" role="Product Manager" score="78" duration="28m" feedback="Needs stronger examples" />
            <HistoryRow date="Monday" role="Data Scientist" score="81" duration="35m" feedback="Improve statistics explanation" />
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function SettingsPage() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="Personal Information" action="Profile Settings">
        <FormInput label="Name" value="Alex Morgan" />
        <FormInput label="Email" value="alex@example.com" />
        <FormInput label="Language" value="English" />
      </Panel>
      <Panel title="Career Profile" action="Resume">
        <FormInput label="Target Job" value="Software Engineer" />
        <FormInput label="Resume" value="alex-resume.pdf" />
        <FormInput label="Subscription" value="Pro Trial" />
      </Panel>
      <Panel title="Connected accounts" action="Login">
        <CheckLine text="Email connected" />
        <CheckLine text="Google Login available" />
        <CheckLine text="GitHub Login available" />
      </Panel>
      <Panel title="Preferences" action="Settings">
        <CheckLine text="Interview language: English" />
        <CheckLine text="Voice feedback enabled" />
        <CheckLine text="Weekly performance report enabled" />
      </Panel>
    </div>
  );
}

function titleForSection(section: InterviewAppSection) {
  return navItems.find((item) => item.section === section)?.label ?? "Dashboard";
}

function Panel({
  action,
  children,
  title,
}: {
  action?: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {action ? <Badge variant="outline">{action}</Badge> : null}
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 text-slate-400">{icon}</div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function BrainIcon() {
  return <Bot className="size-5" aria-hidden />;
}

function ProgressBar({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-indigo-600" style={{ width: value }} />
      </div>
    </div>
  );
}

function TaskItem({ text, title }: { text: string; title: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{text}</p>
    </div>
  );
}

function InterviewRow({ date, role, score }: { date: string; role: string; score: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">{role}</p>
        <p className="text-sm text-slate-500">Date: {date}</p>
      </div>
      <Badge className="w-fit bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
        Score: {score}
      </Badge>
    </div>
  );
}

function FormSelect({ label, values }: { label: string; values: string[] }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </label>
  );
}

function FormInput({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        defaultValue={value}
      />
    </label>
  );
}

function ChatBubble({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-medium">{speaker}</p>
      <p className="mt-1 text-sm leading-7 text-slate-600">"{text}"</p>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xl font-semibold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{label}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
      <CheckCircle2 className="size-4" aria-hidden />
      {text}
    </div>
  );
}

function WarningLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
      - {text}
    </div>
  );
}

function NumberedItem({ index, text }: { index: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
      <span className="font-semibold">{index}</span>
      {text}
    </div>
  );
}

function TopicList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-medium">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

function HistoryRow({
  date,
  duration,
  feedback,
  role,
  score,
}: {
  date: string;
  duration: string;
  feedback: string;
  role: string;
  score: string;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-3">{date}</td>
      <td className="py-3">{role}</td>
      <td className="py-3">{score}</td>
      <td className="py-3">{duration}</td>
      <td className="py-3 text-indigo-600">{feedback}</td>
    </tr>
  );
}
