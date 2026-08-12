<template>
  <div>
    <UiBanner>
      Digital Equity Household Eligibility Criteria.
      <template #content>
        <p>
          If you have any further questions, please get in touch with our
          Customer Support team.
        </p>
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
            "What are your eligibility criteria for DE (Digital Equity) customer households?",
          value: `To be considered as a DE customer household, you must meet the following THREE criteria (1, 2 & 3):
          <ul class="block list-disc mt-4 pl-4 space-y-2">
            <ol>1. You must NOT have a current fibre internet connection for at least 3 months.</ol>
            <ol>2. You must have an ONT installed in your home - ONT stands for 'Optical Network Terminal' and is sometimes called a 'Fibre Box'. This is the little box that brings fibre internet into your home. If you are unsure whether or not you have an ONT in your home, we can normally check this for you from our side. The ONT allows you to receive our fast fibre internet services. The Wi-Fi router is connected to the ONT.</ol>
            <ol>3. You have a current COMMUNITY SERVICES CARD - the homeowner, or the person who is on the rental lease for your home, is the person that must provide proof that they have a current community services card. We do accept the SuperGold card as long as this is combined with a Community Services Card.</ol>
            <ol> Note: Proof of income status can be provided by providing Community Services Card or  or evidence of MyMSD Benefit Breakdown letter.</ol>

            
            <br>And also ONE criteria from the following:</br>
            
            <ol>4. You are a PUBLIC or SOCIAL HOUSING tenant, for example Kāinga Ora or another subsidised-rent Social or Community Housing Provider. If you are a tenant in a Community Housing provider you must be able to provide evidence of a tenancy agreement.</ol>
            <ol>5. You have child/ren in your household who attend a SCHOOL that has an Equity Indexof 490+ (formerly known as low decile).</ol>         
          </ul>
          `,
          category: "General",
        },
        {
          title:
            "What is a Digital Equity customer, and why can they access our low cost plans?",
          value:
            "Our Net is a socially conscious organisation, striving to create meaningful impact in Aotearoa New Zealand through the provision of affordable fast internet to low income households.<br/><br/> For this reason, we offer affordable, low cost, fast internet services to eligible low income households (eligibility criteria and T's & C's apply). We refer to these customers as our 'Digital Equity' customers.",
          category: "General",
        },
        {
          title: "Can I use my own router?",
          value:
            "For our DIGITAL EQUITY customers: we will provide you with a Wi-Fi router when we are setting up your internet connection. Our team will walk you through the process of getting the router set up. However, this router will remain the property of Our Net. If you cancel your plan with us, or switch to another Internet Service Provider, you must return the router.",
          category: "General",
        },
      ],
    };
  },
});
</script>
