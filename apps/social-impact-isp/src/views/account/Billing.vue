<template>
  <div>
    <div class="mb-6 pb-5 border-b">
      <h2 class="text-2xl font-semibold tracking-tight">Billing</h2>
    </div>
    <div class="space-y-8">
      <payment-methods />
      <invoices />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Invoices from "./components/Invoices.vue";
import PaymentMethods from "./components/PaymentMethods.vue";

export default defineComponent({
  name: "AccountBilling",

  components: {
    Invoices,
    PaymentMethods,
  },
});
</script>
