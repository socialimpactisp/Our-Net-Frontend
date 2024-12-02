<template>
  <div>
    <div class="flex justify-between space-x-4 items-center mb-3">
      <div>
        <h4 class="font-semibold">Billing History</h4>
      </div>
    </div>
    <div v-if="loading" class="border rounded-lg py-12 px-6">
      <loading-spinner />
      <p class="text-center text-lg text-gray-500">
        Please wait while we retrieve your billing history.
      </p>
    </div>
    <div v-else class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border sm:rounded-lg">
            <table
              v-if="invoices.length"
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
                <tr v-for="(invoice, index) in invoices" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    <span class="font-semibold">
                      {{ getDollars(invoice.total) }}
                    </span>
                    <span
                      v-if="invoice.status"
                      class="px-2 inline-flex text-xs leading-5 font-medium rounded-full capitalize"
                      :class="
                        invoice.status === 'paid'
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-gray-200 text-gray-900'
                      "
                    >
                      {{ invoice.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap space-x-2">
                    {{ getDate(invoice.created) }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right">
                    <a
                      class="font-semibold text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out"
                      :href="invoice.invoice_pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Download PDF</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="py-12 px-6 text-center">
              <p class="text-gray-500 text-lg">
                You don't have any billing history yet.
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

export default defineComponent({
  name: "InvoicesList",

  components: {
    LoadingSpinner,
  },

  data() {
    return {
      loading: true,
      tableColumns: ["Amount", "Created", ""],
      invoices: [],
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
        this.fetchInvoices();
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.fetchInvoices();
    }
  },

  methods: {
    async fetchInvoices() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get("/payment/invoices", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            this.invoices = data as [];
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
      });
    },

    getDate(timestamp: number) {
      const date = new Date(timestamp * 1000);

      return format(date, "dd LLL yyyy, hh:mm a");
    },
  },
});
</script>
