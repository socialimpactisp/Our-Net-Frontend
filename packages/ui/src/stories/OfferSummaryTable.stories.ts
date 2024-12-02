import type { Meta, StoryObj } from "@storybook/vue3";
import { OfferSummaryTable } from "src/affinity";
import { plans } from "./data/products";

const meta = {
  title: "Components/Affinity/Offer Summary Table",
  component: OfferSummaryTable,
  tags: ["autodocs"],
  args: {
    ispName: "[Name Of ISP]",
    parentCompany: "[Parent Company]",
    plans,
  },
} satisfies Meta<typeof OfferSummaryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
