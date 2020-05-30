import React from 'react';
import styled from 'styled-components';

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

const StyledInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 0 0 0.5rem;
  border-radius: 4px;
  background-color: var(--disbaled-background-color);
  border: none;
  
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;

export const Input = ({ onClick, children, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...props} />
      <InputAction onClick={onClick}>
        {children}
      </InputAction>
    </InputWrapper>
  );
};
