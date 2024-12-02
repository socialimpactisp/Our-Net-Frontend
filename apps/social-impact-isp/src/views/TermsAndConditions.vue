<template>
  <ui-banner>Terms &amp; Conditions</ui-banner>
  <page-container>
    <terms-and-conditions
      isp-name="Social Impact ISP"
      parent-company="Social Impact ISP Ltd (a subsidiary of Devoli Ltd)"
      website="https://ournet.com/"
      support-phone="09 883 0018"
      support-phone-e164="+6498830018"
      support-email="support@ournet.com"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { TermsAndConditions } from "@affinity/ui/affinity";
import { PageContainer } from "@affinity/ui/layout";
</script>
