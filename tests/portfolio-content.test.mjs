import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

const expectedDemoRoutes = [
  "/demos/interview-assistant",
  "/demos/knowledge-base",
  "/demos/recruiting-assistant",
];

test("My Projects points to the three selected local AI demo routes", async () => {
  const resumeSource = await readFile(join(root, "src/data/resume.tsx"), "utf8");

  for (const href of expectedDemoRoutes) {
    assert.match(resumeSource, new RegExp(href));
  }

  assert.doesNotMatch(resumeSource, /title: "Chat Collect"/);
  assert.doesNotMatch(resumeSource, /title: "Magic UI"/);
  assert.doesNotMatch(resumeSource, /title: "llm\.report"/);
  assert.doesNotMatch(resumeSource, /title: "Automatic Chat"/);
});

test("Each selected AI demo has a local route", async () => {
  for (const href of expectedDemoRoutes) {
    const route = href.replace("/demos/", "");
    await access(join(root, "src/app/demos", route, "page.tsx"));
  }
});

test("AI demos use three distinct product interface layouts", async () => {
  const layoutSource = await readFile(
    join(root, "src/components/demo/demo-layouts.tsx"),
    "utf8"
  );
  const pageSource = await readFile(
    join(root, "src/components/demo/demo-page.tsx"),
    "utf8"
  );

  assert.match(layoutSource, /data-demo-layout="candidate-console"/);
  assert.match(layoutSource, /data-demo-layout="knowledge-workbench"/);
  assert.match(layoutSource, /data-demo-layout="recruiting-dashboard"/);
  assert.match(pageSource, /CandidateConsole/);
  assert.match(pageSource, /KnowledgeWorkbench/);
  assert.match(pageSource, /RecruitingDashboard/);
});

test("Knowledge base demo mirrors PandaWiki product capabilities", async () => {
  const layoutSource = await readFile(
    join(root, "src/components/demo/demo-layouts.tsx"),
    "utf8"
  );

  for (const marker of [
    /data-knowledge-panel="pandawiki-shell"/,
    /data-knowledge-panel="wiki-portal"/,
    /data-knowledge-panel="ai-qa-modal"/,
    /data-knowledge-panel="source-import"/,
    /data-knowledge-panel="model-config"/,
    /data-knowledge-panel="analytics"/,
    /PandaWiki/,
    /URL Import/,
    /Sitemap/,
    /RSS/,
    /File Upload/,
    /AI Q&A/,
    /AI Search/,
    /DingTalk/,
    /Feishu/,
    /WeCom/,
  ]) {
    assert.match(layoutSource, marker);
  }
});

test("Personal interview assistant includes productized interview tool panels", async () => {
  const layoutSource = await readFile(
    join(root, "src/components/demo/demo-layouts.tsx"),
    "utf8"
  );

  assert.match(layoutSource, /data-interview-panel="live-assist"/);
  assert.match(layoutSource, /data-interview-panel="mock-interview"/);
  assert.match(layoutSource, /data-interview-panel="resume-knowledge"/);
  assert.match(layoutSource, /data-interview-panel="question-bank"/);
  assert.match(layoutSource, /data-interview-panel="floating-hint"/);
  assert.match(layoutSource, /data-interview-panel="review-report"/);
});

test("Personal interview assistant has a Gank-style landing page before dashboard", async () => {
  const landingPageSource = await readFile(
    join(root, "src/app/demos/interview-assistant/page.tsx"),
    "utf8"
  );
  const landingSource = await readFile(
    join(root, "src/components/demo/interview-landing.tsx"),
    "utf8"
  );

  await access(join(root, "src/app/demos/interview-assistant/app/page.tsx"));

  assert.match(landingPageSource, /InterviewLanding/);
  assert.doesNotMatch(landingPageSource, /DemoPage/);
  assert.match(landingSource, /data-interview-landing="gank-style"/);
  assert.match(landingSource, /const appHref = "\/demos\/interview-assistant\/app"/);
  assert.match(landingSource, /href={appHref}/);
  assert.match(landingSource, /href="#features"/);
  assert.match(landingSource, /href="#pricing"/);
  assert.match(landingSource, /AI 智能面试助手/);
  assert.match(landingSource, /Dashboard/);
});

test("Global portfolio dock is hidden on fullscreen demo product pages", async () => {
  const navbarSource = await readFile(
    join(root, "src/components/navbar.tsx"),
    "utf8"
  );

  assert.match(navbarSource, /usePathname/);
  assert.match(navbarSource, /\/demos\/interview-assistant/);
  assert.match(navbarSource, /\/demos\/knowledge-base/);
  assert.match(navbarSource, /return null/);
});

test("AI Interview Coach landing matches the requested SaaS homepage", async () => {
  const landingSource = await readFile(
    join(root, "src/components/demo/interview-landing.tsx"),
    "utf8"
  );

  assert.match(landingSource, /AI Interview Coach/);
  assert.match(landingSource, /Master Your Interview with AI/);
  assert.match(
    landingSource,
    /Practice realistic interviews, get instant AI feedback, and land your dream job\./
  );
  assert.match(landingSource, /Start Free Interview/);
  assert.match(landingSource, /Upload Resume/);
  assert.match(landingSource, /10,000\+/);
  assert.match(landingSource, /95%/);
  assert.match(landingSource, /500\+/);
});

test("AI Interview Coach has login and complete app feature routes", async () => {
  const routes = [
    "login",
    "app/practice",
    "app/resume",
    "app/jobs",
    "app/history",
    "app/report",
    "app/settings",
  ];

  for (const route of routes) {
    await access(join(root, "src/app/demos/interview-assistant", route, "page.tsx"));
  }

  const loginSource = await readFile(
    join(root, "src/components/demo/interview-login.tsx"),
    "utf8"
  );
  const appSource = await readFile(
    join(root, "src/components/demo/interview-app.tsx"),
    "utf8"
  );

  for (const text of [
    "Email",
    "Google Login",
    "GitHub Login",
    "Name",
    "Target Job",
    "Experience Level",
    "Resume",
  ]) {
    assert.match(loginSource, new RegExp(text));
  }

  for (const text of [
    "Dashboard",
    "Interview Practice",
    "Resume Analysis",
    "Job Matching",
    "Interview History",
    "Performance Report",
    "Settings",
    "Welcome back, Alex",
    "Interview Score",
    "Software Engineer Interview",
    "Product Manager Interview",
    "Job Role",
    "Difficulty",
    "Interview Type",
    "Voice recording",
    "Interview Performance Report",
    "Resume Score",
    "Google SWE Interview Preparation",
    "Personal Information",
    "Subscription",
  ]) {
    assert.match(appSource, new RegExp(text));
  }
});
