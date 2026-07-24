"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

import type { DemoConfig, DemoResult } from "@/data/ai-demos";
import { generateDemoResult } from "@/data/ai-demos";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  demo: DemoConfig;
};

export function DemoWorkspace({ demo }: Props) {
  const [primary, setPrimary] = useState(demo.defaultPrimary);
  const [secondary, setSecondary] = useState(demo.defaultSecondary ?? "");
  const [result, setResult] = useState<DemoResult>(() =>
    generateDemoResult(demo.id, demo.defaultPrimary, demo.defaultSecondary)
  );

  function runDemo() {
    setResult(generateDemoResult(demo.id, primary, secondary));
  }

  function useSample(index: number) {
    const sample = demo.samples[index];

    setPrimary(sample.primary);
    setSecondary(sample.secondary ?? "");
    setResult(generateDemoResult(demo.id, sample.primary, sample.secondary));
  }

  function resetDemo() {
    setPrimary(demo.defaultPrimary);
    setSecondary(demo.defaultSecondary ?? "");
    setResult(
      generateDemoResult(demo.id, demo.defaultPrimary, demo.defaultSecondary)
    );
  }

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {demo.samples.map((sample, index) => (
            <button
              key={sample.label}
              className="h-8 rounded-md border border-border bg-muted px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              onClick={() => useSample(index)}
              type="button"
            >
              {sample.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-medium">{demo.primaryLabel}</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
              onChange={(event) => setPrimary(event.target.value)}
              placeholder={demo.primaryPlaceholder}
              value={primary}
            />
          </label>

          {demo.secondaryLabel ? (
            <label className="grid gap-2">
              <span className="text-sm font-medium">{demo.secondaryLabel}</span>
              <textarea
                className="min-h-32 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => setSecondary(event.target.value)}
                placeholder={demo.secondaryPlaceholder}
                value={secondary}
              />
            </label>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button className="gap-2" onClick={runDemo} type="button">
            生成分析
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <Button
            className="gap-2"
            onClick={resetDemo}
            type="button"
            variant="outline"
          >
            <RotateCcw className="size-4" aria-hidden />
            重置样例
          </Button>
        </div>
      </div>

      <ResultPanel result={result} />
    </section>
  );
}

function ResultPanel({ result }: { result: DemoResult }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">AI Output</Badge>
        {result.score ? <Badge variant="outline">匹配度 {result.score}</Badge> : null}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {result.summary}
      </p>

      <div className="mt-4 grid gap-4">
        {result.sections.map((section) => (
          <div key={section.title} className="grid gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {section.title}
            </h3>
            <ul className="grid gap-2 text-sm leading-relaxed text-muted-foreground">
              {section.items.map((item) => (
                <li key={item} className="rounded-md bg-muted/60 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {result.sources.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {result.sources.map((source) => (
            <Badge key={source} variant="outline">
              {source}
            </Badge>
          ))}
        </div>
      ) : null}

      {result.caution ? (
        <p className="mt-4 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {result.caution}
        </p>
      ) : null}
    </div>
  );
}
