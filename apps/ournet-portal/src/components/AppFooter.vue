<template>
  <footer class="bg-gray-100 border-t border-brand-light/20">
    <div class="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-2">
          <div class="flex items-center space-x-4">
            <img
              src="/images/retailer-logo.png"
              alt="Our Net Logo"
              class="h-7 w-auto"
            />
          </div>
          <p class="mt-5 text-[14px] font-sans text-brand-mid">
            We are a socially conscious organisation, striving to create
            meaningful impact in Aotearoa New Zealand through the provision of
            affordable fast internet to low income households.
          </p>
        </div>

        <div class="col-span-1">
          <h3 class="text-[13px] font-sans font-medium text-brand-dark mb-4">
            Legal
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/privacy"
                class="text-[13px] font-sans text-brand-mid hover:text-brand-red transition-colors"
              >
                Privacy Policy
              </router-link>
            </li>
            <li>
              <router-link
                to="/terms"
                class="text-[13px] font-sans text-brand-mid hover:text-brand-red transition-colors"
              >
                Terms & Conditions
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col-span-1">
          <h3 class="text-[13px] font-sans font-medium text-brand-dark mb-4">
            Support
          </h3>
          <ul class="space-y-4">
            <li>
              <router-link
                to="/customer-care"
                class="text-[13px] font-sans text-brand-mid hover:text-brand-red transition-colors"
              >
                Customer Care
              </router-link>
            </li>
            <li>
              <router-link
                to="/customer-complaints"
                class="text-[13px] font-sans text-brand-mid hover:text-brand-red transition-colors"
              >
                Customer Complaints
              </router-link>
            </li>
            <li>
              <router-link
                to="/digital-literacy"
                class="text-[13px] font-sans text-brand-mid hover:text-brand-red transition-colors"
              >
                Digital Literacy
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-brand-light/20">
        <p class="text-[13px] font-sans text-brand-mid text-center">
          © {{ new Date().getFullYear() }} {{ company.name }}. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFooter",

  props: {
    company: {
      type: Object,
      required: true,
    },
  },
});
</script>
