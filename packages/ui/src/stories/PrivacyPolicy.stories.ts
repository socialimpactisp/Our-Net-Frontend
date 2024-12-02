import type { Meta, StoryObj } from "@storybook/vue3";
import { PrivacyPolicy } from "src/affinity";

const meta = {
  title: "Components/Affinity/Privacy Policy",
  component: PrivacyPolicy,
  tags: ["autodocs"],
  args: {
    ispName: "[Name Of ISP]",
    parentCompany: "[Parent Company]",
  },
} satisfies Meta<typeof PrivacyPolicy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
