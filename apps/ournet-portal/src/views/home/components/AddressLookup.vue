<template>
  <div class="grid sm:grid-cols-6 sm:items-center gap-8">
    <div class="col-span-2 text-white">
      <h3 class="text-3xl font-bold tracking-tight">
        How do I switch to Our Net?
      </h3>
      <p class="mt-2 text-lg font-medium text-gray-200">
        Enter your address, then select a plan.
      </p>
    </div>
    <div class="col-span-4">
      <div class="relative">
        <address-search @selected="selectAddress" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddressSearch, { Address } from "@/components/AddressSearch.vue";

export default defineComponent({
  name: "AddressLookup",

  components: {
    AddressSearch,
  },

  methods: {
    selectAddress(address: Address) {
      this.$router.push({
        name: "register",
        query: { address: JSON.stringify(address) },
      });
    },
  },
});
</script>
