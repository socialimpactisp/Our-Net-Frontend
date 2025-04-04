<template>
  <div class="relative w-full flex items-center">
    <input
      ref="input"
      v-model="search"
      type="search"
      name="search"
      :placeholder="placeholder"
      class="block w-full appearance-none pl-6 pr-16 py-4 text-lg font-medium bg-white border border-black placeholder-gray-600 text-gray-900 leading-5 focus:ring-gray-200 focus:outline-none focus:shadow-outline rounded-full transition duration-200 ease-in-out"
      autocomplete="off"
      :autofocus="autoFocus"
      @input="onInput"
      @focus="focused"
      @keydown.enter.prevent="enterPressed"
      @keydown.up.prevent="keyArrows('up')"
      @keydown.down.prevent="keyArrows('down')"
    />
    <button
      type="button"
      class="block z-10 absolute right-0 mr-6 h-6 w-6 text-gray-600 cursor-pointer"
    >
      <icon-search />
    </button>

    <transition>
      <div
        v-show="(isActive && addresses.length) || loading"
        ref="dropdown"
        class="address-search absolute inset-x-0 z-20 mt-2 rounded-md shadow-lg font-sans"
        style="display: none"
      >
        <div
          class="rounded-md ring-1 ring-gray-500 ring-opacity-10 py-1 bg-white divide-y"
        >
          <div v-if="loading">
            <div class="p-6 text-center">
              <loading-spinner />
            </div>
          </div>
          <template v-else>
            <div v-for="(address, index) in addresses" :key="index">
              <span
                class="block w-full cursor-pointer uppercase px-4 py-2 font-display font-medium leading-5 text-black text-left hover:bg-gray-200 focus:outline-none focus:bg-gray-100"
                :class="{ 'bg-gray-200': hovered && hovered.id === address.id }"
                @click="selectItem(address)"
              >
                {{ address.full_address }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import IconSearch from "@/components/icons/Search.vue";

export interface Address {
  id: number;
  full_address: string;
}

type Addresses = Address[];

export default defineComponent({
  name: "AddressSearch",

  components: {
    LoadingSpinner,
    IconSearch,
  },

  props: {
    placeholder: {
      type: String,
      default: "Enter your address...",
    },
    autoFocus: Boolean,
  },

  emits: ["selected"],

  data() {
    return {
      search: "",
      addresses: [] as Address[],
      selected: null,
      hovered: {} as Address | null,
      loading: false,
      isActive: false,
      errors: null,
      debounce: 0,
    };
  },

  watch: {
    isActive(active) {
      if (!active) {
        this.setHovered(null);
      }
    },

    addresses(value: Address[]) {
      value.length ? (this.isActive = true) : (this.isActive = false);
    },
  },

  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
    }
  },

  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
    }
  },

  methods: {
    focus() {
      (this.$refs.input as HTMLInputElement).focus();
    },

    setHovered(option: Address | null) {
      if (!option) return;
      this.hovered = option;
    },

    selectItem(item: Address) {
      const input = this.$refs.input as HTMLInputElement;

      this.search = "";
      this.isActive = false;
      this.addresses = [];
      this.setHovered(null);
      this.loading = false;
      input.blur();
      this.$emit("selected", item);
    },

    onInput(event: Event) {
      clearTimeout(this.debounce);
      this.loading = true;

      this.debounce = setTimeout(() => {
        const value = (event.target as HTMLInputElement).value;

        if (value) {
          this.fetchSearchResults(value);
        } else {
          this.isActive = false;
          this.addresses = [];
          this.setHovered(null);
          this.loading = false;
        }
      }, 500);
    },

    focused() {
      if (this.addresses.length) {
        this.isActive = true;
      }
    },

    enterPressed() {
      if (!this.hovered) return;
      if (this.addresses.length) {
        if (Object.keys(this.hovered).length) {
          this.selectItem(this.hovered);
          return;
        }
      }

      return;
    },

    keyArrows(direction: string) {
      const sum = direction === "down" ? 1 : -1;
      if (this.isActive && this.hovered) {
        let index = this.addresses.indexOf(this.hovered) + sum;
        index =
          index > this.addresses.length - 1 ? this.addresses.length : index;
        index = index < 0 ? 0 : index;

        this.setHovered(this.addresses[index]);
      } else {
        this.isActive = true;
      }
    },

    fetchSearchResults(query: string) {
      this.$api
        .get<Addresses>("/addresses", {
          params: {
            q: query,
          },
        })
        .then((res) => {
          this.addresses = res.data;
          this.setHovered(this.addresses[0]);
          this.loading = false;
        })
        .catch((err) => {
          this.errors = err;
          this.loading = false;
        });
    },

    isInWhitelist(el: EventTarget | null) {
      if (el === (this.$refs.input as HTMLElement)) return true;
      if (el === (this.$refs.dropdown as HTMLElement)) return true;

      // All children from input
      if ((this.$refs.input as HTMLElement) !== undefined) {
        const children = (this.$refs.input as HTMLElement).querySelectorAll(
          "*",
        );
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }

      // All children from dropdown
      if ((this.$refs.dropdown as HTMLElement) !== undefined) {
        const children = (this.$refs.dropdown as HTMLElement).querySelectorAll(
          "*",
        );
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    },

    clickedOutside(event: MouseEvent) {
      const target = event.target;
      if (!this.isInWhitelist(target)) {
        this.isActive = false;
      }
    },
  },
});
</script>

<style>
.address-search {
  top: 100%;
}
</style>
