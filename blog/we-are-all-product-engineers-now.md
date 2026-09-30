---
slug: we-are-all-product-engineers-now
title: 'We Are All Product Engineers Now'
authors: [ssj]
tags: [ai, software-engineering, future-of-work, product-engineering]
date: 2026-09-14
---

> This is a summary and reflection on Laurie Voss's essay: [We are all Product Engineers now](https://seldo.com/posts/we-are-all-product-engineers-now/)

The cost of writing code collapsed, and the cost of reviewing, fixing, and operating it is following. What's left of making software is finding out what people actually want, defining it precisely, and making it pleasant to use. We are all product engineers now, whether we like it or not.

<!-- truncate -->

## Two Big Assumptions

1. **Agents will eat the entire software development lifecycle.** They're great at writing code, mediocre at everything after (reviewing, testing, deploying, monitoring). That's temporary.
2. **There is no upper bound to how much software we need.** Look at your dentist's website — terrible software exists because people can't afford better at current prices. Demand for software is practically infinite.

## Breaking Down the Cost of Making Software

| Category | Component | Status |
|----------|-----------|--------|
| **Collapsed** | Writing code | Already collapsed with LLMs |
| **Going soon** | Reviewing code | Death of code review is approaching |
| **Going soon** | Maintaining code | Agents making real progress |
| **Next on chopping block** | Shipping to production | Dropping for a while |
| **Next on chopping block** | Scaling up | Logically next |
| **Possibly safe** | Deciding what to build | Most durable — can't extract from customer mechanically |
| **Possibly safe** | Deciding what "good" is | Intersection with AI evaluation |
| **Possibly safe** | Making it delightful | Most wobbly of the three |

## All Juniors Did Was Write Code — And That's Gone

Agents got good at producing code from a description — exactly what junior developers were hired to do. The training pipeline is broken: you hired a junior to type code, a senior reviewed it, and over a decade the junior absorbed judgment by osmosis. That first rung is now automated.

Stanford data: the employment gap for 22-to-25-year-olds in AI-exposed jobs is now **19%** below where it would be. Entry-level hiring at big tech is down **65%** since 2019, at early-stage startups down **75%**. Yet engineering as a share of hiring went *up* from 46% to 55%.

## What's Left: Finding Out What People Actually Want

At some point every piece of software is a formalization of a human desire. When a customer says "I need to keep track of my orders," there are 10,000 pieces of software that fit that sentence, and only one is right for a bakery. The only person who knows it's a bakery is the customer.

> You cannot do product discovery mechanically short of reading people's thoughts.

### There Is No Economy of Scale in Product Decisions

The definition of "good" for a calendar app and a scheduling app have almost nothing in common. Two bakeries don't have exactly the same problem either. As the cost of software creation falls to zero, the bottleneck moves to the description of the problem.

> **Software requirements are more different than we've been able to admit.**

## The Job That Remains: Product Engineering

History lesson: when computers were new, a "systems analyst" sat between the business and programmers. Then software went consumer-facing, and the role became "product manager." For 25 years we've had two professions where there used to be one and a half. This is about to collapse back into one job.

### The New Job Is Already Being Hired For

Palantir coined "forward deployed engineer." In 2025, postings grew **~800%** in nine months. Almost 1,000 live postings across 462 companies including OpenAI, Anthropic, Databricks, Stripe. Average total comp: **$240,000**, seniors clear $600,000.

The responsibilities: scope the problem with the customer, understand their business, write production code into systems you didn't build, iterate until it works. The code-writing is the smallest part — the agent does that.

> The market has already decided this job is incredibly valuable.

## The Training Pipeline Problem

The input the industry needs in unlimited quantities is people who can extract requirements, define good, and exercise taste — **and we do not make those people.**

- Google's APM program: ~50 people/year out of 12,000 applicants.
- Universities teach data structures. Bootcamps teach React. Nobody teaches "go sit with a baker for a week and come back with a spec."
- The pipeline for turning junior devs into that role by accident has been closed, also by accident.

## The Craft as Paid Work Is Mostly Dead

A real tragedy: a lot of people got into programming because they love the craft — the clean abstraction, the hard bug yielding, the machine doing exactly what you told it. Those people did not sign up to interview bakers.

Two observations that aren't consolation:
1. For many who think they loved the typing, the part they actually loved was the moment *before* the typing — when a vague mess resolved into a precise shape. That moment is the job now.
2. The craft survives the way woodworking survived the furniture factory — as a thing people do because they love it.

## Ten Years of Turmoil Ahead

The forecast: more software, more people making it, and almost none of them typing.

> **We are all product engineers now, whether we like it or not, and a lot of us won't.**

---

**My take:** The most striking insight here is that product sense can't be automated because it lives in the customer's head, not in training data. The broken junior pipeline is the scariest part — we're losing the apprenticeship model that produced senior engineers, and we don't have a replacement. The "forward deployed engineer" role exploding is the market's signal that this transition is already happening.
