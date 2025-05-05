import AppFooter from "../layout/AppFooter.vue";
import AppFooterColumn from "../layout/AppFooterColumn.vue";
import AppFooterLink from "../layout/AppFooterLink.vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import logo from "../../assets/ournet-logo.png";

const meta = {
  title: "Components/Layout/Footer",
  component: AppFooter,
  tags: ["autodocs"],
  args: {
    company: "Our Net",
    logo,
  },
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AppFooter, AppFooterColumn, AppFooterLink },
    setup: () => ({ args }),
    template: `
      <app-footer v-bind="args">
            <app-footer-column heading="Column heading">
              <app-footer-link is="a" href="#">A footer link</app-footer-link>
              <app-footer-link is="a" href="#">Another footer link</app-footer-link>
            </app-footer-column>
            <app-footer-column>
              <app-footer-link is="a" href="#">Privacy Policy</app-footer-link>
              <app-footer-link is="a" href="#">Terms &amp; Conditions</app-footer-link>
            </app-footer-column>
      </app-footer>
    `,
  }),
};
