// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path');

const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const lightCodeTheme = require('prism-react-renderer').themes.github;
const katex = require('rehype-katex');
const math = require('remark-math');

async function demoLoaderPlugin() {
  return {
    name: 'demo-loader',

    /**
     *
     * @param {import('webpack').Configuration} config
     * @param {boolean} isServer
     * @returns {import('webpack').Configuration}
     */
    configureWebpack(config, isServer) {
      /** @type {import('webpack').Configuration} */
      const customConfig = {
        module: {
          rules: [
            {
              test: /\.demo.tsx$/,
              use: {
                loader: path.resolve(__dirname, 'demo-loader.webpack.cjs'),
              },
            },
          ],
        },
      };
      if (process.env.NODE_ENV === 'production' && !isServer) {
        customConfig.devtool = 'source-map';
      }
      return customConfig;
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ImageJS',
  tagline: 'Advanced image processing and manipulation in JavaScript.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://image-js-docs.pages.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Zakodium', // Usually your GitHub org/user name.
  projectName: 'image-js', // Usually your repo name.

  plugins: [
    demoLoaderPlugin,
    [
      '@orama/plugin-docusaurus-v3',
      {
        searchbox: {
          disableChat: true,
        },
      },
    ],
  ],

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/image-js/image-js-docs/tree/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'ImageJS',
        logo: {
          alt: 'ImageJS',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'Getting started',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://image-js.github.io/image-js-typescript/',
            label: 'API reference',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/Getting started',
              },
              {
                label: 'Basics',
                to: '/docs/Basics',
              },
              {
                label: 'Features',
                to: '/docs/Features',
              },
            ],
          },
          {
            title: 'Learn',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/Tutorials',
              },
              {
                label: 'Useful tips',
                to: '/docs/Useful tips',
              },
              {
                label: 'Glossary',
                to: '/docs/Glossary',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/image-js/image-js-typescript',
              },
              {
                label: 'API reference',
                href: 'https://image-js.github.io/image-js-typescript/',
              },
              {
                label: 'Zakodium',
                href: 'https://www.zakodium.com/',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
