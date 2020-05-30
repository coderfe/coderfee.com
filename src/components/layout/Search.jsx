import React from 'react';
import styled from 'styled-components';
import { Tags } from './Tags';
import { Input } from '../Input';
import { SearchOutlined } from '@ant-design/icons';

const SearchWrapper = styled.div`
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-top: 1.5rem;
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
