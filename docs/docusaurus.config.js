// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TypeScript Genie",
  tagline: "Set of utilities to help with generating TS files ",
  favicon: "img/favicon.png",

  url: "https://ts-genie.vercel.app/",
  baseUrl: "/",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    // ....
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/AlfonzAlfonz/ts-genie/tree/main/docs",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/tailwind.css"),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
      navbar: {
        title: "Typescript Genie",
        logo: {
          alt: "Typescript Genie Logo",
          src: "img/ts-genie-small.png",
        },
        items: [
          {
            type: "doc",
            docId: "quick-start",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/AlfonzAlfonz/ts-genie/tree/main/examples",
            position: "left",
            label: "Examples",
          },
          {
            href: "https://github.com/AlfonzAlfonz/ts-genie",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `created by @AlfonzAlfonz, docs built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
