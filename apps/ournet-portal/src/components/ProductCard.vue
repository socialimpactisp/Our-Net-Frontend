<template>
  <div
    class="rounded border border-brand flex flex-col gap-2 px-4 py-8 min-w-[220px]"
  >
    <hgroup class="tracking-tight uppercase text-center">
      <h2
        class="text-3xl font-bold tracking-tight"
        :class="hasSelection && !selected ? 'text-gray-600' : ' text-black'"
      >
        {{ productName }}
      </h2>
      <p class="text-sm font-semibold">
        {{ speedEquivocation }} {{ speedDown }}/{{ speedUp }}
      </p>
    </hgroup>

    <hr />

    <div class="flex justify-center relative grow">
      <div>
        <img :src="productImage" class="object-contain h-[250px]" />
      </div>
      <div
        v-if="showPrice"
        class="absolute flex flex-col top-4 right-2 w-16 h-16 rounded-full bg-brand items-center justify-center text-brand-foreground tracking-tight"
      >
        <span class="font-bold text-2xl leading-none">
          {{ getDollars(price) }}
        </span>
        <span class="text-sm leading-none">/{{ interval }}</span>
      </div>
    </div>

    <div class="flex items-center justify-center bg-background mt-4">
      <template v-if="hasSelection">
        <div
          class="p-1 flex items-center justify-center w-10 h-10 rounded-full border border-brand text-white"
          :class="{ 'bg-brand': hasSelection && selected }"
        >
          <icon-check v-if="selected" class="h-10" stroke-width="3" />
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col items-center gap-1">
          <ui-button
            tag="router-link"
            to="/register"
            theme="dark"
            size="lg"
            class="italic"
            rounded
          >
            Sign up Now
          </ui-button>
          <router-link to="/offer-summary">More info</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconCheck from "@/components/icons/Check.vue";
import UiButton from "@/components/ui/Button.vue";

export default defineComponent({
  name: "ProductCard",

  components: {
    IconCheck,
    UiButton,
  },

  props: {
    hasSelection: Boolean,
    selected: Boolean,
    productName: {
      type: String,
      default: "",
    },
    productClass: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    showPrice: Boolean,
    speedUp: {
      type: Number,
      default: 0,
    },
    speedDown: {
      type: Number,
      default: 0,
    },
    speedEquivocation: {
      type: String,
      default: "",
    },
    productImage: {
      type: String,
      default: "",
    },
    interval: {
      type: String,
      default: "month",
    },
  },

  checkboxClasses(): string {
    return this.selected
      ? "bg-black text-white border-transparent"
      : "border-gray-700";
  },

  methods: {
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
