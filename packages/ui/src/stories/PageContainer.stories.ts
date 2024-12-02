import type { Meta, StoryObj } from "@storybook/vue3";
import { PageContainer } from "../layout";

const meta = {
  title: "Components/Layout/Page Container",
  component: PageContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { PageContainer },
    template: `
      <PageContainer>
        <p>This component is used to pad the content of a page.</p>
      </PageContainer>
    `,
  }),
};
