import type { Meta, StoryObj } from "@storybook/vue3";
import UiProse from "../components/UiProse.vue";

const meta = {
  title: "Components/UI/Prose",
  component: UiProse,
  tags: ["autodocs"],
} satisfies Meta<typeof UiProse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaxWidth: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { UiProse },
    template: `
      <ui-prose>
        <p>
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
          The maximum width of this content will be smaller than the container. It's an ideal size for reading large blocks of text.
        </p>
      </ui-prose>
    `,
  }),
};

export const Paragraphs: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { UiProse },
    template: `
      <ui-prose>
        <p>Paragraph spacing</p>
        <p>Paragraph spacing</p>
      </ui-prose>
    `,
  }),
};

export const ListStyles: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { UiProse },
    template: `
      <ui-prose>
        <ul>
          <li>Unordered lists use disc bullets and are spaced nicely
            <ul>
              <li>Nested lists are indented</li>
            </ul>
          </li>
        </ul>
        <ol>
          <li>Ordered lists use decimal bullets and are spaced nicely
            <ol>
              <li>Nested lists are indented</li>
            </ol>
          </li>
        </ol>
        <ul>
          <li>Nested lists can optionally be indented without bullets.
            <ul class="indent">
              <li>Indented lists have no bullet</li>
              <li>Indented lists have no bullet</li>
            </ul>
          </li>
        </ul>
      </ui-prose>
    `,
  }),
};

export const Typography: Story = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { UiProse },
    template: `
      <ui-prose>
        <h4>H4 headings are styled</h4>
        <p><strong>Strong font weight can be applied</strong></p>
        <p><a href="#">Anchor links are underlined, and highlight with brand colour on hover.</a></p>
        <p><small>Small font variant can be applied</small></p>
      </ui-prose>
    `,
  }),
};
