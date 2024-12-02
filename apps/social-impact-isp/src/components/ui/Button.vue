<template>
  <component
    :is="tag"
    :class="[
      rootClasses,
      sizeClasses,
      outlineBaseClasses,
      themeClasses,
      roundedClasses,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiButton",

  props: {
    tag: {
      type: String,
      default: "a",
    },
    size: {
      type: String,
      default: "md",
    },
    theme: {
      type: String,
      default: "primary",
    },
    hasIcon: Boolean,
    outline: Boolean,
    rounded: Boolean,
  },

  computed: {
    rootClasses(): string {
      return "inline-flex items-center justify-center font-medium focus:outline-none select-none shrink-0 cursor-pointer transition ease-in-out duration-150";
    },

    sizeClasses(): string {
      if (this.size === "lg") {
        return this.hasIcon
          ? "p-3 text-lg leading-5"
          : "px-8 py-3 text-lg leading-5";
      } else if (this.size === "sm") {
        return this.hasIcon
          ? "p-1 text-sm leading-5"
          : "px-4 py-1 text-sm leading-5";
      } else {
        return this.hasIcon
          ? "p-2 text-base leading-5"
          : "px-5 py-2 text-base leading-5";
      }
    },

    outlineBaseClasses(): string {
      if (this.outline) {
        return "border-2";
      } else {
        return "border-2 border-transparent";
      }
    },

    themeClasses(): string {
      if (this.theme === "primary") {
        if (this.outline) {
          return "bg-transparent border-white hover:bg-brand hover:border-black focus:bg-brand focus:border-black text-white";
        } else {
          return "bg-white hover:bg-white focus:bg-white text-white";
        }
      } else if (this.theme === "secondary") {
        if (this.outline) {
          return "";
        } else {
          return "bg-brand hover:bg-brand focus:bg-brand text-white";
        }
      } else if (this.theme === "dark") {
        if (this.outline) {
          return "bg-transparent border-white hover:bg-brand focus:bg-brand focus:border-black text-white focus:text-black";
        } else {
          return "bg-brand hover:bg-brand focus:bg-brand hover:text-white focus:text-white text-white";
        }
      } else if (this.theme === "danger") {
        if (this.outline) {
          return "border-red-300 text-red-700 bg-white hover:text-red-500 active:text-red-800 active:bg-red-100";
        } else {
          return "bg-red-600 hover:bg-red-500 focus:bg-red-500 text-white";
        }
      } else {
        return "border-gray-300 text-gray-700 bg-white hover:text-gray-500 active:text-gray-800 active:bg-gray-100";
      }
    },

    roundedClasses(): string {
      if (this.rounded) {
        return "rounded-xl";
      } else {
        return "";
      }
    },
  },
});
</script>
