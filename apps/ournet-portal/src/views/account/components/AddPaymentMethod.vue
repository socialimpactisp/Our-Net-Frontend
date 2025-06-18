<template>
  <span @click="startAddingPaymentMethod">
    <slot />
  </span>

  <ui-modal
    v-model:active="addingPaymentMethod"
    :disable-close="loading"
    max-width="md"
  >
    <div
      v-if="loading"
      class="absolute z-30 inset-0 flex items-center justify-center bg-white"
    >
      <loading-spinner />
    </div>
    <div class="px-6 py-4">
      <div class="mb-4">
        <h2 class="text-md font-medium mb-4">Add Payment Method</h2>
        <p class="text-gray-600 text-sm">
          Add a payment method to your Our Net account.
        </p>
      </div>

      <div v-if="error" class="mb-4 text-sm text-red-500">
        {{ error }}
      </div>
      <div>
        <ui-label for="billingName" value="Cardholder name" />
        <ui-input
          id="billingName"
          v-model="form.billing_name as string"
          class="mt-1 shadow-sm"
        />
        <div v-if="form.errors.has('billing_name')" class="text-red-500 mt-1">
          <small>{{ form.errors.get("billing_name", "") }}</small>
        </div>
      </div>

      <div class="mt-2">
        <ui-label value="Card details" />
        <div
          class="block w-full appearance-none px-4 py-3 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 leading-4 focus:outline-none focus:border-amber-600 focus:shadow-outline rounded-md transition-colors duration-150 ease-in-out"
        >
          <div ref="card" />
        </div>
      </div>
    </div>

    <div class="px-6 py-4 flex items-center justify-end border-t space-x-2">
      <ui-button theme="secondary" @click="addingPaymentMethod = false">
        Nevermind
      </ui-button>
      <ui-button @click="addPaymentMethod"> Add Card </ui-button>
    </div>
  </ui-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form } from "@affinity/common/form";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { UiButton } from "@affinity/ui";
import UiInput from "@/components/ui/Input.vue";
import UiLabel from "@/components/ui/Label.vue";
import UiModal from "@/components/ui/Modal.vue";
import { STRIPE_KEY, STRIPE_ACCOUNT } from "@/environment";

interface CreateIntent {
  secret: string;
}

// eslint-disable-next-line no-undef
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = (window as any).Stripe(STRIPE_KEY, {
  stripeAccount: STRIPE_ACCOUNT,
});
const elements = stripe.elements();
let cardElement: { mount: (arg0: unknown) => void } | null = null;

export default defineComponent({
  name: "AddPaymentMethod",

  components: {
    LoadingSpinner,
    UiButton,
    UiInput,
    UiLabel,
    UiModal,
  },

  emits: ["reload"],

  data() {
    return {
      addingPaymentMethod: false,
      loading: false,
      error: "",
      clientSecret: "",
      form: new Form({
        billing_name: "",
      }),
    };
  },

  methods: {
    startAddingPaymentMethod() {
      this.createIntent();
      if (!cardElement) {
        cardElement = elements.create("card");
      }
      if (cardElement) {
        cardElement.mount(this.$refs.card);
      }
      this.addingPaymentMethod = true;
    },

    async createIntent() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post<CreateIntent, null>("/payment/create-intent", null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          this.clientSecret = res.data.secret;
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
          this.clientSecret = "";
          this.loading = false;
        });
    },

    addPaymentMethod() {
      this.loading = true;
      stripe
        .confirmCardSetup(this.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: this.form.billing_name,
            },
          },
        })
        .then(
          (res: { setupIntent: unknown; error: Record<string, unknown> }) => {
            this.loading = false;
            if (res.setupIntent) {
              this.clientSecret = "";
              this.form.reset();
              this.addingPaymentMethod = false;
              this.$emit("reload");
            } else if (res.error) {
              this.error = res.error.message as string;
            }
          },
        );
    },
  },
});
</script>
