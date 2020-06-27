import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  margin-top: var(--base-margin);
  padding: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: var(--base-border-radius);
  color: var(--primary-text-color);
  background-color: #fff;
  text-align: center;
  font-size: 14px;

  a {
    color: var(--primary-light-color);
  }
`;

export const Footer = ({ icp }) => {
  return (
    <FooterContainer id="footer">
      © {new Date().getFullYear()},{` `}
      <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        {icp}
      </a>
    </FooterContainer>
  );
};
