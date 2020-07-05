import { graphql, navigate } from 'gatsby';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';
import { Post } from '../components/post/Post';
import RelatedPosts from '../components/post/RelatedPosts';
import { Share } from '../components/post/Share';

export default function BlogPostTemplate({ data, pageContext }) {
  const { markdownRemark: post } = data;
  const { next, previous, relatedPosts } = pageContext;

  const { title, tldr, date, tags, path } = post.frontmatter;

  const handleKeyup = useCallback(
    (event) => {
      if (event.keyCode === 37) {
        // <-
        if (previous) {
          toast(`⬅️ ${previous.frontmatter.title}`);
          navigate(previous.frontmatter.path);
        }
      } else if (event.keyCode === 39) {
        // ->
        if (next) {
          toast(`➡️ ${next.frontmatter.title}`);
          navigate(next.frontmatter.path);
        }
      }
    },
    [next, previous]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyup]);

  return (
    <Layout seoTitle={title} seoDescription={tldr} meta={[{ name: `keyword`, content: (tags || []).join(' ') }]}>
      <Post post={{ title, tags, tldr, date, timeToRead: post.timeToRead, next, previous, html: post.html }}>
        <RelatedPosts posts={relatedPosts} />
      </Post>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      tableOfContents(maxDepth: 6, pathToSlugField: "frontmatter.path")
      frontmatter {
        path
        date(formatString: "MMM DD, YYYY")
        title
        tldr
        tags
      }
      timeToRead
    }
  }
`;
