<template>
  <img src="/images/retailer-logo.png" alt="" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLogo",

  props: {
    fill: {
      type: String,
      default: "",
    },
  },
});
</script>
