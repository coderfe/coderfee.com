import React from 'react';
import styled from 'styled-components';

const StyledBlockQuote = styled.blockquote`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f4f6f9;
  border-radius: 10px;
  line-height: 1.8;
`;

export const BlockQuote = ({ content }) => <StyledBlockQuote>{content}</StyledBlockQuote>;
