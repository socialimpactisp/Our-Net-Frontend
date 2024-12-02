<template>
  <div class="relative w-full flex items-center">
    <input
      ref="input"
      v-model="accessCode.code"
      type="accessCode"
      name="accessCode"
      :placeholder="placeholder"
      class="block w-full appearance-none pl-6 pr-16 py-4 text-lg font-display font-extrabold italic bg-white border border-black placeholder-gray-500 text-gray-900 leading-5 focus:ring-gray-200 focus:outline-none focus:shadow-outline rounded-full transition duration-200 ease-in-out"
      autocomplete="off"
      :autofocus="autoFocus"
      @input="onInput"
    />
    <button
      v-if="codeIsValid"
      type="button"
      class="block z-10 absolute right-10 mr-6 h-6 w-6 text-gray-600 cursor-pointer"
      @click="addAccessCode"
    >
      UNLOCK
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface AccessCode {
  id: string;
  code: string;
  name: string;
  expires_at: Date;
}

export default defineComponent({
  name: "AccessCodeInput",

  components: {},

  props: {
    placeholder: {
      type: String,
      default: "Enter your code to unlock your Social Impact ISP",
    },
    autoFocus: Boolean,
  },

  emits: ["access-code"],

  data() {
    return {
      loading: false,
      isActive: false,
      // errors: null
      codeIsValid: false,
      accessCode: {} as AccessCode,
      debounce: 0,
    };
  },

  watch: {
    isActive(active) {
      if (!active) {
        // this.setHovered(null)
      }
    },

    accessCode() {
      if (this.accessCode) {
        this.codeIsValid = true;
      }
    },
  },

  created() {
    if (typeof window !== "undefined") {
      // document.addEventListener('click', this.clickedOutside)
    }
  },

  beforeUnmount() {
    if (typeof window !== "undefined") {
      // document.removeEventListener('click', this.clickedOutside)
    }
  },

  methods: {
    focus() {
      (this.$refs.input as HTMLInputElement).focus();
    },

    addAccessCode() {
      this.$emit("access-code", this.accessCode);
    },

    onInput(event: Event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.codeIsValid = false;
        this.loading = false;
        const value = (event.target as HTMLInputElement).value;

        if (value) {
          this.loading = true;
          this.fetchSearchResults(value);
        }
      }, 500);
    },

    fetchSearchResults(query: string) {
      this.$api
        .put<AccessCode, null>(`/payment/access_code?access_code=${query}`)
        .then((res) => {
          this.loading = false;
          this.accessCode = res.data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style>
.access-code-input {
  top: 100%;
}
</style>
