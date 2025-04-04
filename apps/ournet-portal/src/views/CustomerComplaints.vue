<template>
  <ui-banner>
    Our Net - Customer Complaints Policy
    <template #content>
      <p>Our Net's Commitment to our customers</p>
    </template>
  </ui-banner>

  <page-container>
    <customer-complaints
      isp-name="Our Net"
      website="https://our.net.nz/"
      support-phone="0800 006 282"
      support-phone-e164="+64800006282"
      support-email="support@our.net.nz"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { PageContainer } from "@affinity/ui/layout";
import { CustomerComplaints } from "@affinity/ui/affinity";
</script>
