import type { Meta, StoryObj } from "@storybook/vue3";
import { AppContainer } from "../layout";

const meta = {
  title: "Components/Layout/Container",
  component: AppContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof AppContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { AppContainer },
    template: `
      <AppContainer>
        <p>This content has a restricted width based on the break point of the current viewport, and is centered horizontally.</p>
        <p>For more information, see <a href="https://tailwindcss.com/docs/container" target="_blank" rel="noreferrer">https://tailwindcss.com/docs/container</a>.
      </AppContainer>
    `,
  }),
};
