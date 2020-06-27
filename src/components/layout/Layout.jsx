import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { Profile } from './Profile';
import SEO from '../seo';
import { Search } from './Search';
import { Navigator } from './Navigator';
import { Footer } from './Footer';

toast.configure({ autoClose: 2000 });

const Layout = ({ seoTitle, seoDescription, meta, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          ICP
        }
      }
    }
  `);
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const pageTitle = seoTitle ? seoTitle : siteTitle;
  const pageDescription = seoDescription ? seoDescription : siteDescription;

  return (
    <>
      <SEO lang="zh-cmn-Hans" title={pageTitle} description={pageDescription} meta={meta || []} />
      <div className="layout">
        <div>
          <Navigator />
          <Profile />
          <Search />
          <Footer icp={data.site.siteMetadata.ICP} />
        </div>

        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};

export default Layout;
