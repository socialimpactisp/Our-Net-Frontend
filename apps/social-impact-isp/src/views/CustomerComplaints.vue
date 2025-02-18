<template>
  <ui-banner>
    OurNet - Customer Complaints Policy
    <template #content>
      <p>OurNet's Commitment to our customers</p>
    </template>
  </ui-banner>

  <page-container>
    <customer-complaints
      isp-name="OurNet"
      website="https://ournet.com/"
      support-phone="09 883 0018"
      support-phone-e164="+6498830018"
      support-email="support@ournet.com"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { PageContainer } from "@affinity/ui/layout";
import { CustomerComplaints } from "@affinity/ui/affinity";
</script>
