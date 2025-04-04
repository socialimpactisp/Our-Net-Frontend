<template>
  <span class="block" @click="startUpdatingPaymentMethod">
    <slot />
  </span>

  <ui-modal
    v-model:active="updatingPaymentMethod"
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
        <h2 class="text-md font-medium mb-4">Update Payment Method</h2>
        <p class="text-gray-600 text-sm">
          Update your card expiry month and year.
        </p>
      </div>

      <!-- <div>
        <div>
          <ui-label
            value="Card details"
          />
          <div class="block w-full appearance-none px-4 py-3 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 leading-4 focus:outline-none focus:border-amber-600 focus:shadow-outline rounded-md transition-colors duration-150 ease-in-out">
            <div ref="card" />
          </div>
        </div>
      </div> -->

      <div v-if="error" class="mb-4 text-sm text-red-500">
        {{ error }}
      </div>
      <div class="flex space-x-4 items-start">
        <div>
          <ui-label for="cardExpMonth" value="Expiry month" />
          <ui-input
            id="cardExpMonth"
            v-model="form.card_exp_month"
            type="number"
            :min="initial.card_exp_month"
            class="mt-1 shadow-sm"
          />
        </div>

        <div>
          <ui-label for="cardExpYear" value="Expiry year" />
          <ui-input
            id="cardExpyear"
            v-model="form.card_exp_year"
            type="number"
            :min="initial.card_exp_year"
            class="mt-1 shadow-sm"
          />
        </div>
      </div>
    </div>

    <div class="px-6 py-4 flex items-center justify-end border-t space-x-2">
      <ui-button theme="secondary" @click="updatingPaymentMethod = false">
        Nevermind
      </ui-button>
      <ui-button @click="updatePaymentMethod"> Update Card </ui-button>
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

interface CreateIntent {
  secret: string;
}

// eslint-disable-next-line no-undef
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const stripe = (window as any).Stripe(process.env.STRIPE_KEY, {
//   stripeAccount: process.env.STRIPE_ACCOUNT
// })
// const elements = stripe.elements()
// let cardElement: { mount: (arg0: unknown) => void } | null = null

export default defineComponent({
  name: "UpdatePaymentMethod",

  components: {
    LoadingSpinner,
    UiButton,
    UiInput,
    UiLabel,
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
  },

  emits: ["reload"],

  data() {
    return {
      updatingPaymentMethod: false,
      loading: false,
      error: "",
      clientSecret: "",
      form: new Form({
        card_exp_month: this.card ? this.card.exp_month : 0,
        card_exp_year: this.card ? this.card.exp_year : 0,
      }),
      initial: {
        card_exp_month: this.card ? this.card.exp_month : 0,
        card_exp_year: this.card ? this.card.exp_year : 0,
      },
    };
  },

  methods: {
    startUpdatingPaymentMethod() {
      // this.updateIntent()
      // if (!cardElement) {
      //   cardElement = elements.create('card')
      // }
      // if (cardElement) {
      //   cardElement.mount(this.$refs.card)
      // }
      this.updatingPaymentMethod = true;
    },

    async updateIntent() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post<CreateIntent, null>(
          `/payment/update-intent?payment_method_id=${this.paymentMethod}`,
          null,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
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

    async updatePaymentMethod() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .patch(
          `/payment/payment-methods/${this.paymentMethod}`,
          {
            card: {
              exp_month: this.form.card_exp_month,
              exp_year: this.form.card_exp_year,
            },
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then(() => {
          this.loading = false;
          this.updatingPaymentMethod = false;
          this.$emit("reload");
        })
        .catch(() => {
          this.error = "Please check your card expiry date and try again.";
          this.loading = false;
        });

      // stripe.confirmCardSetup(this.clientSecret, {
      //   payment_method: {
      //     card: cardElement
      //   }
      // }).then((res: { setupIntent: unknown; error: unknown; }) => {
      //   this.loading = false
      //   if (res.setupIntent) {
      //     this.clientSecret = ''
      //     this.form.reset()
      //     this.updatingPaymentMethod = false
      //     this.$emit('reload')
      //   }
      // })
    },
  },
});
</script>
