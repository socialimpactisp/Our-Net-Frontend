<template>
  <div>
    <div class="flex justify-between space-x-4 items-center mb-3">
      <div>
        <h4 class="font-semibold">Payment methods</h4>
        <p class="text-gray-700 text-sm">Current payment methods on file.</p>
      </div>
      <div>
        <add-payment-method @reload="fetchPaymentMethods">
          <ui-button size="sm" outline> Add </ui-button>
        </add-payment-method>
      </div>
    </div>
    <div v-if="loading" class="border rounded-lg py-12 px-6">
      <loading-spinner />
      <p class="text-center text-lg text-gray-500">
        Please wait while we retrieve your payment methods.
      </p>
    </div>
    <div v-else>
      <div v-if="paymentMethods.length" class="space-y-4">
        <div
          v-for="(method, index) in paymentMethods"
          :key="index"
          class="border bg-gray-100 rounded-xl"
        >
          <div
            class="flex items-center py-1 px-4 bg-white ring-1 ring-gray-500 ring-opacity-10 rounded-xl space-x-4"
          >
            <div>
              <component :is="getComponent(method.card.brand)" class="h-16" />
            </div>
            <div class="flex flex-1 items-center space-x-2">
              <span class="text-sm font-mono">{{
                getBrand(method.card.brand)
              }}</span>
              <span class="font-mono text-lg">••••</span>
              <span class="font-mono text-lg">
                {{ method.card.last4 }}
              </span>
              <span
                v-if="method.is_default"
                class="px-2 inline-flex text-xs leading-5 capitalize font-medium rounded-full bg-blue-200 text-blue-800"
              >
                Default
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <div
                class="ring-1 ring-gray-500 ring-opacity-10 bg-gray-100 px-2 py-1 text-sm rounded-lg font-semibold"
              >
                <span>{{ method.card.exp_month }}</span>
                <span>/</span>
                <span>{{ method.card.exp_year }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <ui-dropdown>
                  <template #trigger>
                    <ui-button theme="default" size="sm" outline has-icon>
                      <icon-dots-horizontal class="h-5" />
                    </ui-button>
                  </template>

                  <ui-dropdown-link
                    tag="span"
                    :class="{
                      'opacity-50 pointer-events-none': method.is_default,
                    }"
                    @click="setDefault(method)"
                  >
                    Set as default
                  </ui-dropdown-link>
                  <update-payment-method
                    :payment-method="method.id"
                    :card="method.card"
                    @reload="fetchPaymentMethods"
                  >
                    <ui-dropdown-link tag="span"> Update </ui-dropdown-link>
                  </update-payment-method>
                  <delete-payment-method
                    :payment-method="method.id"
                    :card="method.card"
                    :disabled="paymentMethods.length <= 1 || method.is_default"
                    @reload="fetchPaymentMethods"
                  >
                    <ui-dropdown-link
                      tag="span"
                      class="text-red-500 hover:text-gray-900"
                    >
                      Delete
                    </ui-dropdown-link>
                  </delete-payment-method>
                </ui-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="border rounded-lg py-12 px-6 text-center">
        <p class="text-gray-500 text-lg">You don't have any payment methods.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconDotsHorizontal from "@/components/icons/DotsHorizontal.vue";
import IconTrash from "@/components/icons/Trash.vue";
import { UiButton } from "@affinity/ui";
import UiDropdown from "@/components/ui/Dropdown.vue";
import UiDropdownLink from "@/components/ui/DropdownLink.vue";

import AddPaymentMethod from "./AddPaymentMethod.vue";
import DeletePaymentMethod from "./DeletePaymentMethod.vue";
import UpdatePaymentMethod from "./UpdatePaymentMethod.vue";
import Card from "./cards/Card.vue";
import CardAmex from "./cards/Amex.vue";
import CardMastercard from "./cards/Mastercard.vue";
import CardVisa from "./cards/Visa.vue";

interface PaymentMethod {
  id: string;
  card: Record<string, unknown>;
  customer: string;
  is_default: boolean;
  type: string;
}

type CardBrand =
  | "amex"
  | "cartes_bancaires"
  | "diners_club"
  | "discover"
  | "jcb"
  | "mastercard"
  | "visa"
  | "unionpay";

export default defineComponent({
  name: "PaymentMethods",

  components: {
    LoadingSpinner,
    IconDotsHorizontal,
    IconTrash,
    UiButton,
    UiDropdown,
    UiDropdownLink,
    AddPaymentMethod,
    DeletePaymentMethod,
    UpdatePaymentMethod,
    Card,
    CardAmex,
    CardMastercard,
    CardVisa,
  },

  data() {
    return {
      loading: true,
      paymentMethods: [] as PaymentMethod[],
    };
  },

  computed: {
    authLoading(): boolean {
      return this.$auth.isLoading();
    },
  },

  watch: {
    authLoading(value) {
      if (value === false) {
        this.fetchPaymentMethods();
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.fetchPaymentMethods();
    }
  },

  methods: {
    async fetchPaymentMethods() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get<PaymentMethod[]>("/payment/payment-methods", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            this.paymentMethods = data;
            this.loading = false;
          }
        })
        .catch((e) => {
          console.error(e);
          this.loading = false;
        });
    },

    async setDefault(method: PaymentMethod) {
      if (method.is_default) return; // Return if method is already default

      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post(
          "/payment/default-payment-method",
          {
            payment_method_id: method.id,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            this.loading = false;
            this.fetchPaymentMethods();
          }
        })
        .catch((e) => {
          console.error(e);
          this.loading = false;
        });
    },

    getComponent(brand: string) {
      const rawName = `card ${brand}`;
      const name = rawName
        .replace(
          /\w\S*/g,
          (m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase(),
        )
        .replace(" ", "");
      const componentExists = this.$options.components
        ? name in this.$options.components
        : false;

      return componentExists ? `card-${brand}` : "card";
    },

    getBrand(brand: CardBrand): string {
      const brands = {
        amex: "American Express",
        cartes_bancaires: "Cartes Bancaires",
        diners_club: "Diners Club",
        discover: "Discover",
        jcb: "JCB",
        mastercard: "Mastercard",
        visa: "Visa",
        unionpay: "UnionPay",
      };

      return brands[brand];
    },
  },
});
</script>
