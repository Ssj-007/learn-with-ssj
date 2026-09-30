---
slug: orchestrating-ai-code-review-at-scale
title: "Orchestrating AI Code Review at Scale — Cloudflare's Approach"
authors: [ssj]
tags: [ai, code-review, cloudflare, llm, ci-cd, engineering]
date: 2026-04-20
---

> This is a summary and reflection on Cloudflare's blog post: [Orchestrating AI Code Review at scale](https://blog.cloudflare.com/ai-code-review/) by Ryan Skidmore

Cloudflare built a CI-native orchestration system around OpenCode that launches up to seven specialized AI reviewers — security, performance, code quality, documentation, release management, and compliance — managed by a coordinator agent. Across 131,000 reviews, it costs a median of $0.98 per review and completes in under 4 minutes.

<!-- truncate -->

## The Problem

Code review is a fantastic mechanism for catching bugs and sharing knowledge, but it's also one of the most reliable ways to bottleneck an engineering team. Cloudflare's median wait time for a first review was often measured in hours.

Their first attempts — off-the-shelf AI code review tools and naive "shove a diff into an LLM" approaches — produced floods of vague suggestions, hallucinated syntax errors, and unhelpful advice.

## The Solution: Specialized Agents, Not One Big Prompt

Instead of one model reviewing everything, Cloudflare built a **CI-native orchestration system** around [OpenCode](https://opencode.ai/) (an open-source coding agent) that launches up to **seven specialized reviewers**:

| Agent | Responsibility |
|-------|---------------|
| Security | Injection vulns, auth bypasses, hardcoded secrets, insecure crypto |
| Performance | Measurable regressions, concrete risks |
| Code Quality | Logic errors, maintainability |
| Documentation | Doc accuracy and completeness |
| Release | Release-related file changes |
| Codex (compliance) | Internal engineering RFC compliance |
| AGENTS.md | Verifies repo's AI instructions are up to date |

A **coordinator agent** deduplicates findings, judges severity, and posts a single structured review comment.

### The Key Prompt Engineering Insight

Telling an LLM what **NOT** to do is where the actual value resides. The security reviewer explicitly ignores theoretical risks, defense-in-depth suggestions when primary defenses are adequate, and "consider using library X" suggestions.

> Without these boundaries, you get a firehose of speculative theoretical warnings that developers will immediately learn to ignore.

## Architecture: Plugins All the Way Down

A composable plugin architecture where the entry point delegates all configuration to plugins:

- **Bootstrap hooks:** run concurrently, non-fatal
- **Configure hooks:** run sequentially, fatal (if VCS can't connect, stop)
- **postConfigure:** async work like fetching remote model overrides

The GitLab plugin doesn't read Cloudflare AI Gateway configs. The Cloudflare plugin doesn't know about GitLab API tokens. All VCS coupling is isolated in a single file.

## Model Assignment by Complexity

| Tier | Models | Used For |
|------|--------|----------|
| **Top-tier** | Claude Opus 4.7, GPT-5.4 | Review Coordinator (hardest job: dedup, severity judgment) |
| **Standard** | Claude Sonnet 4.6, GPT-5.3 Codex | Code Quality, Security, Performance |
| **Lightweight** | Kimi K2.5 | Documentation, Release, AGENTS.md |

Every model assignment can be overridden dynamically at runtime via a Cloudflare Worker.

## Risk Tiers: Don't Send the Dream Team for a Typo Fix

```typescript
function assessRiskTier(diffEntries: DiffEntry[]) {
  const totalLines = diffEntries.reduce(
    (sum, e) => sum + e.addedLines + e.removedLines, 0
  );
  const fileCount = diffEntries.length;
  const hasSecurityFiles = diffEntries.some(
    e => isSecuritySensitiveFile(e.newPath)
  );

  if (fileCount > 50 || hasSecurityFiles) return "full";
  if (totalLines <= 10 && fileCount <= 20)  return "trivial";
  if (totalLines <= 100 && fileCount <= 20) return "lite";
  return "full";
}
```

| Tier | Lines | Files | Agents | Avg Cost |
|------|-------|-------|--------|----------|
| Trivial | ≤10 | ≤20 | 2 | $0.20 |
| Lite | ≤100 | ≤20 | 4 | $0.67 |
| Full | >100 or >50 files | Any | 7+ | $1.68 |

Security-sensitive files (anything touching `auth/`, `crypto/`) always trigger a full review.

## Resilience: Circuit Breakers and Failback Chains

Running 7 concurrent AI calls means you *will* hit rate limits. A circuit breaker pattern (inspired by Netflix's Hystrix) with three states per model tier. When a circuit opens, the system walks a failback chain:

```typescript
const DEFAULT_FAILBACK_CHAIN = {
  "opus-4-7":   "opus-4-6",    // Fall back to previous generation
  "opus-4-6":   null,          // End of chain
  "sonnet-4-6": "sonnet-4-5",
  "sonnet-4-5": null,
};
```

Only retryable API errors (429, 503) trigger failback. Auth errors, context overflow, and aborts do not.

## The Numbers (30 days, 5,169 repos)

| Metric | Value |
|--------|-------|
| Review runs | 131,246 |
| Merge requests reviewed | 48,095 |
| Median review time | 3m 39s |
| Avg cost per review | $1.19 |
| P99 cost | $4.45 |
| "Break glass" overrides | 288 (0.6%) |
| Total findings | 159,103 (~1.2/review) |
| Cache hit rate | 85.7% |
| Tokens processed | ~120 billion |

The deliberately low 1.2 findings per review is a feature — they biased hard for signal over noise.

## Re-Reviews: Not Starting From Scratch

When a developer pushes new commits, the system runs an incremental re-review aware of its own previous findings:

- **Fixed findings:** omitted; corresponding DiffNote auto-resolved
- **Unfixed findings:** re-emitted even if unchanged
- **User-resolved findings:** respected unless materially worsened
- **User replies:** "won't fix" → treated as resolved; "I disagree" → coordinator reads justification and responds

## Honest Limitations

AI reviewers still struggle with:
- **Architectural awareness** — they see the diff, not the design intent
- **Cross-system impact** — can flag a contract change but can't verify all consumers updated
- **Subtle concurrency bugs** — race conditions dependent on timing
- **Cost scales with diff size** — 500-file refactors with 7 frontier model calls cost real money

---

**My take:** The most transferable lessons here are: (1) specialized agents with tight scope beats one giant prompt, (2) telling LLMs what NOT to flag is more important than telling them what to flag, and (3) risk-tiering your AI spend is essential for cost control at scale. The 85.7% cache hit rate shows how much prompt caching matters when you're running the same base prompts across thousands of reviews.
