# learn-with-ssj

Sharing my knowledge from what I learn on a daily basis. A tech blog built with [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages.

🌐 **Live site:** https://ssj-007.github.io/learn-with-ssj/

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (comes with Node.js)

### Local Development

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm start

# Build the static site (outputs to ./build)
npm run build

# Serve the built site locally
npm run serve
```

---

## 📁 Project Structure

```
learn-with-ssj/
├── blog/                          # ← Blog posts go here (Markdown files)
│   ├── authors.yml                # Author profiles
│   ├── nobody-pays-for-open-source.md
│   ├── we-are-all-product-engineers-now.md
│   ├── orchestrating-ai-code-review-at-scale.md
│   ├── automated-code-review-llms-ericsson.md
│   └── cuda-agent-agentic-rl-kernel-generation.md
├── docs/                          # Documentation pages (sidebar)
│   └── index.md
├── src/
│   └── css/
│       └── custom.css             # Global styles / theme overrides
├── static/
│   └── img/                       # Static images, logo, favicon
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: auto-deploy to GitHub Pages
├── docusaurus.config.ts           # Main Docusaurus config (navbar, footer, URL, etc.)
├── sidebars.ts                    # Docs sidebar config
├── package.json
└── tsconfig.json
```

---

## ✍️ How to Add a New Blog Post

Adding a new post takes 3 simple steps:

### Step 1: Create a Markdown file in `blog/`

Create a new `.md` file in the `blog/` directory. The filename becomes the URL slug (unless you override it with `slug:` in frontmatter).

**Naming convention:** `YYYY-MM-DD-my-post-title.md` (date prefix keeps files sorted chronologically).

### Step 2: Add the frontmatter

Every blog post starts with YAML frontmatter:

```markdown
---
slug: my-post-title                 # URL: /my-post-title (optional, defaults to filename)
title: 'My Post Title'              # Display title (shown on listing & post page)
authors: [ssj]                      # Author ID from blog/authors.yml
tags: [ai, engineering]             # Tags for filtering & discovery
date: 2026-10-01                    # Publication date (YYYY-MM-DD)
---

Your content starts here in Markdown...
```

#### Frontmatter fields explained

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | The post title shown on the blog listing and post page |
| `authors` | ✅ | One or more author IDs defined in `blog/authors.yml` |
| `tags` | ✅ | Array of tags. Used for the `/tags` page and tag filtering |
| `date` | ✅ | Publication date in `YYYY-MM-DD` format |
| `slug` | ❌ | Custom URL path. Defaults to the filename (without extension) |
| `description` | ❌ | Short description for SEO and blog listing |
| `draft` | ❌ | Set to `true` to hide the post from production builds |
| `unlisted` | ❌ | Set to `true` to hide from listing but keep accessible via direct URL |

### Step 3: Write your content

Write your post in Markdown below the frontmatter.

#### Adding a preview (recommended)

Insert a `<!-- truncate -->` marker where you want the blog listing preview to end. Everything before it shows on the homepage listing; the full post appears when readers click "Read More". This keeps your blog listing clean and scannable:

```markdown
---
title: 'My Post'
authors: [ssj]
tags: [ai]
date: 2026-10-01
---

A one or two sentence hook that summarizes the post goes here.

<!-- truncate -->

The rest of your full post continues here...
```

You can use:

- Standard Markdown (headings, lists, tables, code blocks, links, images)
- MDX features (import React components)
- Code blocks with syntax highlighting:

````
```python
def hello():
    print("Hello, world!")
```
````

- Admonitions:

```markdown
:::note
This is a note box.
:::

:::tip
This is a tip.
:::

:::warning
This is a warning.
:::
```

### Example: A complete minimal post

```markdown
---
title: 'My New Learning'
authors: [ssj]
tags: [python, testing]
date: 2026-10-01
---

## Introduction

Here's what I learned today...

## Key Takeaways

- Point one
- Point two
```

That's it! Save the file and it will appear on the blog.

---

## 🏷️ How to Add or Update Tags

Tags are automatically generated from the `tags` field in each post's frontmatter. There's **no separate index to maintain** — Docusaurus builds the `/tags` page and individual `/tags/<tag-name>` pages automatically.

To use a new tag, just include it in a post's frontmatter:

```yaml
tags: [new-tag, existing-tag]
```

### Tag naming conventions

- Use lowercase `kebab-case` (e.g., `code-review`, `open-source`)
- Keep tags broad enough to be reused across posts
- Check existing tags at `/tags` on the live site before creating similar ones

---

## 👤 How to Add or Update Authors

Authors are defined in [`blog/authors.yml`](blog/authors.yml). To add a new author:

```yaml
ssj:
  name: SSJ
  title: Software Engineer & Lifelong Learner
  url: https://github.com/Ssj-007
  image_url: https://github.com/Ssj-007.png

newauthor:
  name: Jane Doe
  title: Guest Writer
  url: https://github.com/janedoe
  image_url: https://github.com/janedoe.png
```

Then reference the author in a post's frontmatter:

```yaml
authors: [newauthor]
# or multiple authors:
authors: [ssj, newauthor]
```

---

## 🧭 How Navigation & Indexing Works

You **do not need to manually update any index or navigation**. Docusaurus handles this automatically:

| What | How it's generated |
|------|--------------------|
| **Blog listing** (homepage) | Auto-generated from all files in `blog/`, sorted by `date` (newest first) |
| **Tags page** (`/tags`) | Auto-generated from all `tags` across all posts |
| **Individual tag pages** (`/tags/<tag>`) | Auto-generated for each unique tag |
| **Archive** (`/archive`) | Auto-generated chronological archive of all posts |
| **RSS feed** (`/rss.xml`) | Auto-generated from all published posts |
| **Atom feed** (`/atom.xml`) | Auto-generated from all published posts |
| **Navbar** | Configured in `docusaurus.config.ts` → `themeConfig.navbar` |
| **Footer** | Configured in `docusaurus.config.ts` → `themeConfig.footer` |
| **Docs sidebar** | Auto-generated from `docs/` directory (see `sidebars.ts`) |

### Changing navbar / footer links

Edit `docusaurus.config.ts` → `themeConfig.navbar` and `themeConfig.footer` sections.

---

## 🚢 Hosting on GitHub Pages — Step-by-Step

This site is configured for **automatic deployment** via GitHub Actions. Here's how to get it live.

### Prerequisites
- A GitHub account
- This repo pushed to GitHub (your repo: `Ssj-007/learn-with-ssj`)

### Step 1 — Push your code to GitHub

If you haven't pushed the Docusaurus project yet:

```bash
git add .
git commit -m "Set up Docusaurus blog"
git push origin main
```

### Step 2 — Enable GitHub Pages (one-time setup)

1. Go to your repository on GitHub: **https://github.com/Ssj-007/learn-with-ssj**
2. Click **Settings** (top tab)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment** → **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
5. Save — that's it for the one-time config.

> ⚠️ You must choose **GitHub Actions**, not "Deploy from a branch". The workflow file (`.github/workflows/deploy.yml`) handles the build and deploy automatically.

### Step 3 — Trigger the first deployment

Pushing to `main` automatically triggers the workflow. You can also trigger it manually:

1. Go to your repo → **Actions** tab
2. Select **Deploy to GitHub Pages** in the left sidebar
3. Click **Run workflow** → **Run workflow**

### Step 4 — Watch the build

1. In the **Actions** tab, click the running workflow to see live logs
2. It installs dependencies, builds the site, and deploys to GitHub Pages
3. The build takes ~1–2 minutes

### Step 5 — Visit your live site

Once the workflow shows a green ✅, your site is live at:

🌐 **https://ssj-007.github.io/learn-with-ssj/**

It may take 1–2 minutes for the first deployment to propagate.

### How automatic deployment works

Every time you push to the `main` branch, the GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Installs dependencies (`npm ci`)
2. Builds the static site (`npm run build` → outputs to `./build`)
3. Uploads the build artifact
4. Deploys it to GitHub Pages

### Manual deployment (alternative — not recommended)

If you prefer deploying from your local machine instead of GitHub Actions:

```bash
# This builds and pushes to a gh-pages branch directly
npm run deploy
```

> Note: If you use `npm run deploy`, set the Pages source to "Deploy from a branch" → `gh-pages` instead of "GitHub Actions". Don't use both methods.

### Troubleshooting

| Problem | Solution |
|---------|----------|
| **Site shows 404** | Wait 1–2 min for propagation; confirm Pages source = "GitHub Actions" |
| **Build fails in Actions** | Check the Actions tab logs; run `npm run build` locally to reproduce |
| **CSS/assets missing** | Confirm `baseUrl` in `docusaurus.config.ts` matches `/learn-with-ssj/` |
| **Custom domain** | Add a `CNAME` file in `static/CNAME` with your domain; update `url` in config |

---

## 🎨 Customization

### Change the theme colors

Edit [`src/css/custom.css`](src/css/custom.css) and modify the CSS variables:

```css
:root {
  --ifm-color-primary: #2e8555;  /* Change this to your brand color */
}
```

### Change the site title, tagline, or URL

Edit [`docusaurus.config.ts`](docusaurus.config.ts):

```typescript
const config: Config = {
  title: 'Learn with SSJ',
  tagline: 'Sharing my knowledge from what I learn on a daily basis.',
  url: 'https://ssj-007.github.io',
  baseUrl: '/learn-with-ssj/',
  // ...
};
```

### Change the logo

Replace [`static/img/logo.svg`](static/img/logo.svg) with your own SVG or image file. Update the reference in `docusaurus.config.ts` → `themeConfig.navbar.logo`.

---

## 📱 Responsive Design

This site is fully responsive and adapts to **mobile, tablet, and desktop**:

| Breakpoint | Max Width | Adjustments |
|------------|----------|------------|
| Large desktop | ≥ 1440px | Comfortable max reading width (820px), slightly larger font |
| Desktop (default) | 1025–1439px | Standard layout with right-side TOC |
| Tablet / small laptop | ≤ 1024px | Slightly smaller font, TOC moves to collapsible |
| Mobile | ≤ 768px | Fluid typography, full-width pagination, touch-friendly nav (44px targets), horizontal-scroll tables, hover-lift disabled |
| Small phone | ≤ 480px | Tighter padding, stacked footer links |

Key responsive features (see [`src/css/custom.css`](src/css/custom.css)):
- **Fluid typography** that scales with viewport
- **Mobile navbar** with a hamburger sidebar drawer and 44px touch targets
- **Table of contents** — On desktop the right sidebar TOC shows on scroll. On tablet/mobile a custom collapsible **"On this page"** panel appears at the top of each blog post (see `src/components/MobileToc/`), with scroll-spy highlighting and smooth scrolling to sections. This ensures navigation is always reachable even when the window is minimized.
- **Pagination** stays full-width and tappable on all screens
- **Tables** horizontally scroll on narrow screens instead of breaking layout
- **Touch devices** (`pointer: coarse`) skip hover-only animations for a cleaner experience
- **Reduced-motion** support for accessibility

---

## 📝 Content Workflow Summary

```
1. Write post     →  Create blog/YYYY-MM-DD-my-post.md with frontmatter
2. Preview        →  npm start (view at localhost:3000)
3. Commit & push  →  git add, git commit, git push origin main
4. Auto-deploy    →  GitHub Actions builds & deploys to GitHub Pages
5. Live           →  https://ssj-007.github.io/learn-with-ssj/
```

No index updates, no navigation edits, no manual deployment — just write Markdown and push.

---

## 📚 Tech Stack

- **Framework:** [Docusaurus 3](https://docusaurus.io/)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Language:** TypeScript + Markdown/MDX
