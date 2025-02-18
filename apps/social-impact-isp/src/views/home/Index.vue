<template>
  <div class="bg-white">
    <div class="relative bg-white">
      <div class="w-full flex flex-col">
        <div
          class="block max-w-screen-2xl w-full mx-auto pt-12 sm:pt-20 pb-12 px-4"
        >
          <div class="lg:w-3/4 mx-auto text-center">
            <div class="space-y-8">
              <div
                class="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20"
              >
                <p
                  class="text-brand-red text-[13px] font-sans font-medium tracking-wide"
                >
                  Exclusive Staff & Friends Offer
                </p>
              </div>
              <div class="space-y-4">
                <h1
                  class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-dark leading-tight tracking-tight"
                >
                  Lightning Fast Internet
                  <span class="block text-brand-red">Without Limits</span>
                </h1>
                <p class="text-brand-mid text-xl max-w-2xl mx-auto font-sans">
                  Experience unlimited data with ultimate fiber speeds. No
                  contracts, just pure performance.
                </p>
              </div>
              <div
                class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <button
                  class="px-8 py-3.5 bg-brand-red text-white rounded-lg font-sans text-[13px] tracking-wide font-medium hover:bg-brand-red/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  Get Started
                </button>
                <button
                  class="px-8 py-3.5 bg-brand-dark/5 text-brand-dark rounded-lg font-sans text-[13px] tracking-wide font-medium hover:bg-brand-dark/10 transition-all border border-brand-dark/10"
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="hasAccessCode || hasAccessCodeSelected"
          class="bg-white py-8 sm:py-12 relative overflow-hidden border-t border-brand-light/20"
        >
          <div class="max-w-screen-2xl mx-auto relative">
            <div class="lg:w-1/2 pl-6 pr-6 sm:pr-12">
              <div class="max-w-xl">
                <h3
                  class="text-brand-dark text-xl sm:text-2xl flex items-start sm:items-center font-display tracking-tight"
                />
                <div class="mt-6 flex items-center">
                  <address-search @selected="selectAddress" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="bg-white py-8 sm:py-12 relative overflow-hidden border-t border-brand-light/20"
        >
          <div class="max-w-screen-2xl mx-auto relative">
            <div class="lg:w-1/2 mx-auto px-6">
              <div class="max-w-xl mx-auto">
                <div class="flex items-center">
                  <access-code-input
                    @access-code="accessCodeEntered"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white py-12 sm:py-20 relative overflow-hidden border-t border-brand-light/20"
    >
      <div class="max-w-screen-2xl mx-auto px-6 relative">
        <div class="text-center space-y-4">
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-[13px] font-sans font-medium tracking-wide"
            >Choose Your Plan</span
          >
          <h2
            class="text-4xl sm:text-5xl text-brand-dark font-display font-bold tracking-tight"
          >
            Unlimited Internet Plans
          </h2>
          <p class="text-brand-mid text-lg max-w-2xl mx-auto font-sans">
            Exclusive pricing for Staff & Friends with no hidden fees or
            contracts
          </p>
        </div>
      </div>
    </div>

    <div class="relative bg-white py-16 border-t border-brand-light/20">
      <div class="relative z-10 max-w-screen-2xl mx-auto">
        <div class="relative">
          <div
            class="max-w-screen-xl mx-auto overflow-x-scroll sm:overflow-x-visible flex sm:grid sm:grid-cols-4 gap-6 px-4"
            style="-webkit-overflow-scrolling: touch"
          >
            <template v-if="products === null">
              <div class="w-full flex items-center justify-center py-12">
                <loading-spinner />
              </div>
            </template>
            <template v-else-if="products.plans.length > 0">
              <template v-for="(product, index) in products.plans" :key="index">
                <product-card
                  :product-name="product.productName"
                  :product-image="product.productImage"
                  :speed-up="product.speeds.up"
                  :speed-down="product.speeds.down"
                  :price="product.price"
                  :show-price="
                    hasAccessCode || hasAccessCodeSelected ? true : false
                  "
                  :speed-equivocation="product.speedEquivocation"
                />
              </template>
            </template>
            <template v-else>
              <div class="col-span-4 text-center py-12">
                <p class="text-brand-mid text-lg">
                  No products are available at the moment
                </p>
              </div>
            </template>
          </div>
        </div>
        <div
          class="mt-6 flex sm:hidden items-center justify-center relative mx-6"
        >
          <div class="w-32 h-1 bg-brand-light/30 rounded-full">
            <div class="w-1/3 h-full bg-brand-red rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import AddressLookup from "./components/AddressLookup.vue";
// import Features from "./components/Features.vue";

import AddressSearch, { Address } from "@/components/AddressSearch.vue";
// import NzMadeBadge from "@/components/NZMadeBadge.vue";
// import IconArrowLeft from "@/components/icons/ArrowLeft.vue";
// import IconArrowRight from "@/components/icons/ArrowRight.vue";
// import IconLocationMarker from "@/components/icons/LocationMarker.vue";

import ProductCard from "@/components/ProductCard.vue";

// import UiButton from "@/components/ui/Button.vue";

import { getProductListFromApi } from "@/lib/products";
import AccessCodeInput from "@/components/AccessCodeInput.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

interface AccessCode {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
}

export default defineComponent({
  name: "HomeView",

  components: {
    AddressSearch,
    // AddressLookup,
    AccessCodeInput,
    // Features,
    // NzMadeBadge,
    // IconArrowLeft,
    // IconArrowRight,
    // IconLocationMarker,
    ProductCard,
    LoadingSpinner,
  },

  data() {
    return {
      products: null as Awaited<
        ReturnType<typeof getProductListFromApi>
      > | null,
      hasAccessCode: false,
      accessCode: undefined as AccessCode | undefined,
    };
  },

  computed: {
    hasAccessCodeSelected(): boolean {
      const hasAccessCode: boolean =
        localStorage.getItem("affinity_coupon_code") !== null;
      return hasAccessCode;
    },
  },

  watch: {
    accessCode() {
      this.loadProducts();
    },
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    selectAddress(address: Address) {
      this.$router.push({
        name: "register",
        query: { address: JSON.stringify(address) },
      });
    },

    loadProducts() {
      getProductListFromApi().then((products) => (this.products = products));
    },

    getAccessCode() {
      const affinityCouponCode = localStorage.getItem("affinity_coupon_code");

      if (affinityCouponCode === null) {
        return undefined;
      }

      return JSON.parse(affinityCouponCode) as AccessCode;
    },

    accessCodeEntered(accessCode: AccessCode) {
      var affinityCouponCode: string;
      affinityCouponCode = JSON.stringify(accessCode);
      //console.log(affinityCouponCode);
      localStorage.setItem("affinity_coupon_code", affinityCouponCode);
      this.hasAccessCode = true;
      this.accessCode = accessCode;
    },
  },
});
</script>
