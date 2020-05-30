import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  display: inline-block;
  padding: 0.5rem;
  background-color: var(--primary-dark-color);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 6px;
  user-select: none;

  & + & {
    margin-left: 1rem;
  }
`;

export const Tags = ({ tags }) => (
  <div>
    {tags.map((tag, index) => (
      <Tag key={index}>{tag}</Tag>
    ))}
  </div>
);
