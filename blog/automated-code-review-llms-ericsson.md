---
slug: automated-code-review-llms-ericsson
title: 'Automated Code Review Using LLMs at Ericsson — An Experience Report'
authors: [ssj]
tags: [ai, code-review, llm, research, software-engineering]
date: 2025-07-31
---

> This is a summary and reflection on the paper: [Automated Code Review Using Large Language Models at Ericsson: An Experience Report](https://arxiv.org/abs/2507.19115) (arXiv:2507.19115v2)

Ericsson explored using LLMs to automate code review with a deliberately lightweight approach — no expensive fine-tuning, just static analysis to extract the enclosing method as context, then prompt open-source LLMs like Code Llama. The results were encouraging but mixed: only 4 of 9 developers found it time-saving.

<!-- truncate -->

## The Problem

Code review is critical for software quality but imposes significant cognitive load on developers and relies heavily on the availability of senior developers, making it a bottleneck. Ericsson explored using LLMs to automate code review — with a deliberately **lightweight** approach that avoided expensive pre-training and instruction fine-tuning.

## The Approach

The pipeline has five steps:

1. **Extract latest changes** from the Gerrit API
2. **Extract files and diffs** for each change
3. **Extract the enclosing method** using Tree-Sitter to parse Java code and find the method enclosing the modified lines — this is the key context-providing step
4. **Prompt the LLM** with the enclosing function and a suitable prompt
5. **Post-process** the output (present, save, summarize)

### Why Enclosing Method Context Matters

A naive "please review this code" prompt doesn't work well. The context is defined as the code changeset plus the reference method/function where changes were made. Static program analysis (Tree-Sitter) extracts this enclosing method, ensuring the LLM gets proper context without hallucinating random function names.

## Prompt Engineering: Three Key Factors

1. **What data to prompt on:** The code diff with the right context (the enclosing method)
2. **How to prompt:** Multiple styles to ensure reviews are short, crisp, human-like, related to the enclosing method, and contain no generated code
3. **How to validate:** Summarize and rank reviews, store them, validate through human experts, and re-calibrate prompts using feedback

### The Prompts They Used

- **Simple:** "Provide a succinct analysis... Only offer comments if significant concerns are identified... Do not describe the functionality. Avoid generating new code."
- **Detailed:** Thorough analysis covering runtime errors, logic flaws, algorithm correctness, error handling, architecture, naming, performance, maintainability
- **Security:** Focused on security-related issues
- **Few-shot:** Templates with examples for Java and Python
- **Issue Topics:** Structured around Code Design, Code I/O, and Code Logic

## Evaluation Results

### RQ1: How Good Is the LLM's Code Review?

8 expert developers reviewed 10 Java methods (long, medium, short). Results were mixed:

| Snippet Length | Positive | Neutral | Negative |
|---------------|----------|---------|----------|
| Long | 3 | 2 | 4 |
| Medium | 2 | 2 | 3 |
| Short | 1 | 4 | 3 |

- **Positive:** Suggestions like meaningful variable names were appreciated
- **Neutral:** Method explanations felt unnecessary; important static fields not addressed
- **Negative:** Wrong variable types/parameters, irrelevant or incorrect reviews, missing abstractions, too verbose

### RQ2: Which LLM Produced the Best Review?

Pairwise comparison across 4 models (36 evaluations). **Code Llama 13B** appeared to be the best.

### RQ3: How Good Is the Tool in Practice?

9 expert developers used the tool for 15 days:

- **Time saved:** 4 of 9 agreed it saved time
- **Efficiency:** 4 said effective/highly effective, 2 somewhat, 3 not very
- **When unsatisfactory:** 4 said it just explained the code, 2 said factually incorrect, 3 said focused on irrelevant areas
- **Usage frequency:** 2 regular, 5 sometimes, 2 only once

## Key Findings

- The LLM found bugs in all 15 adversarial cases (intentionally introduced bugs), though these were relatively easy logical bugs
- The LLM stuck to comments about changed lines only (didn't comment on unchanged lines)
- Review generation took ~5-6 seconds regardless of snippet size

## Research Roadmap

1. **Phase 1:** Broader user surveys, expand prompt experimentation (zero-shot, few-shot, chain-of-thought)
2. **Phase 2:** Explore RAG and Graph-RAG for retrieving documentation, past review decisions, and dependency graphs
3. **Phase 3:** Multi-agent framework (Crew AI) with specialized agents operating autonomously in parallel
4. **Phase 4:** Integration with internal software engineering tools

---

**My take:** The enclosing-method approach is elegant — it's a cheap, fast way to give the LLM meaningful context without fine-tuning. The evaluation is honest about limitations: only 4/9 developers found it time-saving, and the most common complaint was the LLM "just explaining the code" rather than critically reviewing it. The contrast with Cloudflare's approach is striking — Ericsson uses a single lightweight model with static analysis, while Cloudflare orchestrates 7 specialized agents. The multi-agent roadmap in Phase 3 suggests Ericsson is heading in the same direction.
