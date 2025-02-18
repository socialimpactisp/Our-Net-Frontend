<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-end space-y-6 sm:space-y-0 sm:space-x-8"
  >
    <template v-if="isAccount">
      <app-nav-link tag="router-link" to="/" class="flex items-center">
        Back to OurNet
        <icon-arrow-up-right class="ml-2 h-4" />
      </app-nav-link>
    </template>
    <template v-else>
      <app-nav-link
        tag="router-link"
        to="/"
        :active="$router.currentRoute.value.name === 'home'"
      >
        Home
      </app-nav-link>

      <app-nav-link
        tag="router-link"
        to="/faq"
        :active="$router.currentRoute.value.name === 'faq'"
      >
        FAQs
      </app-nav-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppNavLink from "./AppNavLink.vue";
import IconArrowUpRight from "./icons/ArrowUpRight.vue";

export default defineComponent({
  name: "AppNav",

  components: {
    AppNavLink,
    IconArrowUpRight,
  },

  computed: {
    isAccount(): boolean {
      return this.$route.path.includes("/account");
    },
  },
});
</script>
