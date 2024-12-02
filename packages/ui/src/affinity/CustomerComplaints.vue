<template>
  <ui-prose>
    <p>
      The Primary purpose of our Complaints Policy is to establish a structured
      framework for addressing and resolving complaints raised by our valued
      customers, clients, partners and other stakeholders. We believe that the
      open communication is key to maintaining positive relationships, and we
      are committed to upholding the highest standards of customer satisfaction
      and stakeholder engagement.
    </p>
    <p>
      We want to ensure that we provide you with the best possible service
      experience. If you are not happy with any aspects of the services we
      provide you we would like to hear from you as quickly as possible so we
      can rectify the matters
    </p>
    <p>We will:</p>
    <ul>
      <li>
        Treat you with respect, in a fair and courteous manner at all times
      </li>
      <li>Be clear in our communications to you</li>
      <li>Deliver on our promises</li>
      <li>
        Ensure that you have access to account information and the services we
        supply to you
      </li>
      <li>Have copies of our Terms and Condition available to you</li>
      <li>
        Make sure that information provided to you is accurate, up-to-date and
        in plain English
      </li>
      <li>
        Take all reasonable actions to provide services to you in a timely
        manner, acknowledging that there may be delays in providing service in
        certain circumstances we will, if delays occur, keep you informed
      </li>
      <li>Always comply with the law</li>
    </ul>
    <h4>How to let us know if you have feedback or a complaint</h4>
    <p>
      If for any reason you are not happy with any aspect of the products or
      services we provide you we would be keen to hear from you as soon as
      possible so that we can put things right. Please contact us using one of
      the following options:
    </p>
    <ol>
      <li>
        Phone - <a href="tel:{{ supportPhoneE164 }}">{{ supportPhone }}</a>
      </li>
      <li>
        Email -
        <a href="mailto:{{ supportEmail }}">{{ supportEmail }}</a>
      </li>
    </ol>
    <h4>What happens next?</h4>
    <p>
      Once you've told us about your concern, we will investigate it and discuss
      a resolution with you. If we can’t resolve it straight away, or if the
      issue is of a very complex nature, we will give you an idea of how long it
      will take us to investigate the issue. We'll also let you know who will be
      managing it for you. Our aim is to get your issue fully resolved within 20
      working days.
    </p>
    <p>
      If you have raised a complaint with us and we have been unable to come to
      an agreement on how to resolve your complaint, or it's taken longer than
      six weeks to sort it out, you have the opportunity to take your case to
      the Telecommunications Dispute Resolution Scheme.
    </p>
    <p>
      This is a free and independent service which helps resolve disputes
      between customers and their telecommunications companies. You can find
      more information on the Scheme by visiting
      <a href="http://www.tdr.org.nz" target="_blank" rel="noreferrer"
        >www.tdr.org.nz</a
      >
      or by calling them on <a href="tel:+64508989898">0508 989898</a>.
    </p>
    <p>
      In addition to the Telecommunications Dispute Resolution Scheme, you may
      also seek independent advice or assistance from:
    </p>
    <ul>
      <li>The Disputes Tribunal</li>
      <li>The Citizens Advice Bureau</li>
      <li>Your Community Law Centre</li>
      <li>The Office of the Privacy Commissioner (for privacy issues)</li>
    </ul>
    <h4>Important reminder</h4>
    <p>
      Like you, we don't want any delays in getting your concerns addressed. If
      the service you are complaining about is charged to you by another
      telecommunications provider and not {{ ispName }}, we will not be able to
      investigate it. In this situation, you will need to contact that provider
      directly and they should be able to investigate for you.
    </p>
  </ui-prose>
</template>

<script lang="ts" setup>
import { UiProse } from "../components";

type Props = {
  ispName: string;
  website: string;
  supportPhone: string;
  supportPhoneE164: string;
  supportEmail: string;
};

defineProps<Props>();
</script>
