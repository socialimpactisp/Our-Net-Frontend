<template>
  <div>
    <div class="relative pt-12 pb-6">
      <div class="max-w-screen-2xl mx-auto px-6">
        <div class="max-w-xl text-gray-900">
          <h1 class="text-4xl font-black tracking-tight">My Account</h1>
        </div>
      </div>
    </div>

    <div class="relative bg-white">
      <div class="relative z-10 max-w-screen-2xl mx-auto px-6">
        <div class="shadow-lg rounded-xl">
          <div
            class="ring-1 ring-gray-500 ring-opacity-10 rounded-xl bg-white flex overflow-hidden"
            style="min-height: 6rem"
          >
            <div class="w-64 shrink-0 bg-gray-100 border-r border-gray-200 p-6">
              <account-nav />
            </div>
            <div class="flex-1 px-8 py-6">
              <router-view />
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 top-0 h-16" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AccountNav from "./components/AccountNav.vue";

export default defineComponent({
  name: "AccountView",

  components: {
    AccountNav,
  },
});
</script>
