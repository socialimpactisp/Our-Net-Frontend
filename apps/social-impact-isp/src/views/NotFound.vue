<template>
  <div class="relative py-16">
    <div class="max-w-screen-2xl mx-auto px-6">
      <div class="max-w-xl text-gray-900">
        <h1 class="text-5xl font-black tracking-tight">Page not found</h1>
        <p class="mt-4 text-xl font-medium">
          We can't seem to find the page you are looking for.
        </p>
        <div class="mt-4 flex items-center space-x-4">
          <ui-button tag="router-link" to="/" theme="dark" outline>
            Go to homepage
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UiButton from "@/components/ui/Button.vue";

export default defineComponent({
  name: "NotFound",

  components: {
    UiButton,
  },
});
</script>
