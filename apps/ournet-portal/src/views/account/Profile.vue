<template>
  <div>
    <div class="mb-6 pb-5 border-b">
      <h2 class="text-2xl font-semibold tracking-tight">Profile</h2>
    </div>

    <div>
      <div v-if="loading" class="py-12 px-6">
        <loading-spinner />
        <!-- <p class="text-center text-lg text-gray-500">
          Please wait while we retrieve your personal information.
        </p> -->
      </div>
      <div v-else class="max-w-screen-sm space-y-4">
        <div
          v-if="message"
          class="bg-emerald-200 text-emerald-900 rounded-lg py-4 px-6"
        >
          {{ message }}
        </div>

        <div>
          <ui-label value="First name" />
          <ui-input v-model="form.first_name" />
        </div>

        <div>
          <ui-label value="Last name" />
          <ui-input v-model="form.last_name" />
        </div>

        <div>
          <ui-label value="Phone number" />
          <ui-input v-model="form.phone" />
        </div>

        <div>
          <ui-label value="Contact email (for notifications)" />
          <ui-input v-model="form.contact_email" />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This is the email address we'll use to communicate with you,
            including billing notifications from Stripe.
          </p>
        </div>

        <div>
          <ui-label value="Login email" />
          <ui-input v-model="form.email" :disabled="true" />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            If you want to change your login email, please contact us via email:
            <a
              href="mailto:support@ournet.com"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >support@ournet.com</a
            >.
          </p>
        </div>

        <div class="flex items-center justify-end space-x-2">
          <ui-button
            theme="default"
            :class="{
              'opacity-50 pointer-events-none':
                form.isClean() || form.loading(),
            }"
            :disabled="form.isClean() || form.loading()"
            @click="form.reset()"
          >
            Reset
          </ui-button>
          <ui-button
            theme="dark"
            :class="{
              'opacity-50 pointer-events-none':
                form.isClean() || form.loading(),
            }"
            :disabled="form.isClean() || form.loading()"
            @click="onSubmit"
          >
            Update
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form } from "@affinity/common/form";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UiButton from "@/components/ui/Button.vue";
import UiInput from "@/components/ui/Input.vue";
import UiLabel from "@/components/ui/Label.vue";

interface Customer {
  id: number;
  account_id: number;
  auth0_sub: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_email: string;
  dob: string;
  phone: string;
  marketing: string;
  stripe_id: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: "AccountProfile",

  components: {
    LoadingSpinner,
    UiButton,
    UiInput,
    UiLabel,
  },

  data() {
    return {
      loading: true,
      customerExists: false,
      form: new Form({
        id: "",
        first_name: "",
        last_name: "",
        phone: "",
        contact_email: "",
      }),
      message: "",
    };
  },

  computed: {
    authLoading(): boolean {
      return this.$auth.isLoading();
    },
  },

  watch: {
    authLoading(value) {
      if (value === false) {
        this.fetchProfile();
      }
    },
  },

  created() {
    if (!this.$auth.isLoading()) {
      this.fetchProfile();
    }
  },

  methods: {
    async fetchProfile() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      this.$api
        .get<Customer>("/customer/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            this.customerExists = true;
            this.form = new Form({
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              phone: data.phone,
              email: data.email,
              contact_email: data.contact_email,
            });
            this.loading = false;
          }
        })
        .catch((e) => {
          if (e.response && e.response.status && e.response.status === 404) {
            this.customerExists = false;
          }
          this.loading = false;
        });
    },

    async onSubmit() {
      this.loading = true;
      const accessToken = await this.$auth.getTokenSilently();

      if (this.customerExists) {
        this.$api
          .patch(
            "/customer",
            {
              id: this.form.id,
              first_name: this.form.first_name,
              last_name: this.form.last_name,
              phone: this.form.phone,
              contact_email: this.form.contact_email,
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          )
          .then(() => {
            this.loading = false;
            this.message = "Updated successfully";
            setTimeout(() => {
              this.message = "";
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            this.loading = false;
          });
      } else {
        this.$api
          .post(
            "/customer",
            {
              first_name: this.form.first_name as string,
              last_name: this.form.last_name as string,
              phone: this.form.phone as string,
              contact_email: this.form.contact_email as string,
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.customerExists = true;
              this.loading = false;
              this.message = "Updated successfully";
              setTimeout(() => {
                this.message = "";
              }, 5000);
            }
          })
          .catch((e) => {
            console.error(e);
            this.loading = false;
          });
      }
    },
  },
});
</script>
