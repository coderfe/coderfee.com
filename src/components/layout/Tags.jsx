import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const TagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #fff;
`

const Tag = styled.span`
  margin-top: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  color: var(--secondary-text-color);
  cursor: default;
  
  &:hover {
    color: var(--primary-color);
  }
`;

export const Tags = () => {
  const data = useStaticQuery(graphql`
    query Tags {
      allMarkdownRemark {
        distinct(field: frontmatter___tags)
        group(field: frontmatter___tags) {
          totalCount
        }
      }
    }
  `);

  const { distinct: tagList } = data.allMarkdownRemark;

  return (
    <TagsWrapper>
      {tagList.map(item => (
        <Tag key={item}>#{item}</Tag>
      ))}
    </TagsWrapper>
  )
}