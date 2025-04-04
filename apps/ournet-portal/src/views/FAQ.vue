<template>
  <div>
    <UiBanner>
      FAQ - Frequently Asked Questions.
      <template #content>
        <p>
          If you can't find the answer to your question below, please get in touch with
          our Customer Support team.
        </p>
        <p>
          <ui-button
            tag="a"
            href="https://intercom.help/our-net/en" target="_blank" rel="noopener noreferrer"
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
          title: "What is a Digital Equity customer, and why can they access your low cost plans?",
          value:
            "Our Net is a socially conscious organisation, striving to create meaningful impact in Aotearoa New Zealand through the provision of affordable fast internet to low income households.<br/><br/> For this reason, we offer affordable, low cost, fast internet services to eligible low income households (eligibility criteria and T's & C's apply). We refer to these customers as our 'Digital Equity' customers.",
          category: "General",
        },  
        {
          title: "Do you offer retail (normal priced) services?",
          value:
            "Yes, we have a range of retail plans which are comparable in price to what you'd pay with other ISP's. We refer to these as our Retail Plans which are offered to our 'Retail Customers'. Retail Customers typically switch to our internet services, because they want to support other customer households in need. By joining us as a Retail Customer, you will help to subsidise and therefore support our Digital Equity customers.",
          category: "General",
        },
        {
          title: "How you do charge? Can I pay weekly, fortnightly?",
          value:
            "We accept payments via our integration with Stripe. These are normally paid monthly, in advance. However, if you are a Digital Equity customer, we can accept weekly payments to fit your budgeting plan. If you decide to leave at any time, we will refund any unused credit on a prorated basis.",
          category: "General",
        },
        {
          title: "Are your plans unlimited?",
          value:
            "Yes, all Our Net plans offer unlimited data, with local help desk support during business hours.",
          category: "General",
        },
        {
          title: "Do you provide static IP addresses?",
          value:
            "No, at this time we do not offer static IP address services.",
          category: "General",
        },
        {
          title: "Do you offer home phone services? (i.e. VOIP landlines)",
          value:
            "No, at this time we do not offer home phone services.",
          category: "General",
        },
        {
          title: "How fast are Our Net Internet plans?",
          value:
            "There are a few factors that can impact the speed of your connection, including how close you are to an exchange, your computer's capability, modem/router, line quality, software downloads and the number of devices connected.<br/><br/> Our broadband plan speeds represent the theoretic maximum speeds (indicated by a speed value and Mbps suffix e.g., 50Mbps) at which you are able to download and upload data from our network.",
          category: "General",
        },
        {
          title: "How do I check my broadband speed?",
          value:
            'The best way to do an accurate speed test is by completing a quick speed test. We recommend using <a class="underline" href="https://www.speedtest.net">www.speedtest.net</a> and make sure you are using Devoli as the selected server to get the most accurate result. You will need to have your device plugged in via the ethernet cable.',
          category: "General",
        },
        {
          title: "Do I need to get consent to connect fibre at my property?",
          value: 
          `Here is a guide for when you need to gain consent and what type of consent is required:
          <ul class="block list-disc my-4 pl-4 space-y-2">
            <li>If you are living in a rental property, you will need to get written consent from your landlord to go ahead with fibre installation</li>
            <li>If your property is in a right of way (ROW) or shared driveway, you may need to gain written consent from your neighbour(s) - the technician will advise if this is required during their initial visit</li>
            <li>If you live in a multi-dwelling unit (MDU) such as an apartment or flat, you will need to gain written consent from the building owner or body corporate to get fibre installed</li>
          </ul>
          For more information on the consent process, visit your Local Fibre Company's website:
          <ul class="block list-disc mt-4 pl-4 space-y-2">
            <li>Chorus (Most of New Zealand): <a class="underline" href="https://chorus.co.nz">chorus.co.nz</a></li>
            <li>North Power Fibre (Whangarei): <a class="underline" href="https://northpower.com">northpower.com</a></li>
            <li>Tuatahi First Fibre (Waikato, Bay of Plenty, Taranaki): <a class="underline" href="https://tuatahifibre.co.nz/">tuatahifibre.co.nz/</a></li>
            <li>Enable Networks (Christchurch): <a class="underline" href="https://enable.net.nz">enable.net.nz</a></li>
          </ul>
          `,
          category: "General",
        },
        {
          title: "Can I use my own router?",
          value: 
          "For our DIGITAL EQUITY customers: we will provide you with a Wi-Fi router when we are setting up your internet connection. Our team will walk you through the process of getting the router set up. However, this router will remain the property of Our Net. If you cancel your plan with us, or switch to another Internet Service Provider, you must return the router.<br/><br/> For our RETAIL CUSTOMERS: that is our preferred approach. We will do our best to help you get set up, but not be able to offer full troubleshooting assistance for all makes and models of modem. Technically speaking, all plans use DHCP for IPv4 and IPv6, with VLAN 10 tagging.",
          category: "General",
        },
        {
          title:
            "Is there anything I need to be aware of when positioning the modem in my house during the initial set up phase?",
          value: 
          `It's important that modem is placed in the right environment so it operates as efficiently as possible. Here are our top tips:
          <ul class="block list-disc mt-4 pl-4 space-y-2">
            <li>Do not place your modem in direct sunlight or hot areas.</li>
            <li>Do not let your modem come into contact with liquid or moisture at any time. To clean it, wipe it with a damp cloth.</li>
            <li>
              Do not restrict airflow around your modem, as this can make it overheat for example:
              <ul class="block list-disc my-2 pl-4 space-y-2">
                <li>Do not cover it with anything.</li>
                <li>Do not put it in an enclosed space like a drawer or box.</li>
                <li>Do not place it under or behind a desk or large item of furniture.</li>
              </ul>
            </li>
            <li>Do not disassemble your modem.</li>
          </ul>
          `,
          category: "General",
        },
        {
          title: "What happens if I move house?",
          value: 
          `No worries! Your broadband can go with you as well. You must take your Our Net router with you to your new home address.<br/><br/>
          Please give us a bit of notice so that we can tick the right boxes and make sure everything is in place BEFORE you move house. Ideally 15 working days should be enough time for us to get everything ready for you at your new home. Sometimes things might take a bit longer but we'll be in touch if that happens. Depending on where you move to, we may not be able to provide you with exactly the same services you currently have – it all depends on what's available in your new area.
          `,
          category: "General",
        },
      ],
    };
  },
});
</script>
