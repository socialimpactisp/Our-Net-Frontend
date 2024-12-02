<template>
  <AppFooter
    :company="$whitelabel.company"
    logo="/images/retailer-logo.png"
    :inverted="true"
  >
    <AppFooterColumn>
      <AppFooterLink is="router-link" to="/privacy"
        >Privacy Policy</AppFooterLink
      >
      <AppFooterLink is="router-link" to="/terms"
        >Terms &amp; Conditions</AppFooterLink
      >
    </AppFooterColumn>

    <AppFooterColumn heading="Policy">
      <AppFooterLink is="router-link" to="/customer-care"
        >Customer Care</AppFooterLink
      >
      <AppFooterLink is="router-link" to="/customer-complaints"
        >Customer Complaints</AppFooterLink
      >
    </AppFooterColumn>
  </AppFooter>
</template>

<script lang="ts" setup>
import { AppFooter, AppFooterColumn, AppFooterLink } from "@affinity/ui/layout";
</script>
