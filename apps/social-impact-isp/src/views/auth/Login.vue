<template>
  <div>
    <loading-spinner v-if="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default defineComponent({
  name: "LoginView",

  components: {
    LoadingSpinner,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    isLoading() {
      return this.$auth.isLoading();
    },
  },

  watch: {
    isLoading(value) {
      if (!value) {
        this.loading = false;
        if (this.$auth.isAuthenticated()) {
          this.$router.push("/");
        } else {
          this.$auth.loginWithRedirect();
        }
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.loading = false;
      if (this.$auth.isAuthenticated()) {
        this.$router.push("/");
      } else {
        this.$auth.loginWithRedirect();
      }
    }
  },
});
</script>
