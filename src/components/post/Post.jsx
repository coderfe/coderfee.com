import React from 'react';
import styled from 'styled-components';
import styles from '../../templates/blog-post.module.css';
import { BlockQuote } from './BlockQuote';
import NextAndPrevPosts from './NextAndPrevPosts';
import { Tags } from './Tags';

const PostCover = styled.div`
  height: 410px;
  border-radius: var(--base-border-radius);
  background: url('https://source.unsplash.com/random');
  background-size: cover;
  background-position: center;
`;

const Article = styled.article`
  width: 90%;
  padding: 1rem;
  margin: -100px auto 0 auto;
  background: #fff;
  border-radius: 10px;
`;

export const Post = ({ post: { tags, title, date, timeToRead, tldr, html, next, previous } }) => {
  return (
    <div className={styles.blogPost}>
      <PostCover />
      <Article>
        <Tags tags={tags} />
        <h1 className={styles.blogPostTitle}>{title}</h1>
        <div className={styles.blogPostSubTitle}>
          <span>{date}</span>
          <span>{timeToRead}min</span>
        </div>
        <BlockQuote content={tldr} />
        <div className={styles.blogPostContent} dangerouslySetInnerHTML={{ __html: html }} />

        <NextAndPrevPosts next={next} previous={previous} />
      </Article>
    </div>
  );
};
