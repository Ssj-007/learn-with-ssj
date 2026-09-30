import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MobileToc from '@site/src/components/MobileToc';

type Props = WrapperProps<typeof BlogPostItem>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const {isBlogPostPage} = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {/* Inject the collapsible mobile TOC only on individual blog post pages.
          The desktop right-sidebar TOC handles navigation on large screens. */}
      {isBlogPostPage && <MobileToc />}
    </>
  );
}
