<template>
  <div>
    <UiBanner>
      Our Net - Digital Literacy Commitment.
      <template #content>
        <p>
          If you have any further questions, please get in touch with
          our Customer Support team.
        </p>
        <p>
          <ui-button
            tag="a"
            href="https://digitalpassport.co.nz/" target="_blank" rel="noopener noreferrer"
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
          title:
            "What is 'Digital Literacy', and why is it important?",
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
          title: "What is Digital Passport, and why have you partnered with them?",
          value: 
          "Digital Passport is a free online education platform developed by the Ministry of Social Development (MSD) in partnership with AcademyEX. It was designed to enhance digital skills and confidence among jobseekers. It offers self-paced learning modules that cover a range of digital competencies, from basic tasks like sending emails to more advanced skills involving the latest AI tools. As users progress through the three levels of training, they earn completion badges that can be added to their CVs, demonstrating their digital proficiency to potential employers.<br/><br/> Our Net has partnered with Digital Passport because we believe in leveraging existing, effective resources rather than reinventing the wheel. This collaboration is a cost-effective approach that aligns with our commitment to digital literacy and our mission to bridge the digital divide in New Zealand. By working together with like-minded organisations like Digital Passport, we can provide our customers with high-quality digital education, empowering them to fully utilise the fast, affordable internet services we offer and to participate more actively in today's digital society.",
          category: "General",
        },
      ],
    };
  },
});
</script>
