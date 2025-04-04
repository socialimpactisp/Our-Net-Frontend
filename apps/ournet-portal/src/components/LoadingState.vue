<template>
  <div
    v-if="loading"
    class="relative"
    :class="{ 'min-h-[100px]': !overlay }"
    role="status"
    aria-busy="true"
    aria-label="Loading"
  >
    <div
      :class="{
        'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50':
          overlay,
        'flex items-center justify-center py-4': !overlay,
      }"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"
      ></div>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="overlay" :class="{ 'opacity-50': loading }">
      <slot />
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingState",

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
