import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Learn with SSJ',
  tagline: 'Sharing my knowledge from what I learn on a daily basis.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ssj-007.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/learn-with-ssj/',

  // GitHub pages deployment config.
  organizationName: 'Ssj-007',
  projectName: 'learn-with-ssj',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
        },
        blog: {
          path: 'blog',
          routeBasePath: '',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogTitle: 'Learn with SSJ',
          blogDescription: 'A tech blog sharing learnings on software engineering, AI, and open source.',
          postsPerPage: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Learn with SSJ',
      logo: {
        alt: 'Learn with SSJ Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Blog', position: 'left'},
        {to: '/tags', label: 'Tags', position: 'left'},
        {
          href: 'https://github.com/Ssj-007/learn-with-ssj',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Blog',
          items: [
            {label: 'All Posts', to: '/'},
            {label: 'Tags', to: '/tags'},
            {label: 'Archive', to: '/archive'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Ssj-007/learn-with-ssj',
            },
            {
              label: 'RSS',
              href: 'https://ssj-007.github.io/learn-with-ssj/rss.xml',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Learn with SSJ. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
