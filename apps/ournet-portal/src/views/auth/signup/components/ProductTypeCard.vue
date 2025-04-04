<template>
  <div
    class="bg-background p-8 border rounded-xl cursor-pointer transition duration-150 ease-in-out"
    :class="[cardClasses]"
  >
    <div class="flex justify-between items-center">
      <h4 class="text-2xl sm:text-4xl font-black">
        {{ title }}
      </h4>
      <div
        class="ml-4 p-1 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border"
        :class="[checkboxClasses]"
      >
        <icon-check v-if="selected" class="h-8" stroke-width="3" />
      </div>
    </div>
    <h5 class="text-xl font-semibold opacity-75">
      {{ description }}
    </h5>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconCheck from "@/components/icons/Check.vue";

export default defineComponent({
  name: "ProductTypeCard",

  components: {
    IconCheck,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selected: Boolean,
  },

  computed: {
    cardClasses(): string {
      return this.selected
        ? "bg-background border-brand text-black"
        : "bg-background border-gray-300 text-black";
    },

    checkboxClasses(): string {
      return this.selected
        ? "bg-black text-white border-transparent"
        : "border-gray-700";
    },
  },
});
</script>
