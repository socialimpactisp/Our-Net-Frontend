<template>
  <div>
    <div class="relative bg-brand py-16">
      <div class="max-w-screen-2xl mx-auto px-6">
        <div class="max-w-xl mx-auto text-white">
          <h1 class="text-5xl font-black tracking-tight">
            Thank you for connecting
          </h1>
          <p class="mt-4 text-xl font-medium text-gray-200">
            Thank you for choosing the Social Impact ISP as your broadband
            provider - your payment has been received.
          </p>
        </div>
      </div>
    </div>

    <div class="relative bg-white py-16">
      <div class="max-w-screen-2xl mx-auto px-6">
        <div class="max-w-xl mx-auto text-gray-800 text-lg">
          <p class="mb-2">Cheers</p>
          <p class="font-semibold">The Social Impact ISP team</p>

          <div class="mt-8 flex items-center space-x-4">
            <ui-button tag="router-link" to="/" rounded theme="dark">
              Go to homepage
            </ui-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UiButton from "@/components/ui/Button.vue";

export default defineComponent({
  name: "SignUpSuccess",

  components: {
    UiButton,
  },
});
</script>
