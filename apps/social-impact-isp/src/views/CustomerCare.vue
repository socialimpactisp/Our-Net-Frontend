<template>
  <ui-banner> OurNet - Customer Care Policy </ui-banner>
  <page-container>
    <customer-care
      isp-name="OurNet"
      support-phone="09 883 0018"
      support-phone-e164="+6498830018"
      support-email="support@ournet.com"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { PageContainer } from "@affinity/ui/layout";
import { CustomerCare } from "@affinity/ui/affinity";
</script>
