<template>
  <AppLayout>
    <template #header>
      <app-header v-model:authenticated="isAuthenticated" />
    </template>

    <slot />

    <template #footer>
      <app-footer :company="{ name: 'OurNet' }" />
    </template>
  </AppLayout>
</template>

<script lang="ts" setup>
import { AppLayout } from "@affinity/ui/layout";
import AppFooter from "./AppFooter.vue";
import AppHeader from "./AppHeader.vue";

const isAuthenticated = false;
</script>
