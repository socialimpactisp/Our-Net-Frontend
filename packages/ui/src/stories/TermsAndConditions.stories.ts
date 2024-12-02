import type { Meta, StoryObj } from "@storybook/vue3";
import { TermsAndConditions } from "src/affinity";

const meta = {
  title: "Components/Affinity/Terms And Conditions",
  component: TermsAndConditions,
  tags: ["autodocs"],
  args: {
    ispName: "[Name Of ISP]",
    parentCompany: "[Parent Company]",
  },
} satisfies Meta<typeof TermsAndConditions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
