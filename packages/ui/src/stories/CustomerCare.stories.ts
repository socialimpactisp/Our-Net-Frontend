import type { Meta, StoryObj } from "@storybook/vue3";
import { CustomerCare } from "src/affinity";

const meta = {
  title: "Components/Affinity/Customer Care",
  component: CustomerCare,
  tags: ["autodocs"],
  args: {
    ispName: "[Name Of ISP]",
  },
} satisfies Meta<typeof CustomerCare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
