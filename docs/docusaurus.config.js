// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TS-Gen",
  tagline: "Set of utilities to help with generating TS files ",
  favicon: "img/favicon.ico",

  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",

  organizationName: "AlfonzAlfonz",
  projectName: "ts-gen",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/AlfonzAlfonz/ts-gen/docs",
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl: "https://github.com/AlfonzAlfonz/ts-gen/docs",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/AlfonzAlfonz/ts-gen",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/AlfonzAlfonz/ts-gen",
              },
            ],
          },
        ],
        copyright: `Denis Homolík, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
