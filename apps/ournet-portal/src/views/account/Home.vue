<template>
  <div>
    <div class="mb-6 pb-5 border-b">
      <h2 class="text-2xl font-semibold tracking-tight">Home</h2>
    </div>

    <div class="mb-8 grid sm:grid-cols-3 gap-8">
      <div>
        <h4 class="font-semibold mb-3">Current monthly bill</h4>

        <div class="bg-gray-200 rounded-lg py-4 px-6">
          <p class="text-3xl font-black">
            {{ getDollars(monthlyCost) }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="font-semibold mb-3">Current active plans</h4>

        <div class="bg-gray-200 rounded-lg py-4 px-6">
          <p class="text-3xl font-black">
            {{ subscriptions.length }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between space-x-4 items-center mb-3">
        <div>
          <h4 class="font-semibold">My broadband plans</h4>
        </div>
      </div>

      <div v-if="loading" class="py-12 px-6">
        <loading-spinner />
        <p class="text-center text-lg text-gray-500">
          Please wait while we retrieve your current subscriptions.
        </p>
      </div>
      <div v-else>
        <div v-if="subscriptions.length" class="space-y-4">
          <div
            v-for="(subscription, index) in subscriptions"
            :key="index"
            class="flex items-center border rounded-lg py-3 px-6"
          >
            <div
              class="hidden sm:flex shrink-0 items-center justify-center mr-6 w-16 h-16 rounded-lg bg-gray-100"
            >
              <icon-lightning-bolt class="h-8 opacity-25" />
            </div>
            <div class="flex-1">
              <h4 class="flex items-center text-lg font-semibold">
                <span>
                  {{ subscription.items[0].plan.product.name }}
                </span>
                <span
                  v-if="subscription.status"
                  class="px-2 ml-2 inline-flex text-xs leading-5 capitalize font-medium rounded-full"
                  :class="
                    subscription.status === 'active'
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-gray-200 text-gray-800'
                  "
                >
                  {{ subscription.status }}
                </span>
              </h4>
              <div class="space-x-1 text-sm">
                <span class="font-medium"> Current period: </span>
                <span>
                  {{
                    formatDate(subscription.current_period_start, "dd LLL yyyy")
                  }}
                  -
                  {{
                    formatDate(subscription.current_period_end, "dd LLL yyyy")
                  }}
                </span>
              </div>
              <div class="space-x-1 text-sm">
                <span class="font-medium"> Next payment due: </span>
                <span>
                  {{
                    formatDate(subscription.current_period_end, "dd LLLL yyyy")
                  }}
                </span>
              </div>
            </div>
            <div class="ml-6">
              <p class="text-xl font-bold">
                {{ getDollars(subscription.items[0].plan.amount) }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="py-12 px-6 text-center">
          <p class="text-gray-500 text-lg">
            You don't have any active subscriptions yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconLightningBolt from "@/components/icons/LightningBolt.vue";

interface Subscriptions {
  billing_cycle_anchor: number;
  cancel_at?: number;
  cancel_at_period_end: boolean;
  canceled_at?: number;
  current_period_end: number;
  current_period_start: number;
  days_until_due?: number;
  id: string;
  items: SubscriptionItem[];
}

interface SubscriptionItem {
  created: number;
  id: string;
  plan: SubscriptionItemProduct;
}

interface SubscriptionItemProduct {
  active: boolean;
  amount: number;
  amount_decimal: string;
}

export default defineComponent({
  name: "AccountHome",

  components: {
    LoadingSpinner,
    IconLightningBolt,
  },

  data() {
    return {
      loading: true,
      subscriptions: [] as Subscriptions[],
    };
  },

  computed: {
    authLoading(): boolean {
      return this.$auth.isLoading();
    },

    monthlyCost(): number {
      if (this.subscriptions.length) {
        const prices = [] as number[];

        this.subscriptions.forEach((subscription) => {
          subscription.items.forEach((item) => {
            prices.push(item.plan.amount);
          });
        });

        const sum = prices.reduce((a, b) => a + b);

        return sum;
      }

      return 0;
    },
  },

  watch: {
    authLoading(value) {
      if (value === false) {
        this.fetchSubscriptions();
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.fetchSubscriptions();
    }
  },

  methods: {
    async fetchSubscriptions() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get("/payment/subscriptions", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            this.subscriptions = data as [];
            this.loading = false;
          }
        })
        .catch((e) => {
          console.error(e);
          this.loading = false;
        });
    },

    getDollars(amount: number) {
      const dollars = amount / 100;

      return dollars.toLocaleString("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    },

    formatDate(timestamp: number, template?: string) {
      const date = new Date(timestamp * 1000);

      return format(date, template ? template : "dd LLL yyyy, hh:mm a");
    },
  },
});
</script>
