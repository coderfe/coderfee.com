import React from 'react';
import styled from 'styled-components';
import { CopyFilled } from '@ant-design/icons';

const ShareWrapper = styled.div`
  width: 230px;
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: var(--base-border-radius);
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InputAction = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 38px;
  height: 38px;
  line-height: 38px;
  border-radius: 4px;
  border: none;
  text-align: center;
  cursor: pointer;
  background-color: var(--primary-color);
  transition: var(--base-transition);

  &:hover {
    background-color: var(--primary-dark-color);
  }

  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 0;
  padding-left: 0.5rem;
  border-radius: 4px;
  color: var(--disbaled-text-color);
  background-color: var(--disbaled-background-color);
  border: none;
  cursor: not-allowed;
`;

export const Share = ({ url }) => {
  const handleIconClick = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const { host, protocol } = window.location;
  const value = `${protocol}://${host}${url}`;

  return (
    <ShareWrapper>
      <Title>分享</Title>
      <InputWrapper>
        <Input value={value} disabled />
        <InputAction onClick={handleIconClick}>
          <CopyFilled style={{ color: '#fff' }} size="14" />
        </InputAction>
      </InputWrapper>
    </ShareWrapper>
  );
};
