import main from "../.storybook/main";

const newMain = { ...main, stories: ["../src/stories/Quickstart.mdx"] };
export default newMain;
