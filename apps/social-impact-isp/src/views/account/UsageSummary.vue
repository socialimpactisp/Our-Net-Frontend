<template>
  <div>
    <div class="flex justify-between space-x-4 items-center mb-3">
      <div>
        <h4 class="font-semibold">Current Month Usage Summary</h4>
      </div>
    </div>
    <div v-if="loading" class="border rounded-lg py-12 px-6">
      <loading-spinner />
      <p class="text-center text-lg text-gray-500">
        Please wait while we retrieve your usage summary.
      </p>
    </div>
    <div v-else class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border sm:rounded-lg">
            <table
              v-if="usages.length"
              class="min-w-full divide-y divide-gray-200"
            >
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in tableColumns"
                    :key="index"
                    scope="col"
                    class="px-6 py-3 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(usage, index) in usages" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    <span class="font-semibold">
                      {{ usage.product }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    <span class="font-semibold">
                      {{ usage.address }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    <span class="font-semibold">
                      {{ getDate(usage.usage.rangeEnd) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    {{ usage.usage.totalGigabytes }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    <router-link
                      :to="`../usage/service/${usage.serviceId}`"
                      class="flex transition duration-150 ease-in-out cursor-pointer select-none text-gray-600 hover:text-gray-900 focus:text-gray-900"
                    >
                      View Details
                      <icon-arrow-up-right class="ml-2 h-4" />
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="py-12 px-6 text-center">
              <p class="text-gray-500 text-lg">
                You don't have any usage to show yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
// import IconUnlimited from '@/components/icons/Unlimited.vue'
import IconArrowUpRight from "../../components/icons/ArrowUpRight.vue";

interface Usage {
  serviceId: number;
  product: string;
  address: string;
  usage: {
    rangeStart: string;
    rangeEnd: string;
    totalGigabytes: number;
  };
}

export default defineComponent({
  name: "UsageSummary",

  components: {
    LoadingSpinner,
    // IconUnlimited,
    IconArrowUpRight,
  },

  emits: ["serviceId"],

  data() {
    return {
      loading: true,
      tableColumns: ["Plan Name", "Address", "Month", "Total Usage (GB)"],
      usages: [] as Usage[],
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
        this.fetchUsageSummary();
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.fetchUsageSummary();
    }
    console.log(this.$router.options.routes);
  },

  methods: {
    async fetchUsageSummary() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get("/customer/data-usage", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            this.usages = res.data as [];
            this.loading = false;
          }
        })
        .catch((e) => {
          console.error(e);
          this.loading = false;
        });
    },

    getDate(timestamp: string) {
      const date = new Date(timestamp);
      return format(date, "LLL yyyy");
    },

    viewDetails(usage: Usage) {
      this.$emit("serviceId", usage.serviceId);
    },
  },
});
</script>
