import React, {useState, useEffect} from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

type TocItem = {
  id: string;
  value: string;
  level: number;
};

function scrollToHeading(anchor: string) {
  const el = document.getElementById(anchor);
  if (el) {
    const yOffset = -80; // account for sticky navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}

/**
 * Collapsible "On this page" navigation shown on tablet/mobile for blog posts.
 * The desktop right-sidebar TOC already handles navigation on large screens;
 * this component only renders at <= 996px (see styles.module.css).
 */
export default function MobileToc(): JSX.Element | null {
  const {toc} = useBlogPost();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // Filter to h2/h3 only for a clean mobile TOC
  const items: TocItem[] = toc.filter(
    (t: TocItem) => t.level === 2 || t.level === 3,
  );

  // Scroll-spy: highlight the heading currently in view
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.mobileToc} aria-label="On this page">
      <button
        type="button"
        className={styles.mobileTocToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}>
        <span className={styles.mobileTocLabel}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{marginRight: 8, flexShrink: 0}}>
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          On this page
        </span>
        <span
          className={`${styles.mobileTocChevron} ${
            open ? styles.mobileTocChevronOpen : ''
          }`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <ul
        className={`${styles.mobileTocList} ${
          open ? styles.mobileTocListOpen : ''
        }`}>
        {items.map((item) => (
          <li
            key={item.id}
            style={item.level === 3 ? {paddingLeft: '1rem'} : undefined}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
                setOpen(false);
              }}
              className={`${styles.mobileTocLink} ${
                activeId === item.id ? styles.mobileTocLinkActive : ''
              }`}
              dangerouslySetInnerHTML={{__html: item.value}}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
