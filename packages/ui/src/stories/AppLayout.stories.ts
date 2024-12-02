import type { Meta, StoryObj } from "@storybook/vue3";
import logo from "../../assets/ournet-logo.png";
import { AppLayout, AppFooter } from "../layout";

const meta = {
  title: "Components/Layout/Layout",
  component: AppLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AppLayout, AppFooter },
    setup: () => ({ args }),
    template: `
      <AppLayout>
        <template #header>
          <div class="bg-gray-200 py-12 border-b">This is a placeholder for the header</div>
        </template>
        
        <div>This is the content</div>
        
        <template #footer>
          <AppFooter :inverted company="Digital Emporium" logo="${logo}"/>
        </template>
      </AppLayout>
    `,
  }),
};
