import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import { BookOutlined, CalendarOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

const NavigatorContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: var(--box-shadow);

  a {
    font-size: 16px;
    color: var(--secondary-text-color);
    text-decoration: none;
    transition: all 0.2s linear;

    span {
      width: 38px;
      height: 38px;
      line-height: 38px;
      border-radius: 5px;
      margin-right: 3px;
      text-align: center;
      background-color: #f5f5f5;
      transition: all 0.2s linear;
    }
  }

  a:hover,
  a[aria-current='page'] {
    font-weight: bold;
    color: var(--primary-text-color);

    span {
      color: #fff !important;
      background-color: var(--primary-light-color);
    }
  }
`;

const style = { color: '#333' };

export const Navigator = () => {
  return (
    <NavigatorContainer>
      <AniLink paintDrip hex="#af877c" duration={1} to="/">
        <HomeOutlined style={style} />
        此间
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/books">
        <BookOutlined style={style} />
        此书
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/about">
        <UserOutlined style={style} />
        此人
      </AniLink>
      <AniLink paintDrip hex="#af877c" duration={1} to="/year">
        <CalendarOutlined style={style} />
        此年
      </AniLink>
    </NavigatorContainer>
  );
};
