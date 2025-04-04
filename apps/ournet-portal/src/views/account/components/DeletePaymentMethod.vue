<template>
  <span
    class="block"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
    @click="startDeletingPaymentMethod"
  >
    <slot />
  </span>

  <ui-modal
    v-model:active="deletingPaymentMethod"
    :disable-close="loading"
    max-width="sm"
  >
    <div
      v-if="loading"
      class="absolute z-30 inset-0 flex items-center justify-center bg-white"
    >
      <loading-spinner />
    </div>
    <div class="px-6 py-4">
      <div>
        <h2 class="text-md font-medium mb-4">Delete Payment Method</h2>
        <p class="text-gray-600">
          Are you sure you want delete the payment method ending in
          <strong>{{ card.last4 }}</strong
          >?
        </p>
      </div>

      <div v-if="error" class="mt-4 text-sm text-red-500">
        {{ error }}
      </div>
    </div>

    <div class="px-6 py-4 flex items-center justify-end border-t space-x-2">
      <ui-button theme="default" @click="deletingPaymentMethod = false">
        Nevermind
      </ui-button>
      <ui-button theme="danger" @click="deletePaymentMethod">
        Delete Card
      </ui-button>
    </div>
  </ui-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UiButton from "@/components/ui/Button.vue";
import UiModal from "@/components/ui/Modal.vue";

export default defineComponent({
  name: "DeletePaymentMethod",

  components: {
    LoadingSpinner,
    UiButton,
    UiModal,
  },

  props: {
    paymentMethod: {
      type: String,
      required: true,
    },
    card: {
      type: Object,
      required: true,
    },
    disabled: Boolean,
  },

  emits: ["reload"],

  data() {
    return {
      deletingPaymentMethod: false,
      loading: false,
      error: "",
    };
  },

  methods: {
    startDeletingPaymentMethod() {
      this.deletingPaymentMethod = true;
    },

    async deletePaymentMethod() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .delete(`/payment/payment-methods/${this.paymentMethod}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          this.loading = false;
          this.deletingPaymentMethod = false;
          this.$emit("reload");
        })
        .catch(() => {
          this.error = "Payment method could not be deleted, please try again.";
          this.loading = false;
        });
    },
  },
});
</script>
