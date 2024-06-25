import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      id="frontPage"
      className={clsx('hero hero--primary', styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>
          ImageJS is a JavaScript library designed to facilitate image
          processing and manipulation. ImageJS provides a wide range of features
          for developers to enhance, analyze, and transform images seamlessly.
          It includes functions for common tasks such as resizing, cropping,
          filtering, and color adjustments, all performed client-side without
          the need for server-side processing. This makes it an ideal tool for
          web applications that require real-time image editing capabilities.
          ImageJS is optimized for performance, ensuring quick and efficient
          operations even with high-resolution images, and is easy to integrate
          into existing projects with its intuitive API.
        </p>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/Getting started"
          >
            Getting started
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/docs/Tutorials/Tutorials"
          >
            Tutorials
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/docs/Features/Features"
          >
            Features
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className="main-wrapper">
        <HomepageHeader />
      </main>
    </Layout>
  );
}
