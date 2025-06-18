<template>
  <div>
    <div class="relative p-6 border rounded-lg">
      <div
        v-if="isLoading || disablePaymentForm"
        class="absolute z-30 inset-0 flex items-center justify-center bg-white"
      >
        <loading-spinner />
      </div>

      <template v-if="paymentMethods.length">
        <p class="text-center text-emerald-600 font-semibold">
          You already have a payment method on file.
        </p>
        <div class="mt-6">
          <div class="mb-4">
            <label for="terms" class="block cursor-pointer">
              <input id="terms" v-model="agreeOnTerms" type="checkbox" />
              <span class="ml-2 text-sm"
                >I accept the
                <a class="underline" :href="termsHref" target="_blank"
                  >Terms &amp; Conditions</a
                ></span
              >
            </label>

            <label for="above13" class="block cursor-pointer">
              <input id="above13" v-model="above13" type="checkbox" />
              <span class="ml-2 text-sm"> I am aged 13 years or older </span>
            </label>
          </div>
          <ui-button
            theme="dark"
            rounded
            class="w-full italic"
            :class="{
              'opacity-50 pointer-events-none': !agreeOnTerms || !above13,
            }"
            :disabled="!agreeOnTerms || !above13"
            @click="onSubmit"
          >
            Join Now
          </ui-button>
        </div>
      </template>
      <template v-else>
        <div class="space-y-4">
          <div>
            <ui-label value="Card holder name" />
            <ui-input v-model="form.billing_name" placeholder="John Doe" />
          </div>
          <div>
            <ui-label value="Card details" />
            <div
              class="block w-full appearance-none px-4 py-3 bg-white border placeholder-gray-500 text-gray-900 leading-4 focus:outline-none focus:border-amber-600 focus:shadow-outline rounded-md transition-colors duration-150 ease-in-out"
              :class="error !== '' ? 'border-red-500' : 'border-gray-300'"
            >
              <div ref="card" />
            </div>
            <div v-if="error !== ''" class="text-sm mt-1 text-red-700">
              {{ error }}
            </div>
          </div>
          <div class="mt-6">
            <div class="mb-4">
              <label for="terms" class="block cursor-pointer">
                <input id="terms" v-model="agreeOnTerms" type="checkbox" />
                <span class="ml-2 text-sm"
                  >I accept the
                  <a class="underline" :href="termsHref" target="_blank"
                    >Terms &amp; Conditions</a
                  ></span
                >
              </label>

              <label for="above13" class="block cursor-pointer">
                <input id="above13" v-model="above13" type="checkbox" />
                <span class="ml-2 text-sm"> I am aged 13 years or older </span>
              </label>
            </div>
            <ui-button
              theme="dark"
              rounded
              class="w-full italic"
              :class="{
                'opacity-50 pointer-events-none': !agreeOnTerms || !above13,
              }"
              :disabled="!agreeOnTerms || !above13"
              @click="addPaymentMethod"
            >
              Add Payment Method & Sign Up
            </ui-button>
          </div>
        </div>
      </template>
    </div>
    <div class="mt-4 text-center">
      <p class="font-bold text-sm text-gray-500">
        Our Net payments are secured by
        <a
          class="underline"
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UiButton from "@/components/ui/Button.vue";
import UiInput from "@/components/ui/Input.vue";
import UiLabel from "@/components/ui/Label.vue";
import { STRIPE_ACCOUNT, STRIPE_KEY } from "@/environment";

interface PaymentProducts {
  object: string;
  data: [];
  has_more: boolean;
  url: string;
}

interface CreateIntent {
  secret: string;
}

interface PaymentMethod {
  id: string;
  card: Record<string, unknown>;
  customer: string;
  type: string;
}

interface StripeProduct {
  id: string;
  prices: StripePrice[];
}

interface StripePrice {
  id: string;
}

// eslint-disable-next-line no-undef
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = (window as any).Stripe(STRIPE_KEY, {
  stripeAccount: STRIPE_ACCOUNT,
});
const elements = stripe.elements();
let cardElement: { mount: (arg0: unknown) => void } | null = null;

export default defineComponent({
  name: "SignUpForm",

  components: {
    LoadingSpinner,
    UiButton,
    UiInput,
    UiLabel,
  },

  props: {
    selected: {
      type: Object,
      required: true,
    },
    customerAddress: {
      type: Object,
      required: true,
    },
  },

  emits: {
    confirmed: null,
  },

  data() {
    return {
      stripeProducts: [],
      clientSecret: "",
      termsHref: "/terms",
      agreeOnTerms: false,
      above13: false,
      disablePaymentForm: false,
      paymentMethods: [] as PaymentMethod[],
      error: "",
      form: {
        billing_name: "",
      },
    };
  },

  computed: {
    isLoading(): boolean {
      if (this.paymentMethods.length) return false;

      if (this.stripeProducts.length && this.clientSecret) return false;

      return true;
    },

    selectedProduct(): StripeProduct | undefined {
      if (this.selected && this.selected.product) {
        return this.stripeProducts.find(
          (item: StripeProduct) => item.id === this.selected.product.stripeCode,
        );
      }
      return undefined;
    },

    selectedModem(): StripeProduct | undefined {
      if (
        this.selected &&
        this.selected.modem &&
        this.selected.modem.stripeCode
      ) {
        return this.stripeProducts.find(
          (item: StripeProduct) => item.id === this.selected.modem.stripeCode,
        );
      }
      return undefined;
    },

    priceIds(): string[] | undefined {
      if (this.selectedProduct && this.selectedModem) {
        const productPriceId = this.selectedProduct.prices[0].id;
        const modemPriceId = this.selectedModem.prices[0].id;

        return [productPriceId, modemPriceId];
      } else if (this.selectedProduct && !this.selectedModem) {
        const productPriceId = this.selectedProduct.prices[0].id;

        return [productPriceId];
      }

      return undefined;
    },
  },

  watch: {
    isLoading(value) {
      if (value === false && !this.paymentMethods.length) {
        this.prepareView();
      }
    },
  },

  created() {
    this.fetchPaymentMethod();
  },

  methods: {
    async fetchPaymentMethod() {
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get<PaymentMethod[]>("/payment/payment-methods", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;

            if (data.length) {
              this.paymentMethods = data;
              this.fetchProducts();
            } else {
              this.createIntent();
              this.fetchProducts();
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    async createIntent() {
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post<CreateIntent, null>("/payment/create-intent", null, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          this.clientSecret = res.data.secret;
        });
    },

    prepareView() {
      nextTick(() => {
        if (!cardElement) {
          cardElement = elements.create("card");
        }
        if (cardElement) {
          cardElement.mount(this.$refs.card);
        }
      });
    },

    addPaymentMethod() {
      this.disablePaymentForm = true;
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
            if (res.setupIntent) {
              this.onSubmit();
            } else if (res.error) {
              this.error = res.error.message as string;
              this.disablePaymentForm = false;
            }
          },
        );
    },

    async onSubmit() {
      this.disablePaymentForm = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post("/customer/address", this.customerAddress, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          this.disablePaymentForm = false;
          if (res.status === 200) {
            // this.$router.push('/success') // Push user to success page.
            this.$emit("confirmed", this.priceIds); // Trigger confirmed event
          }
        })
        .catch(() => {
          this.disablePaymentForm = false;
        });

      // this.$api.post('/payment/confirm-payment', { price_ids: this.priceIds }, {
      //   headers: { Authorization: `Bearer ${accessToken}` }
      // }).then(res => {
      //   this.disablePaymentForm = false
      //   if (res.status === 200) {
      //     // this.$router.push('/success') // Push user to success page.
      //     this.$emit('confirmed', true) // Trigger confirmed event
      //   }
      // }).catch(() => {
      //   this.disablePaymentForm = false
      // })
    },

    fetchProducts() {
      this.$api
        .get<PaymentProducts>("/payment/products")
        .then((res) => {
          const data = res.data;
          this.stripeProducts = data.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
});
</script>
