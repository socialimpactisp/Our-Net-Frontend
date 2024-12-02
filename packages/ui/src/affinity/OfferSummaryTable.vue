<template>
  <table>
    <colgroup>
      <col class="w-48" />
    </colgroup>
    <tbody>
      <tr>
        <th colspan="2" scope="rowgroup">Service Overview</th>
      </tr>
      <tr>
        <th scope="row">Service Description</th>
        <td>
          Broadband service for friends &amp; family of {{ parentCompany }}. You
          need an invite-code to join.
        </td>
      </tr>
      <tr>
        <th scope="row">Availability</th>
        <td>
          Not all plans are available everywhere. Use our
          <a href="/register/1">address checker</a> to see product availability
        </td>
      </tr>
      <tr>
        <th scope="row">Service charge</th>
        <td>
          <table>
            <colgroup>
              <col class="w-36" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Monthly price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="plan in plans" :key="plan.productName">
                <td>{{ plan.productName }}</td>
                <td>{{ formatMoney(plan.price) }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <th scope="row">Additional data charges</th>
        <td>There are no additional data charges</td>
      </tr>
      <tr>
        <th scope="row">Setup charges</th>
        <td>There are no setup charges</td>
      </tr>
      <tr>
        <th scope="row">Other charges</th>
        <td>
          Additional charges may apply for items such as non-standard
          installations, additional inhome technician work performed at time of
          connection etc.
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colspan="2" scope="rowgroup">Broadband performance information</th>
      </tr>
      <tr>
        <th scope="row" rowspan="2">Average peak time speeds</th>
        <td>
          <table>
            <colgroup>
              <col class="w-36" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Speed down*</th>
                <th scope="col">Speed up*</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="plan in plans" :key="plan.productName">
                <td>{{ plan.productName }}</td>
                <td>
                  {{ plan.speedEquivocation }} {{ plan.speeds.down }}Mbps*
                </td>
                <td>{{ plan.speedEquivocation }} {{ plan.speeds.up }}Mbps*</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          *Broadband speeds can be affected by many factors. For more
          information about this visit
          <a
            href="https://www.tcf.org.nz/consumers/broadband/broadband-information/broadband-connections/"
            target="_blank"
            rel="noreferrer"
            >the TCF Website</a
          >
          and the Commerce Commissions'
          <a
            href="https://public.tableau.com/app/profile/commerce.commission/viz/MeasuringBroadbandNewZealandDashboard/Overview"
            target="_blank"
            rel="noreferrer"
            >Measuring Broadband Dashboard</a
          >
          (see the "Speeds" tab).
        </td>
      </tr>
      <tr>
        <th scope="row">Access type</th>
        <td>
          <table>
            <colgroup>
              <col class="w-36" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Access type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="plan in plans" :key="plan.productName">
                <td>{{ plan.productName }}</td>
                <td>{{ accessType[plan.productClass] }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colspan="2" scope="rowgroup">Other information</th>
      </tr>
      <tr>
        <th scope="row">Contract period</th>
        <td>None</td>
      </tr>
      <tr>
        <th scope="row">Early termination fees</th>
        <td>None</td>
      </tr>
      <tr>
        <th scope="row">Notice period</th>
        <td>None</td>
      </tr>
      <tr>
        <th scope="row">Traffic management</th>
        <td>None</td>
      </tr>
      <tr>
        <th scope="row">Service Restrictions</th>
        <td>None</td>
      </tr>
      <tr>
        <th scope="row">Fair use</th>
        <td>
          To find out more about our Fair Use Policy, pleae refer to our
          <a href="/terms#fairuse">Terms and Conditions</a>.
        </td>
      </tr>
      <tr>
        <th scope="row">Effects on other services</th>
        <td>
          <p>
            At {{ ispName }}, we understand the vital role that a reliable
            broadband connection plays in your daily life. Whether you're
            streaming your favorite shows, staying connected with loved ones
            through video calls, or relying on essential services like medical
            alarms and security systems, we know that uninterrupted connectivity
            is crucial.
          </p>

          <p>
            <strong>Voice Services</strong>: If you have a landline phone with
            us, then this relies on your broadband connection to work. It's
            important to note that in the event of a broadband service
            interruption (including a power outage), your landline phone service
            will not be available.
            <b
              >This means you won't be able to make or receive calls, including
              calls to emergency services (111), during such interruptions.</b
            >
            We suggest you keep a charged mobile phone to hand, to use during a
            power outage.
          </p>

          <p>
            <strong>Vulnerable Customers</strong>: Please contact us if you, or
            someone in your household, rely on your home phone for health,
            disability or safety reasons, and you have no other means for
            contacting 111 emergency services. We'll work something out to help.
          </p>

          <p>
            <strong>Medical Alarms</strong>: For those who depend on medical
            alarms for their well-being, having a reliable broadband connection
            is essential. A disruption in your broadband service may result in
            the temporary unavailability of your medical alarm system. To ensure
            uninterrupted support, we recommend exploring options for backup
            power or a secondary connection.
          </p>

          <p>
            <strong>Monitored Security Alarms</strong>: If your security system
            relies on our broadband service for monitoring, it's crucial to be
            aware that a service disruption could affect the real-time
            monitoring of your security alarms. We recommend having contingency
            plans in place to ensure the safety of your home and loved ones in
            such situations.
          </p>

          <p>
            <strong>PayTV On-Demand Services</strong>: Our broadband service
            enhances your entertainment experience by enabling access to PayTV
            on-demand services. In the event of a service interruption, you may
            temporarily lose access to these services. However, the good news is
            that many of these platforms offer downloadable content for offline
            viewing, which can be a handy alternative.
          </p>

          <p>
            If you have any questions or need assistance with backup solutions,
            please don't hesitate to contact our dedicated customer support
            team. We are here to help you stay connected, informed, and secure.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">Complaints</th>
        <td>
          You can refer to our
          <a href="/customer-complaints">complaints process</a>.
        </td>
      </tr>
      <tr>
        <th scope="row">Disputes</th>
        <td>
          Devoli Limited is a member of the Telecommunications Disputes
          Resolution (TDR) Scheme. You can find information about the TDRS on
          our <a href="/customer-complaints#disputes">complaints page</a>.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { formatMoney } from "@affinity/common/util";
import { LegacyPlan } from "@affinity/common/api";

type Props = {
  ispName: string;
  parentCompany: string;
  plans: LegacyPlan[];
};

defineProps<Props>();

const accessType: Record<LegacyPlan["productClass"], string> = {
  ufb: "Fibre",
  adsl: "ADSL",
  fwa: "Wireless",
  vdsl: "VDSL",
};
</script>

<style>
table {
  @apply w-full;
}

td table,
td td,
td th {
  @apply border-0;
}

th,
td {
  @apply align-top;
  @apply text-left;
  @apply py-2;
  @apply px-6;
  @apply border;
  @apply border-black;
}

td:has(table) {
  @apply p-0;
}

th[scope="rowgroup"] {
  @apply text-2xl;
  @apply leading-loose;
  @apply bg-black;
  @apply text-white;
}

th[scope="row"],
th[scope="col"] {
  @apply bg-gray-100;
}
</style>
