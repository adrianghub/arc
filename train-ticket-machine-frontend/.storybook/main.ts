import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],

  // Configure Storybook build
  viteFinal: async (config) => {
    // Set the base path for the build
    // This ensures assets are loaded correctly from the /storybook/ path
    config.base = "/storybook/";
    return config;
  },
};

export default config;
