<template>
  <div class="hero-container">
    <div class="hero-wrapper">
      <img src="/images/hero-image.jpg" alt="Hero" class="hero-img" />
      <div class="hero-overlay"></div>
      <div class="hero-text animated-text">
        <div class="space-y-4">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-funnel font-bold text-brand-dark leading-tight tracking-tight"
          >
            <span class="block text-brand-red">Low Cost Fast Internet</span>
          </h1>
          <p class="text-brand-mid text-l max-w-2xl mx-auto font-sans">
            Affordable Pricing. Community Powered. Fast fibre internet.
          </p>
        </div>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <button
            class="px-8 py-3.5 bg-brand-red text-white rounded-lg font-sans text-[13px] tracking-wide font-medium hover:bg-brand-red/70 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
            @click="scrollToSection"
          >
            Get Started
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
      <div class="lg:w-1/2 mx-auto px-6">
        <div class="max-w-xl mx-auto">
          <h3
            class="text-brand-dark text-xl sm:text-2xl font-display tracking-tight text-center"
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
              class="w-full"
              @access-code="accessCodeEntered"
            />
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
        >
          Find a plan that suits your budget
        </span>
        <div id="get-started-section" class="mt-96 min-h-[50px]">
          <h2
            class="text-4xl sm:text-5xl text-brand-dark font-display font-bold tracking-tight"
          >
            Digital Equity Internet Plans
          </h2>
        </div>
        <p class="text-brand-mid text-lg max-w-2xl mx-auto font-sans">
          Affordable fast internet plans for low income households, with no
          hidden fees and flexible payment options.
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
                :interval="product.interval || 'month'"
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
      hasAccessCode: true,
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
      if (affinityCouponCode === null) return undefined;
      return JSON.parse(affinityCouponCode) as AccessCode;
    },

    accessCodeEntered(accessCode: AccessCode) {
      const affinityCouponCode = JSON.stringify(accessCode);
      localStorage.setItem("affinity_coupon_code", affinityCouponCode);
      this.hasAccessCode = true;
      this.accessCode = accessCode;
    },

    scrollToSection() {
      console.log("Get Started clicked");
      const el = document.getElementById("get-started-section");
      console.log("Target element:", el);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Target element not found");
      }
    },
  },
});
</script>

<style scoped>
.hero-container {
  width: 100%;
  margin-bottom: 1.5rem;
}

.hero-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 1px;
}

.hero-img {
  width: 100%;
  height: auto;
  max-height: 550px;
  object-fit: cover;
  transition: transform 0.8s ease-in-out;
  display: block;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  );
  z-index: 1;
}

.hero-wrapper:hover .hero-img {
  transform: scale(1.1);
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
  z-index: 2;
}

.hero-text h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

#get-started-section {
  scroll-margin-top: 100px;
}

/* Text animation */
.animated-text {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .hero-text h1 {
    font-size: 1.5rem;
  }

  .hero-text p {
    font-size: 1rem;
  }

  .cta-button {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
