<template>
  <div>
    <div class="relative bg-brand">
      <div class="w-full flex flex-col">
        <div class="block max-w-screen-2xl w-full mx-auto pt-12 sm:pt-20 pb-12">
          <div class="lg:w-1/2 pl-6 pr-12">
            <div class="max-w">
              <h1
                id="hero-heading"
                class="text-3xl xl:text-4xl tracking-tight font-display font-bold text-white"
              >
                Ultimate Fibre Speeds
              </h1>
              <h1
                id="hero-heading"
                class="text-3xl xl:text-4xl tracking-tight font-display font-bold text-white"
              >
                Unlimited Data
              </h1>
              <h1
                id="hero-heading"
                class="text-3xl xl:text-4xl tracking-tight font-display font-bold text-white"
              >
                No Contract
              </h1>
              <h1
                id="hero-heading"
                class="text-3xl xl:text-4xl tracking-tight font-display font-bold text-white"
              >
                Exclusive pricing for Staff & Friends
              </h1>
              <p
                id="hero-copy"
                class="mt-6 text-lg md:text-2xl font-display font-normal italic text-white"
              >
                Sign up to start configuring your perfect plan
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="hasAccessCode || hasAccessCodeSelected"
          class="bg-brand py-8 sm:py-12 bg-london-map"
        >
          <div class="max-w-screen-2xl mx-auto">
            <div class="lg:w-1/2 pl-6 pr-6 sm:pr-12">
              <div class="max-w-xl">
                <h3
                  class="text-white text-xl sm:text-3xl flex items-start sm:items-center font-base tracking-tight"
                />
                <div class="mt-6 flex items-center">
                  <address-search @selected="selectAddress" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-brand py-8 sm:py-12 bg-keys-white">
          <div class="max-w-screen-2xl mx-auto">
            <div class="lg:w-1/2 pl-6 pr-6 sm:pr-12">
              <div class="max-w-xl">
                <div class="flex items-center">
                  <access-code-input @access-code="accessCodeEntered" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-brand py-6 sm:py-12">
      <div class="max-w-screen-2xl mx-auto px-6">
        <h2
          class="text-5xl sm:text-6xl text-white font-display text-center tracking-tight"
        >
          Unlimited Internet
        </h2>
      </div>
    </div>

    <div class="bg-brand py-6 sm:py-12">
      <div class="max-w-screen-2xl mx-auto px-6">
        <h2
          class="text-5xl sm:text-6xl text-white font-display text-center tracking-tight"
        >
          Our Plans for Staff & Friends
        </h2>
      </div>
    </div>

    <div class="relative bg-white py-12">
      <div class="relative z-10 max-w-screen-2xl mx-auto">
        <div class="relative">
          <div
            class="max-w-screen-lg mx-auto overflow-x-scroll sm:overflow-x-visible flex sm:grid sm:grid-cols-4 gap-4 px-4"
            style="-webkit-overflow-scrolling: touch"
          >
            <template v-if="products === null">
              <loading-spinner />
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
              <p>No products are avalable</p>
            </template>
            <div class="block sm:hidden pr-2 sm:pr-0" />
          </div>
        </div>
        <div
          class="mt-6 flex sm:hidden items-center justify-center border-t-2 relative mx-6"
        >
          <span
            class="block bg-white absolute p-2 uppercase text-xs font-medium tracking-wide"
          >
            Scroll
          </span>
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
