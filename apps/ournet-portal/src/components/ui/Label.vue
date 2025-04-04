<template>
  <label class="block font-medium text-gray-800 mb-1">
    <span v-if="value">{{ value }}</span>
    <span v-else>
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiLabel",

  props: {
    value: {
      type: String,
      default: "",
    },
  },
});
</script>
