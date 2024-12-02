<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "App",

  components: {
    AppLayout,
  },
});
</script>
