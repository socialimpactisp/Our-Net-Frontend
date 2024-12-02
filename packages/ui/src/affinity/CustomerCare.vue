<template>
  <ui-prose>
    <p>
      At {{ ispName }} we are dedicated to providing exceptional customer
      service and ensuring that every customer's experience with us is positive
      and satisfying. This Customer Care Policy outlines our commitment to
      delivering the highest standards of service, support, and care to our
      valued customers.
    </p>
    <p>
      <strong>Our Customer-Centric Approach</strong>: We firmly believe that our
      customers are at the heart of our business. Our commitment is to:
    </p>
    <ol>
      <li>
        <strong>Listen</strong>: We actively listen to our customers' needs,
        concerns, and feedback, and we use this information to continuously
        improve our products and services.
      </li>
      <li>
        <strong>Respect</strong>: We treat every customer with respect,
        courtesy, and professionalism, regardless of their background or
        circumstances.
      </li>
      <li>
        <strong>Timeliness</strong>: We aim to respond promptly to customer
        inquiries and resolve issues in a timely manner, understanding that your
        time is valuable.
      </li>
    </ol>
    <p>
      <strong>Communication Channels</strong>: We offer various communication
      channels to ensure accessibility and convenience for our customers. You
      can reach us through:
    </p>
    <p>
      <strong>Phone</strong>:
      <a href="tel:{{ supportPhoneE164 }}">{{ supportPhone }}</a
      ><br />
      <strong>Email</strong>:
      <a href="mailto:{{ supportEmail }}">{{ supportEmail }}</a>
    </p>
    <p>
      <strong>Response Time</strong>: We strive to acknowledge and respond to
      customer inquiries within a day during business hours. For more complex
      issues, we will provide you with an estimated resolution time.
    </p>
    <p>
      <strong>Service Hours</strong>: Our customer support team is available
      Monday to Friday (excluding public holidays) during the following hours:
    </p>
    <ul>
      <li>0830 - 1730</li>
      <li>
        You can reach our Customer Support team during these times via email or
        phone.
      </li>
    </ul>
    <p>
      <strong>Complaint Resolution Process</strong>: In the event of a complaint
      or issue, we follow a structured resolution process:
    </p>
    <ol>
      <li>
        <strong>Contact</strong>: Reach out to our customer support team using
        your preferred channel.
      </li>
      <li>
        <strong>Investigation</strong>: We will investigate the issue promptly
        and thoroughly to understand the problem.
      </li>
      <li>
        <strong>Resolution</strong>: We will work diligently to resolve the
        issue and provide you with updates on our progress.
      </li>
      <li>
        <strong>Escalation</strong>: If the issue cannot be resolved at the
        initial contact point, it will be escalated to a higher level of
        management.
      </li>
    </ol>
    <p>
      <a href="/customer-complaints">View our Complaints process</a>
    </p>
    <p>
      <strong>Training and Development</strong>: Our employees undergo
      continuous training and development to enhance their customer service
      skills. We are committed to ensuring that every member of our team can
      assist you effectively and professionally.
    </p>
    <p>
      <strong>Data Privacy and Security</strong>: We take the privacy and
      security of your data seriously. Our data handling practices comply with
      all relevant data protection laws and regulations.
    </p>
    <p>
      <strong>Feedback Mechanisms</strong>: We encourage you to provide feedback
      on your experiences with us. Your input is invaluable in helping us
      improve our services. You can provide feedback via your Account Manager.
    </p>
    <p>
      <strong>Continuous Improvement</strong>: We are committed to continuous
      improvement and will regularly review our customer care processes based on
      customer feedback and evolving industry standards.
    </p>
    <p>
      <strong>Accountability</strong>: We have designated individuals
      responsible for overseeing and ensuring the implementation and adherence
      to this Customer Care Policy within our organization.
    </p>
    <p>
      <strong>Monitoring and Reporting</strong>: We regularly monitor and report
      on our customer care performance, tracking key performance indicators
      (KPIs) to measure our success in meeting customer satisfaction goals.
    </p>
    <p>
      {{ ispName }} is dedicated to creating and maintaining a culture of
      exceptional customer care. We appreciate your trust in us and are
      committed to serving you with excellence.
    </p>
    <p>
      For further inquiries or to share your feedback, please don't hesitate to
      contact our customer support team.
    </p>
  </ui-prose>
</template>

<script lang="ts" setup>
import { UiProse } from "../components";

type Props = {
  ispName: string;
  supportPhone: string;
  supportPhoneE164: string;
  supportEmail: string;
};

defineProps<Props>();
</script>
