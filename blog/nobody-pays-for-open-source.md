---
slug: nobody-pays-for-open-source
title: 'Nobody Pays for Open Source. We Can Force Them To.'
authors: [ssj]
tags: [open-source, economics, game-theory, sustainability]
date: 2026-09-13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> This is a summary and reflection on Laurie Voss's essay: [Nobody pays for open source. We can force them to.](https://seldo.com/posts/nobody-pays-for-open-source-we-can-force-them-to/)

Open source is a game with a stable outcome, and the outcome is that **free wins**. The problem isn't that people write software for free — it's that we've arranged things so the people who write the most useful software get a second unpaid job as reward.

<!-- truncate -->

## The Core Thesis

Open source is a game with a stable outcome, and the outcome is that **free wins**. Using the evolutionary biology model of "hawks and doves," Laurie Voss argues that closed source is the hawk (it competes, withholds code, charges a premium) and open source is the dove (it cooperates, gives code away). The evolutionarily stable strategy (ESS) for software has settled on: *"anybody may use this for anything, including commercially, for free."*

Every project that has tried to be a slightly less generous dove has lost to a project that stayed a full dove:

- **React (2017):** Facebook relicensed React under MIT after the BSD+Patents license was banned.
- **Elasticsearch (2021):** Elastic moved to a source-available license; Amazon forked it as OpenSearch; Elastic quietly went back to open source in 2024.
- **Terraform (2023):** HashiCorp did the same; OpenTofu forked it; HashiCorp got bought by IBM.
- **Redis (2024):** Redis tried it; Valkey forked it; Redis put AGPL back in 2025.

> **Free wins share and closed wins profit, and both of them win.**

## The Stable Outcome Runs on People Burning Out

The problem is what the free layer looks like from the inside:

- **60%** of open source maintainers are not paid (Tidelift 2024 survey).
- Of the unpaid ones, **61%** work alone.
- Nearly **60%** of all maintainers have quit or thought about quitting.
- Only **11%** of 1.2 million open source projects are actively maintained (Sonatype 2023).
- **136 developers** wrote more than 80% of the code in the fifty most-used packages (Linux Foundation Census II).
- Replacing open source would cost companies **$8.8 trillion** (Harvard).

The xz backdoor (2024) is the canonical example: a fake contributor socially engineered the one unpaid maintainer of a compression library present in nearly every Linux machine.

> The system isn't breaking. It's stable, at a level of human cost we've collectively decided to put up with.

## What Changed Is Velocity

The cost of maintaining a popular package went up enormously (faster security exploitation, more load-bearing packages), while the payoff stayed at zero dollars and a warm feeling.

## Everything We've Tried Moves Money, Not the Equilibrium

| Approach | Result |
|----------|--------|
| **Tips** (GitHub Sponsors) | $100M total — power law distribution, median makes lunch money |
| **Foundations** | Only 3% of maintainers got any money from a foundation |
| **Corporate generosity** | Charity doesn't scale to trillions |
| **Paid security** (Tidelift) | Good idea, acquired by Sonar |
| **Government** (Germany's Sovereign Tech Fund) | One fund, one country, ~€20M/year |
| **Licensing** | Every attempt loses to the full dove next door |

> Charity doesn't scale, and nobody has the authority to issue a mandate.

## Companies DO Pay for Open Source — Just Not to the People Who Write It

The key insight: companies already pay for open source, just not to maintainers.

- **JFrog** (Artifactory): $532M revenue in 2025
- **Snyk** (vulnerability scanning): ~$326M/year
- **Docker** (registry): $207M
- **Chainguard** (hardened images): $40M → $100M target

All of these sell the same thing: **dependable supply of free code**. They sell insurance against the maintainer, when the maintainer is the one person who can actually make the code more secure.

> The supply of money was never the problem; the problem is where it gets captured on the way down.

## Free Wins the Code Game, But the Default Wins the Supply Game

There are two games with different winners:

- **Code game:** resource is the software itself → free wins (anybody can copy code).
- **Supply game:** resource is not having to think about where code comes from → won by whoever is the **default**.

Nobody has ever successfully forked a registry. Docker's revenue went from ~$12M (2020) to $207M (2024) despite free alternatives like Podman existing.

> Free wins the code game, but the supply game is won by whoever is the default, and defaults can charge.

## The Proposal: Registries Should Charge Companies and Pay Maintainers

Three parts:

1. **Registries meter corporate use and charge for it.** Individuals, small teams, students, and open source projects pay nothing. Companies above some size get a subscription.
2. **A fixed slice of revenue is a royalty that goes to the packages.** Pro rata, to every package in paying customers' dependency trees, weighted by dependency, automatically, every month.
3. **The people who do this are the people who own the domains.** ~12 registries matter. Every maintainer already has an account. The billing side is finite.

GitHub owns both npm and GitHub Sponsors and could turn this on this quarter. JFrog and Sonatype already bill companies for supply.

## Why This Can Work When Nothing Else Has

It doesn't ask the equilibrium to change — every strategy stays exactly where it is; what changes is what gets measured.

- The license doesn't change → nothing gets forked.
- It's not charity and not a mandate → companies already pay for supply; the invoice just gets a new line.
- It pays the **long tail** — the person who wrote a small useful thing in 400 companies' production systems gets 400 small contributions.

> The mechanism should pay people for being useful, not for being good at asking.

## LLMs Make This Urgent

Cheaper software means more software, a longer long tail, and more packages in dependency trees. AI agents are now the fastest-growing consumers of open source, consuming it through registries. The two games are diverging: code is getting cheaper to make and supply is getting more expensive to guarantee.

> The people who run the meter pay the people who make the thing worth metering.

---

**My take:** This is one of the most pragmatic open source sustainability proposals I've read. Instead of asking companies to be generous (which doesn't scale) or changing licenses (which gets forked), it leverages the one chokepoint that can't be routed around — the registry. The Spotify-model analogy is apt: accept some fraud as the cost of actually paying people.
