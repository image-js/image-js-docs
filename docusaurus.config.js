// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('path');

const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const lightCodeTheme = require('prism-react-renderer').themes.github;

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

/** @type {() => Promise<import('@docusaurus/types').Config>} */
async function createConfig() {
  const remarkPlugins = [(await import('remark-math')).default];
  const rehypePlugins = [(await import('rehype-katex')).default];
  return {
    title: 'ImageJS',
    tagline: 'Advanced image processing in JavaScript.',
    favicon: 'img/image-js-favicon.svg',

    // Set the production url of your site here
    url: 'https://docs.image-js.org/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    plugins: [
      demoLoaderPlugin,
      [
        '@dipakparmar/docusaurus-plugin-umami',
        /** @type {import('@dipakparmar/docusaurus-plugin-umami').Options} */
        ({
          websiteID: '40a43007-421b-4e66-bd35-b333727a09d3',
          analyticsDomain: 'umami.zakodium.com',
          dataDomains: 'docs.image-js.org', // Comma-separated list of domains
        }),
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
        {
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: 'https://github.com/image-js/image-js-docs/tree/main/',
            remarkPlugins,
            rehypePlugins,
          },
          blog: {
            showReadingTime: true,
            blogTitle: 'Docusaurus blog!',
            blogDescription: 'A Docusaurus powered blog!',
            blogSidebarTitle: 'All posts',
            blogSidebarCount: 'ALL',
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: 'https://github.com/image-js/image-js-docs/tree/main/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        },
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
        image: '/img/image-js-social-card.png',
        metadata: [
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { name: 'twitter:image:width', content: '1200' },
          { name: 'twitter:image:height', content: '630' },
        ],
        colorMode: {},
        announcementBar: {
          id: 'release-1.0',
          content:
            'ImageJS 1.0 has been released! <a href="/blog/releases/1.0">Click here</a> to read our announcement post.',
          textColor: '#fff',
          backgroundColor: '#1c4ed8',
          isCloseable: true,
        },
        navbar: {
          title: 'ImageJS',
          logo: {
            alt: 'ImageJS',
            src: 'img/image-js-favicon.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'getting-started',
              position: 'left',
              label: 'Docs',
            },
            { to: '/blog', label: 'Blog', position: 'left' },
            {
              href: 'https://api.image-js.org/',
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
                  to: '/docs/getting-started',
                },
                {
                  label: 'Basics',
                  to: '/docs/basics',
                },
                {
                  label: 'Features',
                  to: '/docs/features',
                },
              ],
            },
            {
              title: 'Learn',
              items: [
                {
                  label: 'Tutorials',
                  to: '/docs/tutorials',
                },
                {
                  label: 'Useful tips',
                  to: '/docs/useful-tips',
                },
                {
                  label: 'Glossary',
                  to: '/docs/glossary',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/image-js/image-js',
                },
                {
                  label: 'API reference',
                  href: 'https://api.image-js.org/',
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
        algolia: {
          appId: '3SP7D0W5IO',
          apiKey: 'b68edce995723ba044ae5792d5ccf61c',
          indexName: 'ImageJS documentation',
        },
      }),
  };
}

module.exports = createConfig;
