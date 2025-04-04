<template>
  <ui-banner> Our Net - Customer Care Policy </ui-banner>
  <page-container>
    <customer-care
      isp-name="Our Net"
      support-phone="0800 006 282"
      support-phone-e164="+64800006282"
      support-email="support@our.net.nz"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { PageContainer } from "@affinity/ui/layout";
import { CustomerCare } from "@affinity/ui/affinity";
</script>
