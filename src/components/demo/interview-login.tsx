import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Mail,
  Upload,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dashboardHref = "/demos/interview-assistant/app";

export function InterviewLogin() {
  return (
    <main className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 bg-[#f7f8fb] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.18),transparent_55%)]" />
      <section className="relative mx-auto grid min-h-screen w-[min(1120px,calc(100vw-2rem))] items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-7">
          <Link
            className="inline-flex w-fit items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950"
            href="/demos/interview-assistant"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to AI Interview Coach
          </Link>
          <Badge className="w-fit bg-slate-950 text-white hover:bg-slate-950">
            Create your account
          </Badge>
          <div className="grid gap-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Start practicing with a personalized AI coach.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              Sign up with Email, Google Login, or GitHub Login. Add your Name,
              Email, Target Job, Experience Level, and Resume to build your
              training plan.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <LoginBenefit label="2 min setup" />
            <LoginBenefit label="Personalized plan" />
            <LoginBenefit label="Dashboard access" />
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Login / Register</h2>
              <p className="mt-1 text-sm text-slate-500">
                Register to enter Dashboard.
              </p>
            </div>
            <span className="grid size-11 place-items-center rounded-2xl bg-indigo-600 text-white">
              <UserRound className="size-5" aria-hidden />
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button className="h-11 rounded-xl border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50" variant="outline">
              <Mail className="mr-2 size-4" aria-hidden />
              Email
            </Button>
            <Button className="h-11 rounded-xl border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50" variant="outline">
              <span className="mr-2 grid size-4 place-items-center rounded-full bg-slate-950 text-[10px] font-semibold text-white">
                G
              </span>
              Google Login
            </Button>
            <Button className="h-11 rounded-xl border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 sm:col-span-2" variant="outline">
              <Github className="mr-2 size-4" aria-hidden />
              GitHub Login
            </Button>
          </div>

          <div className="mt-6 grid gap-4">
            <FormField label="Name" placeholder="Alex Morgan" />
            <FormField label="Email" placeholder="alex@example.com" />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Target Job" placeholder="Software Engineer" />
              <label className="grid gap-2">
                <span className="text-sm font-medium">Experience Level</span>
                <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <option>Student</option>
                  <option>New Graduate</option>
                  <option>Career Switcher</option>
                  <option>Experienced</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Resume</span>
              <div className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm text-slate-500">
                <Upload className="mr-2 size-4" aria-hidden />
                Drop PDF Resume here
              </div>
            </label>
          </div>

          <Button
            asChild
            className="mt-6 h-12 w-full rounded-xl bg-[linear-gradient(135deg,#111827,#4f46e5)] text-white hover:opacity-95"
          >
            <Link href={dashboardHref}>
              Continue to Dashboard
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500"
        placeholder={placeholder}
      />
    </label>
  );
}

function LoginBenefit({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium shadow-sm">
      {label}
    </div>
  );
}
