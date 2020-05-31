import React from 'react';
import styled from 'styled-components';
import { CopyFilled } from '@ant-design/icons';
import { Input } from '../Input';

const ShareWrapper = styled.div`
  width: 230px;
  padding: 0.5rem;
  box-shadow: var(--box-shadow);
  border-radius: var(--base-border-radius);
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Share = ({ url }) => {
  const handleIconClick = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const { host, protocol } = window.location;
  const value = `${protocol}//${host}${url}`;

  return (
    <ShareWrapper>
      <Title>分享</Title>
      <Input value={value} onClick={handleIconClick}>
        <CopyFilled style={{ color: '#fff' }} size="14" />
      </Input>
    </ShareWrapper>
  );
};
