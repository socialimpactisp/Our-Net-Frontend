<template>
  <div>
    <UiBanner>
      Our Net - Offer Summary
      <template #content>
        <p>
          Find out everything you need to know about all of the plans we currently offer.
        </p>
      </template>
    </UiBanner>

    <div class="bg-white py-12">
      <div class="max-w-screen-md mx-auto px-6 prose">
        <template v-if="plans === null">
          <LoadingSpinner />
        </template>
        <template v-else-if="plans.length === 0">
          <p>There are no plans</p>
        </template>
        <template v-else>
          <offer-summary-table
            isp-name="Our Net"
            parent-company="Social Impact Digital Equity Tapui Ltd - trading as Our Net (a subsidiary of Devoli Ltd)"
            :plans="plans"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getProductListFromApi } from "@/lib/products";
import { defineComponent } from "vue";
import { UiBanner } from "@affinity/ui";
import { OfferSummaryTable } from "@affinity/ui/affinity";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

interface AccessCode {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
}

export default defineComponent({
  name: "OfferSummary",
  components: {
    UiBanner,
    OfferSummaryTable,
    LoadingSpinner,
  },
  data() {
    return {
      plans: null as
        | Awaited<ReturnType<typeof getProductListFromApi>>["plans"]
        | null,
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      getProductListFromApi().then(
        (products) =>
          (this.plans = products.plans.sort(
            (l, r) => r.speeds.down - l.speeds.down,
          )),
      );
    },
    getAccessCode(): AccessCode | null {
      const accessCode = localStorage.getItem("affinity_coupon_code");

      if (accessCode === null) {
        return null;
      }

      return JSON.parse(accessCode) as AccessCode;
    },
  },
});
</script>
