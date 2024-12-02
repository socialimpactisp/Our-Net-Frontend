<template>
  <div>
    <div class="relative bg-brand py-16">
      <div class="max-w-screen-2xl mx-auto text-white px-6">
        <h3 class="text-5xl text-center font-black tracking-tight">Join now</h3>
        <p
          class="mt-4 text-xl text-center text-gray-200 font-medium max-w-lg mx-auto"
        >
          Create your account and make the switch. You'll need to know your
          account number with your previous provider.
        </p>
      </div>
    </div>

    <div v-if="disableSignUp" class="py-12 px-6">
      <loading-spinner />
      <p class="text-center text-lg text-gray-500">
        Please wait while we process your order.
      </p>
    </div>
    <template v-else>
      <div
        v-if="
          selected && selected.address && Object.keys(selected.address).length
        "
        class="bg-white"
      >
        <div class="max-w-screen-2xl mx-auto">
          <div class="pt-12 px-6 text-center">
            <h3
              class="mb-4 text-center text-2xl text-gray-600 uppercase font-black"
            >
              Review your Order with the Social Impact ISP
            </h3>
            <div class="max-w-screen-lg mx-auto border border-black rounded-xl">
              <div>
                <div class="flex justify-center flex m-0 p-0 mt-4">
                  <h3 class="mb-4 text-center text-xl uppercase font-bold">
                    Selected Address
                  </h3>
                </div>
                <div class="flex items-center justify-center pb-5 gap-8">
                  <p class="mt-2 text-2xl font-black">
                    {{ selected.address.full_address }}
                  </p>
                  <span
                    class="text-sm underline text-gray-600 cursor-pointer font-light"
                    @click="clearAddress"
                    >change address</span
                  >
                </div>
              </div>
              <div
                class="p-6 sm:p-8 grid sm:divide-x divide-black grid-flow-row sm:grid-flow-col auto-cols-fr gap-8"
              >
                <div v-if="selected && selected.product" class="sm:text-center">
                  <h5 class="text-md sm:text-xl font-semibold opacity-75">
                    Selected plan
                  </h5>
                  <h3 class="text-2xl sm:text-3xl font-black">
                    {{ selected.product.productName }}
                  </h3>
                  <span
                    class="text-sm underline text-gray-700 cursor-pointer"
                    @click="changeProduct"
                  >
                    change plan
                  </span>
                </div>
                <div class="sm:text-center">
                  <h5 class="text-md sm:text-xl font-semibold opacity-75">
                    {{ selected.modem.productName }}
                  </h5>
                  <h3 class="text-2xl sm:text-3xl font-black">
                    {{ getDollars(selected.modem.price) }}
                  </h3>
                </div>
                <div v-if="selected && selected.product" class="sm:text-center">
                  <h5 class="text-md sm:text-xl font-semibold opacity-75">
                    Monthly broadband charge
                  </h5>
                  <h3 class="text-2xl sm:text-3xl font-black">
                    {{ getDollars(selected.product.price) }}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!isAuthenticated" class="py-12 px-6 border-b-2">
            <div class="mb-4">
              <p class="text-center text-lg text-gray-700">
                Login or create an account for the Social Impact ISP to
                continue.
              </p>
            </div>
            <div
              class="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0"
            >
              <ui-button size="lg" rounded theme="dark" @click="register">
                Create an Account
              </ui-button>
              <span>or</span>
              <ui-button size="lg" rounded theme="dark" @click="register">
                Login
              </ui-button>
            </div>
            <div class="mt-6">
              <p class="text-center text-sm text-gray-700">
                Note: Creating an account or logging in will redirect you Auth0,
                to our secure authentication provider.
              </p>
            </div>
          </div>

          <div v-if="isAuthenticated" class="py-12 px-6 border-b-2">
            <h3
              class="mb-4 text-center text-2xl text-gray-600 uppercase font-black"
            >
              Personal details
            </h3>
            <div class="relative max-w-lg mx-auto space-y-4">
              <div
                v-if="detailsLoading"
                class="absolute z-30 inset-0 flex items-center justify-center bg-white"
              >
                <loading-spinner />
              </div>
              <div
                v-if="errors.length"
                class="bg-red-200 text-red-900 rounded-lg py-4 px-6"
              >
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div>
                <ui-label value="First name" />
                <ui-input v-model="form.first_name" placeholder="John" />
              </div>
              <div>
                <ui-label value="Last name" />
                <ui-input v-model="form.last_name" placeholder="Doe" />
              </div>
              <div>
                <ui-label value="Phone number" />
                <ui-input v-model="form.phone" placeholder="021 345 6789" />
              </div>

              <ui-button
                v-if="!customerExists"
                class="w-full italic"
                rounded
                theme="dark"
                @click="updateUser"
              >
                Update Details & Continue
              </ui-button>
            </div>
          </div>

          <div
            v-if="isAuthenticated && customerExists"
            class="py-12 px-6 border-b-2"
          >
            <h3
              class="mb-4 text-center text-2xl text-gray-600 uppercase font-black"
            >
              Connection Details
            </h3>
            <div class="relative max-w-lg mx-auto space-y-4">
              <div
                v-if="detailsLoading"
                class="absolute z-30 inset-0 flex items-center justify-center bg-white"
              >
                <loading-spinner />
              </div>
              <div
                v-if="metadata_errors.length"
                class="bg-red-200 text-red-900 rounded-lg py-4 px-6"
              >
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="(error, index) in metadata_errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div>
                <ui-label value="Preferred connection date" />

                <label for="asap" class="flex items-start">
                  <input
                    id="asap"
                    v-model="metadata_form.preferred_connection"
                    class="mt-1"
                    type="radio"
                    name="preferred_connection"
                    value="asap"
                  />
                  <span class="font-medium text-gray-700 leading-5 ml-2">
                    ASAP
                  </span>
                </label>
                <label for="date" class="flex items-start">
                  <input
                    id="date"
                    v-model="metadata_form.preferred_connection"
                    class="mt-1"
                    type="radio"
                    name="preferred_connection"
                    value="date"
                    placeholder="yyyy-mm-dd"
                  />
                  <span class="font-medium text-gray-700 leading-5 ml-2">
                    On this date:
                    <input
                      v-model="metadata_form.preferred_connection_date"
                      type="date"
                      class="ml-2"
                    />
                  </span>
                </label>
              </div>
              <div>
                <ui-label value="Preferred connection time" />
                <label for="any" class="flex items-start">
                  <input
                    id="any"
                    v-model="metadata_form.preferred_connection_time"
                    class="mt-1"
                    type="radio"
                    value="any"
                    name="preferred_connection_time"
                  />
                  <span class="font-medium text-gray-700 leading-5 ml-2">
                    Any
                  </span>
                </label>
                <label for="am" class="flex items-start">
                  <input
                    id="am"
                    v-model="metadata_form.preferred_connection_time"
                    class="mt-1"
                    type="radio"
                    value="am"
                    name="preferred_connection_time"
                  />
                  <span class="font-medium text-gray-700 leading-5 ml-2">
                    AM
                  </span>
                </label>
                <label for="pm" class="flex items-start">
                  <input
                    id="pm"
                    v-model="metadata_form.preferred_connection_time"
                    class="mt-1"
                    type="radio"
                    value="pm"
                    name="preferred_connection_time"
                  />
                  <span class="font-medium text-gray-700 leading-5 ml-2">
                    PM
                  </span>
                </label>
              </div>
              <div>
                <ui-label value="Any other comments or questions?" />
                <ui-input v-model="metadata_form.comments" />
              </div>

              <ui-button
                v-if="!metadataExists"
                class="w-full italic"
                rounded
                theme="dark"
                @click="checkMetadataForm"
              >
                Update Details & Continue
              </ui-button>
            </div>
          </div>

          <div
            v-if="isAuthenticated && metadataExists"
            class="py-12 px-6 border-b-2"
          >
            <div class="text-center mb-4">
              <h3 class="mb-3 text-2xl text-gray-600 uppercase font-black">
                Your current provider
              </h3>
              <p>
                <provider-details>
                  <span class="underline cursor-pointer"
                    >Where can I find this?</span
                  >
                </provider-details>
              </p>
            </div>
            <div class="mt-8">
              <div class="max-w-md mx-auto border rounded-xl p-6">
                <div class="space-y-4">
                  <p class="font-semibold">
                    Tell us about your current broadband provider
                  </p>
                  <label for="tranferFrom" class="flex items-start">
                    <input
                      id="tranferFrom"
                      v-model="isp.dont_transfer"
                      class="mt-1"
                      type="checkbox"
                      @change="checkIsp"
                    />
                    <span class="font-medium text-gray-700 leading-5 ml-2">
                      I don't currently have a fixed-line broadband service at
                      my address
                    </span>
                  </label>

                  <template v-if="!isp.dont_transfer">
                    <div class="border-t" />
                    <div
                      v-if="transferErrors.length"
                      class="bg-red-200 text-red-900 rounded-lg py-4 px-6"
                    >
                      <b>Please correct the following error(s):</b>
                      <ul>
                        <li
                          v-for="(error, index) in transferErrors"
                          :key="index"
                        >
                          {{ error }}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p class="italic text-sm text-emerald-700">
                        Tip: You can find this information on your last
                        broadband bill.
                      </p>
                    </div>

                    <div class="w-full">
                      <ui-label value="My current broadband provider is" />
                      <ui-input
                        v-model="isp.transfer_from"
                        placeholder="e.g. Spark, Vodafone..."
                      />
                    </div>

                    <div class="w-full">
                      <ui-label value="The name on my account is" />
                      <ui-input
                        v-model="isp.name_on_account"
                        placeholder="e.g. John Smith"
                      />
                    </div>

                    <div class="w-full">
                      <ui-label
                        value="My account number with my current provider is"
                      />
                      <ui-input
                        v-model="isp.account_number"
                        placeholder="e.g. ABC12345..."
                      />
                    </div>

                    <div>
                      <ui-button
                        size="lg"
                        rounded
                        class="w-full"
                        theme="dark"
                        @click="validateTransfer"
                      >
                        Continue →
                      </ui-button>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isAuthenticated && customerExists && tranferCanContinue"
            class="py-12 px-6 border-b-2"
          >
            <div class="text-center mb-4">
              <h3 class="mb-3 text-2xl text-gray-600 uppercase font-black">
                Payment details
              </h3>
            </div>
            <div class="max-w-md mx-auto">
              <payment-form
                :selected="selected"
                :customer-address="customerAddress"
                @confirmed="onSubmit"
              />
              <div class="mt-6">
                <ul class="list-disc pl-6 text-sm text-gray-700 space-y-2">
                  <li>
                    Please allow 3 to 10 working days to get your broadband up
                    and running.
                  </li>
                  <li>
                    You will be charged for the modem immediately if you have
                    asked for it, refunded if we can't go ahead with your order.
                  </li>
                  <li>
                    Once your service is active, your credit card will be
                    charged in advance on the 1st of every month for a full
                    month of service.
                  </li>
                  <li>
                    As soon as your service goes live, you will be charged for
                    the remainder of the month.
                  </li>
                  <li>
                    If you terminate your service, you will be refunded a
                    prorated credit for the prepaid amount remaining on your
                    account.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-12 px-6 h-50 bg-brand" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form } from "@affinity/common/form";

import LoadingSpinner from "@/components/LoadingSpinner.vue";

import UiButton from "@/components/ui/Button.vue";
import UiInput from "@/components/ui/Input.vue";
import UiLabel from "@/components/ui/Label.vue";

import PaymentForm from "./components/PaymentForm.vue";
import ProviderDetails from "./components/ProviderDetails.vue";
import { format } from "date-fns";

interface AddressesItem {
  id: number;
  full_address: string;
}

interface Transfer {
  dont_transfer: boolean;
  can_continue: boolean;
  transfer_from: string;
  name_on_account: string;
  account_number: string;
}

interface ProductSpeeds {
  up: number;
  down: number;
}

interface Product {
  productName: string;
  productImage: string;
  productClass: string;
  stripeCode: string;
  price: number;
  showPrice: boolean;
  speeds: ProductSpeeds;
}

interface Modem {
  productName: string;
  productClass: string;
  stripeCode: string;
  price: number;
}

interface SelectedAddress {
  address: AddressesItem | null;
  transfer: Transfer | null;
  product: Product | null;
  modem: Modem | null;
}

interface Customer {
  id: number;
  account_id: number;
  auth0_sub: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone: string;
  marketing: string;
  stripe_id: string;
  created_at: string;
  updated_at: string;
  accessCode: string;
}

interface CustomerForm {
  first_name: string;
  last_name: string;
  dob?: string;
  phone: string;
  access_code: string;
}

interface CustomerAddress {
  address_id: number;
  plan?: string;
  billing_address_id?: number;
  delivery_address_id?: number;
  transfer_from_isp?: string;
  transfer_isp_name_on_account?: string;
  transfer_isp_account_number?: string;
  metadata?: {
    comments?: string;
    preferred_connection_date?: string;
    preferred_connection_time?: string;
  };
}

interface AccessCode {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
}

const today = format(new Date(), "yyyy-MM-dd");

export default defineComponent({
  name: "SignUpStep2",

  components: {
    LoadingSpinner,
    UiButton,
    UiInput,
    UiLabel,
    PaymentForm,
    ProviderDetails,
  },

  data() {
    return {
      selected: null as SelectedAddress | null,
      detailsLoading: false,
      customerExists: false,
      metadataExists: false,
      disableSignUp: false,
      isp: {
        dont_transfer: false,
        can_continue: false,
        transfer_from: "",
        name_on_account: "",
        account_number: "",
      },
      transferErrors: [] as string[],
      errors: [] as string[],
      form: new Form({
        first_name: "",
        last_name: "",
        phone: "",
      }),
      metadata_form: new Form({
        comments: "",
        preferred_connection: "asap",
        preferred_connection_date: today,
        preferred_connection_time: "any",
      }),
      metadata_errors: [] as string[],
    };
  },

  computed: {
    authLoading(): boolean {
      return this.$auth.isLoading();
    },

    user(): Record<string, unknown> {
      return this.$auth.getUser();
    },

    isAuthenticated(): boolean {
      return this.$auth.isAuthenticated();
    },

    tranferCanContinue(): boolean {
      if (this.isp.dont_transfer) return true;
      if (this.isp.can_continue) return true;

      return false;
    },

    customerAddress(): CustomerAddress | null {
      if (this.selected && this.selected.address) {
        return {
          address_id: this.selected.address.id,
          plan: this.selected.product?.productName,
          billing_address_id: this.selected.address.id,
          delivery_address_id: this.selected.address.id,
          transfer_from_isp: this.isp.transfer_from,
          transfer_isp_name_on_account: this.isp.name_on_account,
          transfer_isp_account_number: this.isp.account_number,
          metadata: {
            preferred_connection_date:
              this.metadata_form.preferred_connection === "asap"
                ? today
                : this.metadata_form.preferred_connection_date,
            preferred_connection_time:
              this.metadata_form.preferred_connection_time,
            comments: this.metadata_form.comments,
          },
        };
      }

      return null;
    },
  },

  watch: {
    authLoading(value) {
      if (value === false) {
        if (this.user) {
          this.form.first_name = this.user.nickname as string;
        }
        this.getUser();
      }
    },
  },

  created() {
    if (localStorage.getItem("affinity_signup")) {
      this.selected = JSON.parse(
        localStorage.getItem("affinity_signup") as string,
      );

      if (this.selected && this.selected.transfer) {
        this.isp = this.selected.transfer;
      }

      if (
        this.selected &&
        this.selected.address &&
        this.selected.product &&
        this.selected.modem
      ) {
        console.log("Step 2");
      } else {
        this.$router.push("/register");
      }
    } else {
      this.$router.push("/register");
    }
    if (!this.$auth.isLoading()) {
      if (this.user) {
        this.form.first_name = this.user.nickname as string;
      }
      this.getUser();
    }
  },

  methods: {
    checkIsp(event: InputEvent) {
      const input = event.target as HTMLInputElement;
      if (input.checked) {
        this.isp.transfer_from = "";
        this.isp.name_on_account = "";
        this.isp.account_number = "";
      }
    },

    async onSubmit(priceIds: unknown) {
      this.disableSignUp = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post(
          "/payment/confirm-payment",
          { price_ids: priceIds },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then((res) => {
          this.disableSignUp = false;
          if (res.status === 200 || res.status === 201) {
            localStorage.removeItem("affinity_signup"); // Remove signup data on successful signup.
            console.log("onSubmit - Removing coupon code");
            localStorage.removeItem("affinity_coupon_code"); // Remove access code as well
            this.$router.push("/success"); // Push user to success page.
          }
        })
        .catch((e) => {
          this.disableSignUp = false;
          console.error(e);
        });

      // this.$api.post('/customer/address', this.customerAddress, {
      //   headers: { Authorization: `Bearer ${accessToken}` }
      // }).then(res => {
      //   this.disableSignUp = false
      //   if (res.status === 200 || res.status === 201) {
      //     localStorage.removeItem('affinity_signup') // Remove signup data on successful signup.
      //     this.$router.push('/success') // Push user to success page.
      //   }
      // }).catch(e => {
      //   this.disableSignUp = false
      //   console.error(e)
      // })
    },

    register() {
      this.$auth.loginWithRedirect({
        appState: {
          targetUrl: "/register/2",
        },
      });
    },

    async getUser() {
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get<Customer>("/customer", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            this.customerExists = true;
            this.form.first_name = data.first_name;
            this.form.last_name = data.last_name;
            this.form.phone = data.phone;
          } else {
            this.customerExists = false;
          }
        })
        .catch(() => {
          this.customerExists = false;
        });
    },

    getAccessCode(): AccessCode | null {
      const accessCode = JSON.parse(
        localStorage.getItem("affinity_coupon_code") as string,
      ) as AccessCode;
      if (accessCode) {
        return accessCode;
      }

      return null;
    },

    async updateUser() {
      const accessCode = this.getAccessCode();
      if (accessCode !== null && !this.checkUserForm()) return;

      this.detailsLoading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .post<Customer, CustomerForm>(
          "/customer",
          {
            first_name: this.form.first_name as string,
            last_name: this.form.last_name as string,
            phone: this.form.phone as string,
            access_code: accessCode ? (accessCode.id as string) : "",
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        .then((res) => {
          this.detailsLoading = false;
          if (res.status === 200 || res.status === 201) {
            const data = res.data;
            this.customerExists = true;
            this.form.first_name = data.first_name;
            this.form.last_name = data.last_name;
            this.form.phone = data.phone;
            localStorage.removeItem("affinity_coupon_code"); // Remove access code on successful customer creation
          } else {
            this.customerExists = false;
          }
        })
        .catch(() => {
          this.customerExists = false;
          this.detailsLoading = false;
        });
    },

    validateTransfer() {
      this.isp.can_continue = false;
      this.transferErrors = [];

      if (
        this.isp.transfer_from &&
        this.isp.name_on_account &&
        this.isp.account_number
      ) {
        if (this.selected && this.selected.transfer) {
          localStorage.setItem(
            "affinity_signup",
            JSON.stringify(this.selected),
          );
        } else if (this.selected) {
          this.selected.transfer = this.isp;
          localStorage.setItem(
            "affinity_signup",
            JSON.stringify(this.selected),
          );
        }
        this.isp.can_continue = true;
        return true;
      }

      if (!this.isp.transfer_from) {
        this.transferErrors.push("Current broadband provider required");
      }
      if (!this.isp.name_on_account) {
        this.transferErrors.push("Name on account required");
      }
      if (!this.isp.account_number) {
        this.transferErrors.push("Account number required");
      }
    },

    checkUserForm() {
      this.errors = [];
      const isNum = /^\d*$/.test(this.form.phone as string);

      if (this.form.first_name && this.form.last_name && isNum) {
        return true;
      }

      if (!this.form.first_name) {
        this.errors.push("First name required");
      }
      if (!this.form.last_name) {
        this.errors.push("Last name required");
      }
      if (!this.form.phone) {
        this.errors.push("Phone number required");
      }
      if (!isNum) {
        this.errors.push("Please use a valid phone number");
      }

      return false;
    },

    checkMetadataForm() {
      this.metadata_errors = [];
      this.metadataExists = false;
      const isDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(
        this.metadata_form.preferred_connection_date as string,
      );

      if (!this.metadata_form.preferred_connection_date) {
        this.metadata_errors.push("Preferred connection date required");
      }

      if (this.metadata_form.preferred_connection_date && !isDate) {
        this.metadata_errors.push(
          "Please use a valid preferred connection date",
        );
      }

      if (!this.metadata_form.preferred_connection_time) {
        this.metadata_errors.push("Preferred connection time required");
      }

      if (
        this.metadata_form.preferred_connection_time &&
        !["any", "am", "pm"].includes(
          this.metadata_form.preferred_connection_time as string,
        )
      ) {
        this.metadata_errors.push(
          "Please use a valid preferred connection time",
        );
      }

      this.metadataExists = this.metadata_errors.length === 0;

      return false;
    },

    changeProduct() {
      if (this.selected) {
        this.selected.product = null;
        localStorage.setItem("affinity_signup", JSON.stringify(this.selected));
        this.$router.push("/register");
      }
    },

    clearAddress() {
      this.selected = null;
      localStorage.removeItem("affinity_signup");
      this.$router.push("/register");
    },

    getDollars(amount: number) {
      const dollars = amount / 100;

      return dollars.toLocaleString("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
});
</script>
