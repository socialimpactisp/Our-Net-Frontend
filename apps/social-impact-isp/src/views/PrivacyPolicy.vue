<template>
  <ui-banner>Privacy Policy</ui-banner>
  <page-container>
    <privacy-policy
      isp-name="OurNet"
      parent-company="OurNet Ltd (a subsidiary of Devoli Ltd)"
      support-phone="09 883 0018"
      support-phone-e164="+6498830018"
      support-email="support@ournet.com"
    />
  </page-container>
</template>

<script lang="ts" setup>
import { UiBanner } from "@affinity/ui";
import { PrivacyPolicy } from "@affinity/ui/affinity";
import { PageContainer } from "@affinity/ui/layout";
</script>
