import type { Meta, StoryObj } from "@storybook/vue3";
import { CustomerComplaints } from "src/affinity";

const meta = {
  title: "Components/Affinity/Customer Complaints",
  component: CustomerComplaints,
  tags: ["autodocs"],
  args: {
    ispName: "[Name Of ISP]",
    website: "https://example.org/",
  },
} satisfies Meta<typeof CustomerComplaints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
