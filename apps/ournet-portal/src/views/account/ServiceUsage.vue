<template>
  <div>
    <div class="flex space-x-8 items-center mb-3">
      <div>
        <h4 class="font-semibold">Service Usage</h4>
      </div>
    </div>
    <div v-if="loading" class="border rounded-lg py-6 px-6">
      <loading-spinner />
      <p class="text-center text-lg text-gray-500">
        Please wait while we retrieve usage for this service.
      </p>
    </div>
    <div v-else class="flex flex-col">
      <div class="grid sm:grid-cols-3 gap-8">
        <div>
          <h4 class="font-semibold mb-3">Plan</h4>

          <div class="bg-gray-200 rounded-lg py-4 px-6">
            <p class="text-1xl font-black">
              {{ usageResponse.product }}
            </p>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Address</h4>

          <div class="bg-gray-200 rounded-lg py-4 px-6">
            <p class="text-1xl font-black">
              {{ usageResponse.address }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4 mr-4 mb-2">
        <a
          class="transition duration-150 ease-in-out cursor-pointer select-none text-gray-600 hover:text-gray-900 focus:text-gray-900"
          @click="downloadJson"
        >
          Download as JSON
        </a>
      </div>

      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border sm:rounded-lg">
            <table
              v-if="usageResponse.usage.length"
              class="min-w-full divide-y divide-gray-200"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 bg-white text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Total Usage (GB)
                  </th>
                  <th
                    class="px-6 py-3 bg-white text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Bytes Uploaded
                  </th>
                  <th
                    class="px-6 py-3 bg-white text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Bytes Downloaded
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(usage, index) in usageResponse.usage" :key="index">
                  <td class="px-6 py-4 text-left whitespace-no-wrap space-x-2">
                    <span class="font-semibold">
                      {{ getDate(usage.rangeEnd) }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 text-center whitespace-no-wrap space-x-2"
                  >
                    {{ usage.totalGigabytes }}
                  </td>
                  <td
                    class="px-6 py-4 text-center whitespace-no-wrap space-x-2"
                  >
                    {{ formatNumber(usage.bytesOut) }}
                  </td>
                  <td
                    class="px-6 py-4 text-center whitespace-no-wrap space-x-2"
                  >
                    {{ formatNumber(usage.bytesIn) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-4">
      <router-link
        :to="`../summary`"
        class="flex transition duration-150 ease-in-out cursor-pointer select-none text-gray-600 hover:text-gray-900 focus:text-gray-900"
      >
        Back to Usage Summary
        <icon-arrow-up-right class="ml-2 h-4" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconArrowUpRight from "../../components/icons/ArrowUpRight.vue";
// import IconLightningBolt from '@/components/icons/LightningBolt.vue'

interface UsageItem {
  rangeStart: string;
  rangeEnd: string;
  totalGigabytes: string;
  bytesOut: number;
  bytesIn: number;
}

interface UsageResponse {
  serviceId: number;
  product: string;
  address: string;
  usage: UsageItem[];
}

export default defineComponent({
  name: "ServiceUsage",

  components: {
    LoadingSpinner,
    IconArrowUpRight,
    // IconLightningBolt
  },

  data() {
    return {
      loading: true,
      tableColumns: [
        "Month",
        "Total Usage (GB)",
        "Bytes Uploaded",
        "Bytes Downloaded",
      ],
      usageResponse: <UsageResponse>{},
      // TODO set up chart data
      // chartData: {
      //   labels: ['January', 'February', 'March'],
      //   datasets: [ { data: [ 1, 2, 3 ] } ]
      // },
      // chartOptions: {
      //   responsive: true
      // }
    };
  },

  computed: {
    serviceId(): number {
      return parseInt(this.$route.params.serviceId as string); // TODO FIXME using params in router.push is an antipattern: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#important-note
    },

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
        .get(`/customer/data-usage/${this.serviceId}/month`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            this.usageResponse = res.data as UsageResponse;
            this.usageResponse.usage = this.usageResponse.usage.reverse();

            // TODO populate chart data
            // this.chartData.labels = this.usageResponse.usage.map(item => this.getDate(item.rangeStart))
            // this.chartData.datasets[0].data = this.usageResponse.usage.map(item => item.totalGigabytes)
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

    formatNumber(number: number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    downloadJson() {
      const blob = new Blob(
        [JSON.stringify(this.usageResponse, undefined, 2)],
        { type: "text/json" },
      );
      const link = document.createElement("a");

      link.download = "usage.json";
      link.href = window.URL.createObjectURL(blob);
      link.dataset.downloadurl = ["text/json", link.download, link.href].join(
        ":",
      );

      const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      link.dispatchEvent(evt);
      link.remove();
    },
  },
});
</script>
