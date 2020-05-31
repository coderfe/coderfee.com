import axios from 'axios';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import avatar from '../../images/avatar.jpg';
import { BingoCount } from '../BingoCount';

const ProfileWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 160px 1fr;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  background-color: #fff;
  margin-top: var(--base-margin);
`;

const ProfileAvatar = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 10px;

  img {
    max-width: 100%;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: var(--secondary-text-color);
`;

const ProfileInfoCount = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #f4f6f9;
`;

const ProfileAction = styled.a`
  display: block;
  height: 34px;
  line-height: 34px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  background-color: var(--primary-color);
  transition: var(--base-transition);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

const fetchRepos = async () => {
  const { data = [] } = await axios.get('https://api.github.com/users/coderfe/repos');
  return data;
};

export const Profile = () => {
  const { data: repos, status: reposStatus } = useQuery('repos', fetchRepos);

  const staticQueryData = useStaticQuery(graphql`
    query Query {
      allMarkdownRemark {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  const { edges: artilces } = staticQueryData.allMarkdownRemark;

  return (
    <ProfileWrapper>
      <ProfileAvatar>
        <img src={avatar} alt="avatar" />
      </ProfileAvatar>
      <ProfileInfo>
        <div>
          <Title>coderfee</Title>
          <SubTitle>我在这里……写代码</SubTitle>
        </div>
        <ProfileInfoCount>
          <BingoCount title="Articles" count={artilces.length} />
          <BingoCount title="Repos" count={41} />
          <BingoCount title="Followers" count={12} />
        </ProfileInfoCount>
        <ProfileAction href="mailto:coderfee@outlook.com">Email</ProfileAction>
      </ProfileInfo>
    </ProfileWrapper>
  );
};
