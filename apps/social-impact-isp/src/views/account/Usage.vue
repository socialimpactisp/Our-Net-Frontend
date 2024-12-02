<template>
  <div>
    <div class="mb-6 pb-5 border-b">
      <h2 class="text-2xl font-semibold tracking-tight">Usage</h2>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountUsage",

  components: {},

  data() {
    return {
      showServiceUsage: false,
      serviceId: 0,
    };
  },

  methods: {
    setServiceId(serviceId: number) {
      this.serviceId = serviceId as number;
      this.showServiceUsage = true;
    },
  },
});
</script>
