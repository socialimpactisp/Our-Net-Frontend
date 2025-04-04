<template>
  <div class="flex flex-col space-y-2">
    <account-nav-item
      tag="router-link"
      :to="`/account/${nickname}`"
      :active="$router.currentRoute.value.path === `/account/${nickname}`"
    >
      <icon-home class="h-6 mr-3 opacity-50" />
      Home
    </account-nav-item>

    <account-nav-item
      tag="router-link"
      :to="`/account/${nickname}/profile`"
      :active="
        $router.currentRoute.value.path === `/account/${nickname}/profile`
      "
    >
      <icon-user-circle class="h-6 mr-3 opacity-50" />
      Profile
    </account-nav-item>

    <account-nav-item
      tag="router-link"
      :to="`/account/${nickname}/billing`"
      :active="
        $router.currentRoute.value.path === `/account/${nickname}/billing`
      "
    >
      <icon-credit-card class="h-6 mr-3 opacity-50" />
      Billing
    </account-nav-item>

    <account-nav-item
      tag="router-link"
      :to="`/account/${nickname}/usage/summary`"
      :active="
        $router.currentRoute.value.path.startsWith(
          `/account/${nickname}/usage/`,
        )
      "
    >
      <icon-unlimited class="h-6 mr-3 opacity-50" />
      Usage
    </account-nav-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconCreditCard from "@/components/icons/CreditCard.vue";
import IconHome from "@/components/icons/Home.vue";
import IconUserCircle from "@/components/icons/UserCircle.vue";
import IconUnlimited from "@/components/icons/Unlimited.vue";

import AccountNavItem from "./AccountNavItem.vue";

export default defineComponent({
  name: "AccountNav",

  components: {
    IconCreditCard,
    IconHome,
    IconUserCircle,
    IconUnlimited,
    AccountNavItem,
  },

  computed: {
    nickname(): string {
      return this.$route.params.nickname as string; // TODO FIXME using params in router.push is an antipattern: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#important-note
    },
  },
});
</script>
