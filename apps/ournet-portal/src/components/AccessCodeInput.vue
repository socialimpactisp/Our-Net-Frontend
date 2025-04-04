<template>
  <div class="relative w-full flex items-center">
    <input
      ref="input"
      v-model="accessCode.code"
      type="accessCode"
      name="accessCode"
      :placeholder="placeholder"
      class="block w-full appearance-none px-6 py-3.5 text-sm font-sans bg-white border border-brand-light/30 placeholder-brand-mid text-brand-dark leading-relaxed focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:outline-none rounded-lg transition duration-200 ease-in-out"
      autocomplete="off"
      :autofocus="autoFocus"
      @input="onInput"
    />
    <button
      v-if="codeIsValid"
      type="button"
      class="absolute right-2 px-4 py-2 mr-2 text-xs font-semibold uppercase tracking-wider text-brand-red hover:bg-brand-red/10 rounded-md transition-colors"
      @click="addAccessCode"
    >
      Unlock
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
      default: "Enter your access code",
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
