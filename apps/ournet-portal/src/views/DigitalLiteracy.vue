<template>
  <div>
    <UiBanner>
      Digital Literacy Commitment.
      <template #content>
        <p>
          If you have any further questions, please get in touch with our
          Customer Support team.
        </p>
        <p>
          <ui-button
            tag="a"
            href="https://digitalpassport.co.nz/"
            target="_blank"
            rel="noopener noreferrer"
            theme="danger"
            outline
          >
            Go To Digital Passport Website
          </ui-button>
        </p>
      </template>
    </UiBanner>

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
  name: "FAQ",

  components: {
    UiAccordion,
    UiButton,
    UiBanner,
  },

  data() {
    return {
      faqs: [
        {
          title: "What is 'Digital Literacy', and why is it important?",
          value:
            "Digital literacy is the ability to find, evaluate, use, create, and communicate information using digital technologies. It is essential for accessing education, employment, health services, and civic participation in an increasingly digital world. For underserved communities in New Zealand, improving digital literacy helps bridge social and economic gaps by enabling equal access to opportunities and resources. Strengthening digital skills supports whānau wellbeing and empowers communities to thrive in the digital age.",
          category: "General",
        },
        {
          title: "Why does Our Net have a commitment to Digital Literacy?",
          value:
            "Our Net is committed to digital literacy because providing fast, affordable internet is only part of the solution—people also need the skills and confidence to use it effectively. For our Digital Equity (DE) customers, many of whom face systemic barriers to access, digital literacy opens doors to education, job opportunities, healthcare, and essential services. By supporting digital literacy, we help whānau and communities unlock the full value of connectivity, creating long-term impact beyond just being online. It's about ensuring everyone has the tools to participate fully and thrive in Aotearoa's digital future.",
          category: "General",
        },
        {
          title: "What is Digital Passport?",
          value:
            "Digital Passport is a free online tool for anyone wanting to grow their digital skills and confidence. It's simple, flexible, and easy to follow, with lessons covering everything from sending an email to using the latest AI tools. Learners can progress at their own pace and earn badges to showcase their skills on their CVs. Developed by the Ministry of Social Development (MSD) in partnership with academyEX, it's designed to equip people with the skills they need to thrive in today's connected world.",
          category: "General",
        },
        {
          title: "Why have you partnered with Digital Passport?",
          value:
            "We've partnered with Digital Passport because it works. Rather than reinvent the wheel, we're supporting a trusted resource that helps close the digital divide in Aotearoa. It's a practical, cost-effective way to support our customers—giving them the skills to make the most of their fast, affordable internet and feel more confident in their digital lives.",
          category: "General",
        },
      ],
    };
  },
});
</script>
