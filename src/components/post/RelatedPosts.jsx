import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { CalendarFilled } from '@ant-design/icons';

const RelatedPostsContainer = styled.div`
  /* width: 230px; */
  margin-top: var(--base-margin);
  border-radius: var(--base-border-radius);
  /* box-shadow: var(--box-shadow); */
  background-color: #fff;

  a {
    color: var(--primary-text-color);
    text-decoration: none;
  }
`;

const PostCard = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 0.6rem;
  padding: 0.6rem;

  & + & {
    border-top: 1px solid var(--border-color);
  }
`;

const PostCardCover = styled.div`
  width: 100px;
  height: 80px;
  background: url('https://source.unsplash.com/random');
  background-size: 100%;
  border-radius: var(--base-border-radius);
`;

const PostCardInfo = styled.div`
  a {
    font-weight: bold;
    font-size: 13px;
    transition: var(--base-transition);

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const PostCardSub = styled.div`
  font-size: 12px;
  color: var(--secondary-text-color);
`;

export default function relatedPosts({ posts }) {
  return posts.length > 0 ? (
    <RelatedPostsContainer>
      {posts.map((post) => {
        return (
          <PostCard key={post.node.frontmatter.path}>
            <PostCardCover />
            <PostCardInfo>
              <Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link>
              <PostCardSub>
                <CalendarFilled style={{ color: 'var(--secondary-text-color)' }} />
                &nbsp;
                {post.node.frontmatter.date}
              </PostCardSub>
            </PostCardInfo>
          </PostCard>
        );
      })}
    </RelatedPostsContainer>
  ) : null;
}
