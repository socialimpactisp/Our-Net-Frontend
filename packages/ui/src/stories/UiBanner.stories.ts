import UiBanner from "../components/UiBanner.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: "Components/UI/Banner",
  component: UiBanner,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    inverted: false,
    default: "This is the banner",
  },
} satisfies Meta<typeof UiBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Content: Story = {
  args: {
    content: "This is the content",
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
};
