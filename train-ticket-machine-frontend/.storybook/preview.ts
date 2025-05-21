import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#121212" },
        { name: "light", value: "#f0f0f0" },
      ],
    },
  },
};

export default preview;
