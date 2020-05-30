import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  grid-area: footer;
  margin-top: 1rem;
  padding: 1rem;
  color: white;
  background-color: #1c1c1c;
  text-align: center;
  font-size: 14px;

  a {
    color: var(--primary-light-color);
  }
`;

export default function Footer({ icp }) {
  return (
    <FooterContainer id="footer">
      © {new Date().getFullYear()},{` `}
      <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        {icp}
      </a>
    </FooterContainer>
  );
}
