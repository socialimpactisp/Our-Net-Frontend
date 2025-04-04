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
      return "text-[13px] font-sans font-semibold tracking-wide hover:text-brand-red focus:outline-none transition-colors duration-200 select-none";
    },
    activeClasses(): string {
      return this.active ? "text-brand-red" : "text-brand-dark";
    },
  },
});
</script>
