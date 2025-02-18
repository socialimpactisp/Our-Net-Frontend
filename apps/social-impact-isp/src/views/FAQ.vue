<template>
  <div>
    <UiBanner>
      Got questions?
      <template #content>
        <p>
          If you can't find the answer to your question below, get in touch with
          our team.
        </p>
        <p>
          <ui-button
            tag="a"
            href="mailto:support@ournet.com"
            theme="dark"
            outline
          >
            Contact Us
          </ui-button>
        </p>
      </template>
    </UiBanner>

    <div class="bg-white py-12">
      <div class="max-w-screen-md mx-auto px-6">
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
          title: "Do you offer home phone services? (i.e. VOIP landlines)",
          value:
            "Yes, we offer home phone services via VOIP (Voice over IP) as an optional extra. A VOIP line with an NZ local phone number costs $5/month. You can bring your existing landline number with you, if you have one. At the moment you can't add VOIP to your account during the signup flow, so if you'd like to add VOIP please get in touch after you have signed up.",
          category: "General",
        },
        {
          title: "How you do charge? Can I pay weekly, fortnightly?",
          value:
            "We accept payments via our integration with Stripe. These are monthly, in advance. If you decide to leave at any time, we will refund any unused credit on a prorated basis.",
          category: "General",
        },
        {
          title: "Are your plans unlimited?",
          value:
            " Yes, all OurNet plans offer unlimited data, no contracts and local help desk support during business hours.",
          category: "General",
        },
        {
          title: "Do you provide static IP addresses?",
          value:
            'Yes, we can allocate a static IPv4 address upon request. By default, we use CG-NAT for IP address allocation. A Public Dynamic IP address (i.e. a public address that subject to change over time), can be added to your service for $5/month. A Static IP address (permanently reserved just for you while you are connected with us) can be added to your service for $10/month. If you need remote access to a server without using static IP, we recommend using a peer-to-peer VPN like <a href="https://tailscale.com/">Tailscale</a> for secure remote access behind NAT and firewalls.',
          category: "General",
        },
        {
          title: "How fast are OurNet plans?",
          value:
            "There are a few factors that can impact the speed of your connection, including how close you are to an exchange, your computer's capability, modem/router, line quality, software downloads and the number of devices connected.<br/><br/> Our broadband plan speeds represent the theoretic maximum speeds at which you are able to download and upload data from our network.",
          category: "General",
        },
        {
          title: "How do I check my broadband speed?",
          value:
            'The best way to do an accurate speed test is by completing a quick speed test. We recommend using <a class="underline" href="https://www.speedtest.net">www.speedtest.net</a> and make sure you are using "Devoli" as the selected server to get the most accurate result. You will need to have your device plugged in via the ethernet cable.',
          category: "General",
        },
        {
          title: "Do I need to get consent to connect fibre at my property?",
          value: `Here is a guide for when you need to gain consent and what type of consent is required:
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
          title: "Can I use my own modem?",
          value:
            "Yes, that is our preferred approach. We'll do our best to help you get set up, but not be able to offer full troubleshooting assistance for all makes and models of modem. Technically speaking, all plans use DHCP for IPv4 and IPv6, with VLAN 10 tagging.",
          category: "General",
        },
        {
          title:
            "Is there anything I need to know about where to place the modem when I set it up?",
          value: `It's important that modem is placed in the right environment so it operates as efficiently as possible. Here are our top tips:
          <ul class="block list-disc mt-4 pl-4 space-y-2">
            <li>Do not place your modem in direct sunlight or hot areas.</li>
            <li>Do not let your modem come into contact with liquid or moisture at any time. To clean it, wipe it with a damp cloth.</li>
            <li>
              Do not restrict airflow around your modem, as this can make it overheat for example:
              <ul class="block list-disc my-2 pl-4 space-y-2">
                <li>Do not cover it with anything</li>
                <li>Do not put it in an enclosed space like a drawer or box</li>
                <li>Do not place it under or behind a desk or large item of furniture</li>
              </ul>
            </li>
            <li>Do not disassemble your modem</li>
          </ul>
          `,
          category: "General",
        },
        {
          title: "What happens if I move home?",
          value: `No worries! Your broadband can come with you as well. You must take your modem with you to your new address.<br/><br/>
          Please give us a bit of notice so that we can tick the right boxes and make sure everything is in place. Ideally 15 working days should be enough time for us to get everything ready for you at your new home. Sometimes things might take a bit longer but we'll be in touch if that happens. Depending on where you move to, we may not be able to provide you with exactly the same services you currently have – it all depends on what's available in your new area.
          `,
          category: "General",
        },
      ],
    };
  },
});
</script>
