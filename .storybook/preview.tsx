import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import { withMockContext } from "../src/test-utils/decorator";

const preview: Preview = {
  decorators: [withMockContext],
  parameters: {
    docs: {
      toc: { headingSelector: "h1, h2, h3, h4, h5, h6" },
    },
  },
  tags: [],
};

export default preview;
