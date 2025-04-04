<template>
  <div>
    <div class="relative bg-brand py-16">
      <div class="max-w-screen-2xl mx-auto text-white px-6">
        <h3 class="text-5xl text-center font-black tracking-tight">
          Step into the Emporium
        </h3>
        <div v-if="hasAccessCode || hasAccessCodeSelected">
          <div
            v-if="!hasAddressSelected"
            class="bg-brand py-8 sm:py-12 bg-london-map"
          >
            <div class="mt-6 max-w-2xl w-full mx-auto">
              <address-search
                ref="search"
                :auto-focus="!selected || !Object.keys(selected).length"
                @selected="selectAddress"
              />
            </div>
          </div>
        </div>
        <div v-else class="bg-brand py-8 sm:py-12 bg-keys-white">
          <div class="mt-6 max-w-2xl w-full mx-auto">
            <access-code-input @access-code="accessCodeEntered" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        selected && selected.address && Object.keys(selected.address).length
      "
      class="bg-white"
    >
      <div class="max-w-screen-2xl mx-auto">
        <div v-if="loading" class="py-12 px-6">
          <loading-spinner />
          <p class="text-center text-lg text-gray-500">
            Please wait while we check what's available at your address.
          </p>
        </div>
        <template v-else>
          <div class="py-12 px-6 border-b-2 bg-london-map">
            <div class="max-w-screen-lg mx-auto text-black">
              <div class="mb-4 rounded-xl bg-background m-0 p-5">
                <div
                  class="flex justify-center flex m-0 p-0 mt-4 rounded bg-background"
                >
                  <h3 class="mb-4 text-center text-2xl uppercase font-bold">
                    Selected Address
                  </h3>
                </div>
                <div
                  class="flex bg-background/10 border border-black rounded-xl items-center justify-center p-5 gap-8"
                >
                  <p class="mt-2 text-3xl font-black">
                    {{ selected.address.full_address }}
                  </p>
                  <span
                    class="text-sm underline text-gray-600 cursor-pointer font-light"
                    @click="clearAddress"
                    >change address</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="py-12 px-6 border-b-2">
            <h3
              class="mb-4 text-center text-2xl text-gray-600 uppercase font-bold"
            >
              Select your Plan
            </h3>

            <template v-if="hasAddressSelected">
              <div
                class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                <template v-if="products === null">
                  <loading-spinner />
                </template>
                <template v-else-if="products.plans.length > 0">
                  <template
                    v-for="(product, index) in products.plans"
                    :key="index"
                  >
                    <product-card
                      v-if="services[product.productClass]"
                      has-selection
                      :selected="
                        selected.product?.productName === product.productName
                      "
                      class="cursor-pointer"
                      :product-name="product.productName"
                      :speed-up="product.speeds.up"
                      :speed-down="product.speeds.down"
                      :price="product.price"
                      :speed-equivocation="product.speedEquivocation"
                      :product-image="product.productImage"
                      :show-price="true"
                      @click="selectProduct(product)"
                    />
                  </template>
                </template>
                <template v-else>
                  <p>No products are available</p>
                </template>
              </div>
            </template>
          </div>
          <div v-if="selected.product" class="py-12 px-6 border-b-2">
            <h3
              class="mb-4 text-center text-2xl text-gray-600 uppercase font-black"
            >
              Select a modem
            </h3>
            <div
              class="max-w-screen-lg mx-auto grid grid-flow-row sm:grid-flow-col auto-cols-fr gap-8"
            >
              <div v-for="(product, index) in products?.modems" :key="index">
                <div v-if="product.price == 0">
                  <product-type-card
                    title="I'll bring my own*"
                    description="We ask that you bring your own modem / router; it might require a tiny bit of reconfiguration but nothing difficult and we can help if you get stuck."
                    :selected="
                      selected.modem?.productName === product.productName
                    "
                    @click="selectModem(product)"
                  />
                </div>
                <div v-else>
                  <product-type-card
                    title="I'd like a modem"
                    :description="`+${getDollars(product.price)}`"
                    :selected="
                      selected.modem?.productName === product.productName
                    "
                    @click="selectModem(product)"
                  />
                </div>
              </div>
            </div>
            <p class="mt-4 max-w-xl mx-auto text-center text-gray-700">
              * If you really need a new one, then we can suggest some models to
              you.
            </p>
          </div>
          <div v-if="selected.modem" class="py-12 px-6 border-b-2 bg-brand">
            <div class="max-w-screen-lg mx-auto text-black">
              <div class="mb-4 rounded-xl bg-background m-0 p-5">
                <div
                  class="flex justify-center items-center flex m-0 p-0 mt-4 rounded bg-background"
                >
                  <h3 class="mb-4 text-center text-2xl uppercase font-bold">
                    Your Choices
                  </h3>
                </div>
                <div
                  class="border border-black rounded-xl items-center justify-center pt-5"
                >
                  <div
                    class="p-8 grid items-center grid-flow-row sm:grid-flow-col auto-cols-fr gap-8"
                  >
                    <p class="justify-center mt-2 text-3xl font-black">
                      {{ selected.address.full_address }}
                    </p>
                    <div>
                      <h5 class="text-2xl font-semibold">
                        {{ selected.modem.productName }}
                      </h5>
                      <h3 class="text-4xl">
                        {{ getDollars(selected.modem.price) }}
                      </h3>
                    </div>
                    <div v-if="selected && selected.product">
                      <h5 class="text-2xl font-semibold">
                        {{ selected.product.productName }}
                      </h5>
                      <h3 class="text-4xl">
                        <span>
                          {{ getDollars(selected.product.price) }}
                        </span>
                        <span class="text-xl"> /month </span>
                      </h3>
                    </div>
                  </div>
                  <div class="flex justify-center flex m-0 p-0 mt-4">
                    <p class="flex text-center text-sm font-medium text-black">
                      If you already have broadband but want to make the switch
                      we'll need to know your previous provider and account
                      number.
                      <provider-details>
                        <span class="underline cursor-pointer">
                          Where can I find this?</span
                        >
                      </provider-details>
                    </p>
                  </div>
                  <div class="flex items-center justify-center p-5">
                    <template v-if="canContinue">
                      <ui-button
                        tag="router-link"
                        to="/register/2"
                        class="italic w-full text-2xl"
                        rounded
                        size="lg"
                        theme="dark"
                      >
                        Next →
                      </ui-button>
                    </template>
                  </div>
                </div>
              </div>
              <div class="my-6" />
            </div>
          </div>
          <div v-else class="py-12 px-6 h-50 bg-brand" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddressSearch from "@/components/AddressSearch.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProviderDetails from "./components/ProviderDetails.vue";

import ProductCard from "@/components/ProductCard.vue";
import ProductTypeCard from "./components/ProductTypeCard.vue";

import UiButton from "@/components/ui/Button.vue";

import { getProductListFromApi } from "@/lib/products";

import AccessCodeInput from "@/components/AccessCodeInput.vue";

interface AccessCode {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
}

interface AddressesItem {
  id: number;
  full_address: string;
}

interface AddressServices {
  ufb: boolean;
  fwa: boolean;
  vdsl: boolean;
  adsl: boolean;
}

interface Transfer {
  dont_transfer: boolean;
  can_continue: boolean;
  transfer_from: string;
  name_on_account: string;
  account_number: string;
}

interface ProductSpeeds {
  up: number;
  down: number;
}

interface Product {
  productName: string;
  productImage: string;
  productClass: string;
  stripeCode: string;
  price: number;
  showPrice: boolean;
  speeds: ProductSpeeds;
}

interface Modem {
  productName: string;
  productClass: string;
  stripeCode: string;
  price: number;
}

interface SelectedAddress {
  address: AddressesItem | null;
  transfer: Transfer | null;
  product: Product | null;
  modem: Modem | null;
}

export default defineComponent({
  name: "SignUpStep1",

  components: {
    AddressSearch,
    AccessCodeInput,
    LoadingSpinner,
    ProviderDetails,
    ProductCard,
    UiButton,
    ProductTypeCard,
  },

  data() {
    return {
      selected: {} as SelectedAddress | null,
      loading: false,
      isDefaultModem: true,
      services: {
        ufb: false,
        fwa: false,
        vdsl: false,
        adsl: false,
      } as AddressServices,
      errors: null,
      products: null as Awaited<
        ReturnType<typeof getProductListFromApi>
      > | null,
      accessCode: undefined as AccessCode | undefined,
      hasAccessCode: false,
    };
  },

  computed: {
    canContinue(): boolean {
      if (this.getAccessCode !== null && this.selected) {
        if (
          this.selected.address &&
          this.selected.product &&
          this.selected.modem
        ) {
          return true;
        }
      }

      return false;
    },

    hasAccessCodeSelected(): boolean {
      const hasAccessCode: boolean =
        localStorage.getItem("affinity_coupon_code") !== null;
      return hasAccessCode;
    },

    hasAddressSelected(): boolean {
      if (this.selected) {
        if (this.selected.address) {
          return true;
        }
      }

      return false;
    },
  },

  watch: {
    accessCode() {
      this.loadProducts();
    },
  },

  created() {
    if (this.$route.params.address) {
      this.selectAddress(JSON.parse(this.$route.params.address as string)); // TODO FIXME using params in router.push is an antipattern: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#important-note
      this.selected = this.getAddress();
    } else if (localStorage.getItem("affinity_signup")) {
      this.selected = this.getAddress();
      if (this.selected && this.selected.address) {
        this.fetchAddressServices(this.selected.address.id);
      }
    }
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    loadProducts() {
      getProductListFromApi().then((products) => (this.products = products));
    },
    getAddress(): SelectedAddress | null {
      const address = JSON.parse(
        localStorage.getItem("affinity_signup") as string,
      ) as SelectedAddress;
      if (address) {
        return address;
      }

      return null;
    },

    getAccessCode(): AccessCode | null {
      const accessCode = JSON.parse(
        localStorage.getItem("affinity_coupon_code") as string,
      ) as AccessCode;
      if (accessCode) {
        return accessCode;
      }

      return null;
    },

    selectAddress(address: AddressesItem) {
      if (address) {
        const parsed = JSON.stringify({
          address,
          transfer: null,
          product: null,
          modem: null,
        } as SelectedAddress);

        localStorage.setItem("affinity_signup", parsed);
        this.selected = JSON.parse(parsed);
        if (this.selected && this.selected.address) {
          this.fetchAddressServices(this.selected.address.id);
        }
      }
    },

    accessCodeEntered(accessCode: AccessCode) {
      var affinityCouponCode: string;
      affinityCouponCode = JSON.stringify(accessCode);
      localStorage.setItem("affinity_coupon_code", affinityCouponCode);
      this.hasAccessCode = true;
      this.accessCode = accessCode;
    },

    selectProduct(product: Product) {
      if (this.selected) {
        this.selected.product = product;

        // Select default modem
        // if (this.isDefaultModem) {
        //   this.selected.modem = {
        //     productName: this.products.modems[0]
        //   }
        // }

        localStorage.setItem("affinity_signup", JSON.stringify(this.selected));
      }
    },

    selectModem(modem: Modem) {
      // this.isDefaultModem = false // Set default modem off
      if (this.selected) {
        this.selected.modem = modem;

        localStorage.setItem("affinity_signup", JSON.stringify(this.selected));
      }
    },

    clearAddress() {
      const search = this.$refs.search as HTMLInputElement;
      this.selected = null;
      this.services = {
        ufb: false,
        fwa: false,
        vdsl: false,
        adsl: false,
      };
      localStorage.removeItem("affinity_signup");
      search.focus();
    },

    fetchAddressServices(id: number) {
      this.loading = true;
      this.$api
        .get<AddressServices>(`/addresses/${id}`)
        .then((res) => {
          this.services = res.data;
          this.services.fwa = true; // Always allows FWA
          this.loading = false;
        })
        .catch((error) => {
          this.errors = error;
          this.loading = false;
        });
    },

    getDollars(amount: number) {
      const dollars = amount / 100;

      return dollars.toLocaleString("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
});
</script>
