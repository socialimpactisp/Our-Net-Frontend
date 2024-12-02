<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface AddressesItem {
  id: number;
  full_address: string;
}

export default defineComponent({
  name: "SignUp",

  created() {
    if (this.$route.query.address) {
      this.selectAddress(JSON.parse(this.$route.query.address as string));
      this.$router.replace("/register/1");
    } else if (localStorage.getItem("affinity_signup")) {
      const yhAddress = JSON.parse(
        localStorage.getItem("affinity_signup") as string,
      );

      if (
        yhAddress.address &&
        yhAddress.planType &&
        yhAddress.plan &&
        yhAddress.modem
      ) {
        this.$router.replace("/register/2");
      } else {
        this.$router.replace("/register/1");
      }
    } else {
      this.$router.replace("/register/1");
    }
  },

  methods: {
    selectAddress(address: AddressesItem) {
      if (address) {
        const parsed = JSON.stringify({
          address,
          transfer: null,
          planType: null,
          plan: null,
          modem: null,
        });

        localStorage.setItem("affinity_signup", parsed);
      }
    },
  },
});
</script>
