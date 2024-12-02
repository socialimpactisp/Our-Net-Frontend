<template>
  <component :is="tag" :class="[rootClasses, activeClasses]" v-bind="$attrs">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountNavItem",

  props: {
    tag: {
      type: String,
      default: "a",
    },
    active: Boolean,
  },

  computed: {
    rootClasses(): string {
      return "flex items-center px-3 py-2 rounded-lg font-medium leading-5 tracking-tight focus:outline-none transition duration-150 ease-in-out cursor-pointer select-none";
    },

    activeClasses(): string {
      return this.active
        ? "bg-gray-300 text-gray-900"
        : "text-gray-900 hover:text-gray-700 focus:text-gray-900 hover:bg-gray-200";
    },
  },
});
</script>
