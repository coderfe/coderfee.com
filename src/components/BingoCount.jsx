import React from 'react';
import styled from 'styled-components';

const BingoCountWrapper = styled.div``;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--secondary-text-color);
`;

const Count = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-text-color);
  margin-top: 3px;
`;

export const BingoCount = ({ title, count }) => (
  <BingoCountWrapper>
    <Title>{title}</Title>
    <Count>{count}</Count>
  </BingoCountWrapper>
);
