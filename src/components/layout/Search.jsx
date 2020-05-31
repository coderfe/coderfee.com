import React from 'react';
import styled from 'styled-components';
import { Tags } from './Tags';
import { Input } from '../Input';
import { SearchOutlined } from '@ant-design/icons';

const SearchWrapper = styled.div`
  padding: 1rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  background-color: #fff;
  margin-top: var(--base-margin);
`;

export const Search = () => {
  return (
    <SearchWrapper>
      <Input placeholder="Bingo...">
        <SearchOutlined style={{ color: '#fff' }} />
      </Input>
      <Tags />
    </SearchWrapper>
  );
};
