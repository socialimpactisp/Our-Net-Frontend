<template>
  <component :is="tag" :class="classes" v-bind="$attrs" @click="selectItem">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "UiDropdownLink",

  props: {
    tag: {
      type: String,
      default: "a",
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["click"],

  setup() {
    const close = inject("close", () => {
      return false;
    });

    return {
      close,
    };
  },

  computed: {
    classes(): string {
      return "block w-full cursor-pointer px-4 py-2 text-sm font-medium leading-5 text-gray-700 text-left hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out";
    },

    isClickable(): boolean {
      return !this.custom;
    },
  },

  methods: {
    selectItem() {
      if (!this.isClickable) return;

      this.close();
      this.$emit("click");
    },
  },
});
</script>
