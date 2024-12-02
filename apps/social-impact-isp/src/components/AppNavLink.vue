<template>
  <component :is="tag" :class="[rootClasses, activeClasses]" v-bind="$attrs">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppNavLink",

  props: {
    tag: {
      type: String,
      default: "a",
    },
    active: Boolean,
  },

  computed: {
    rootClasses(): string {
      return "text-base font-medium hover:text-gray-300 focus:outline-none transition duration-150 ease-in-out select-none";
    },
    activeClasses(): string {
      return this.active ? "text-gray-600" : "text-gray-400";
    },
  },
});
</script>
