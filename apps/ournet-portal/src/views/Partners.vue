<template>
  <div>
    <UiBanner>
      Our Community Partners.
      <template #content>
        <p>The Community organisations that we proudly partner with.</p>
        <p>
          <ui-button
            tag="a"
            href="https://intercom.help/our-net/en"
            target="_blank"
            rel="noopener noreferrer"
            theme="danger"
            outline
          >
            Get Support
          </ui-button>
        </p>
      </template>
    </UiBanner>

    <!-- ✅ Partner logos section -->
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 items-stretch"
      >
        <a
          v-for="partner in partners"
          :key="partner.name"
          :href="partner.website"
          target="_blank"
          rel="noopener noreferrer"
          class="block text-center border p-4 rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-20 w-auto mx-auto mb-2 object-contain"
          />
          <p class="text-sm font-semibold text-brand-dark">
            {{ partner.name }}
          </p>
          <p class="text-xs text-brand-mid whitespace-pre-line mt-1">
            {{ partner.description }}
          </p>
        </a>
      </div>
    </div>

    <!-- ✅ Accordion section -->
    <div class="bg-white py-12">
      <div class="max-w-screen-md mx-auto px-12">
        <ui-accordion :items="faqs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiAccordion from "@/components/ui/Accordion.vue";
import UiButton from "@/components/ui/Button.vue";
import { UiBanner } from "@affinity/ui";

export default defineComponent({
  name: "CommunityPartners",
  components: {
    UiAccordion,
    UiButton,
    UiBanner,
  },
  data() {
    return {
      partners: [
        {
          name: "Tokotoko Solutions",
          logo: "/images/partner1.png",
          website: "https://tokotokosolutions.nz",
          description:
            "Whangārei-based organisation\nTe Taitokerau (Northland)\nKaiwhakahaere: Matua Samu Isopo",
        },
        {
          name: "Digital Natives Academy",
          logo: "/images/partner2.png",
          website: "https://digitalnatives.academy/",
          description:
            "Rotorua-based digital hub\nTe Moana a Toi (BOP)\nKaiwhakahaere: Potaua & Lasa Biasiny-Tule",
        },
      ],
      faqs: [
        {
          title: "Tokotoko Solutions",
          value: `Tokotoko Solutions works with youth and adults to discover their potential through education, training, and employment so they can become self-reliant while leading a life with meaning and purpose:
<ul class="block list-disc mt-4 pl-4 space-y-2">
  <li>Kaiwhakahaere: Matua Samu Isopo</li>
  <li>Location: Whangārei</li>
  <li>Region: Te Taitokerau (Northland)</li>
</ul>`,
          category: "General",
        },
        {
          title: "Digital Natives Academy",
          value: `DNA is an intergenerational centre of digital excellence, a place where curious young minds can find exceptional leaders along with state of the art digital tech:
<ul class="block list-disc mt-4 pl-4 space-y-2">
  <li>Kaiwhakahaere: Potaua & Lasa Biasiny-Tule</li>
  <li>Location: Rotorua</li>
  <li>Region: Te Moana a Toi (BOP)</li>
</ul>`,
          category: "General",
        },
      ],
    };
  },
});
</script>
