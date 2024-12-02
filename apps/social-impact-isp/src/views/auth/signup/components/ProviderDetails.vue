<template>
  <span @click="gettingProviderDetails = true">
    <slot />
  </span>

  <ui-modal v-model:active="gettingProviderDetails" max-width="md">
    <div class="px-6 py-4">
      <div class="mb-4">
        <h2 class="text-md font-medium mb-2">
          Currently receive statements via email?
        </h2>
        <p class="text-gray-600">
          Search for emails from your previous provider and write down their
          name and your account number with them, we will need that for the next
          step.
        </p>
      </div>
      <div class="mb-4">
        <h2 class="text-md font-medium mb-2">
          Or do you get your statements through the post?
        </h2>
        <p class="text-gray-600">
          Grab a recent statement or invoice from your previous provider and
          keep their name and your account number to hand for the next step.
        </p>
      </div>
      <p class="font-medium">
        We look forward to switching you over to our Social Impact ISP for Staff
        & Friends.
      </p>
    </div>

    <div
      class="px-6 py-4 flex flex-col sm:flex-row items-center border-t sm:space-x-2 space-y-2 sm:space-y-0"
    >
      <ui-button
        theme="default"
        class="w-full sm:w-auto"
        @click="gettingProviderDetails = false"
      >
        Got it, thanks
      </ui-button>
    </div>
  </ui-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UiButton from "@/components/ui/Button.vue";
import UiModal from "@/components/ui/Modal.vue";

export default defineComponent({
  name: "ProviderDetails",

  components: {
    UiButton,
    UiModal,
  },

  data() {
    return {
      gettingProviderDetails: false,
    };
  },
});
</script>
