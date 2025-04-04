<template>
  <div :class="classes">
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-0"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-0"
      appear
    >
      <div class="inline-block" :class="[width, height]">
        <svg
          class="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
        >
          <linearGradient
            id="a"
            gradientUnits="userSpaceOnUse"
            x1="32"
            y1="64"
            x2="32"
            y2="0"
          >
            <stop offset=".25" :stop-color="color" />
            <stop offset=".632" :stop-color="color" stop-opacity="0" />
          </linearGradient>
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#a)"
            stroke-width="8"
            stroke-miterlimit="10"
          />
          <path
            d="M12.75 52.33C7.36 47.23 4 40.01 4 32 4 16.54 16.54 4 32 4"
            fill="none"
            :stroke="color"
            stroke-width="8"
            stroke-miterlimit="10"
          />
          <circle cx="32" cy="4" r="4" :fill="color" />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingSpinner",

  props: {
    color: {
      type: String,
      default: "#F17B30",
    },
    classes: {
      type: String,
      default: "p-6 text-center",
    },
    width: {
      type: String,
      default: "w-12",
    },
    height: {
      type: String,
      default: "h-12",
    },
  },
});
</script>
