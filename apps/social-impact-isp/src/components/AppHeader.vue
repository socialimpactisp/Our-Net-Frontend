<template>
  <header
    class="relative sm:sticky sm:top-0 sm:z-20 bg-gray-100 w-full mx-auto border-b border-brand-light/20"
  >
    <div class="max-w-screen-2xl w-full mx-auto px-4 sm:px-6">
      <div class="flex items-center py-4 md:space-x-10 h-20">
        <div class="inline-flex items-center">
          <router-link
            to="/"
            class="text-xl font-display font-bold text-brand-dark hover:text-brand-red transition-colors"
          >
            Social Impact ISP
          </router-link>
        </div>
        <!-- <div class="flex-1 h-6">

        </div> -->
        <div class="flex-1">
          <div class="hidden sm:block pr-8 lg:pr-0">
            <app-nav />
          </div>
        </div>
        <div class="shrink-0 flex items-center space-x-4">
          <template v-if="isLoading">
            <loading-spinner
              classes="flex items-center justify-center"
              width="w-6"
              height="h-6"
            />
          </template>
          <template v-else>
            <template v-if="isAuthenticated">
              <ui-dropdown>
                <template #trigger>
                  <ui-button
                    tag="span"
                    class="px-4 py-2 text-[13px] font-sans tracking-wide text-brand-dark hover:bg-brand-dark/5 rounded-lg border border-brand-dark/10 inline-flex items-center"
                  >
                    <icon-user-circle class="h-5 w-5 mr-2 text-brand-dark" />
                    My Account
                  </ui-button>
                </template>

                <span
                  class="block w-full px-4 py-2 text-[13px] font-sans text-brand-mid"
                >
                  {{ user?.name }}
                </span>

                <div class="border-t border-brand-light/20 my-1" />

                <ui-dropdown-link
                  tag="span"
                  class="text-[13px] font-sans tracking-wide text-brand-dark hover:bg-brand-dark/5"
                  @click="$router.push(`/account/${user?.nickname}`)"
                >
                  My Account
                </ui-dropdown-link>

                <div class="border-t border-brand-light/20 my-1" />

                <ui-dropdown-link
                  class="text-[13px] font-sans tracking-wide text-brand-red hover:bg-brand-red/5"
                  @click="logout"
                >
                  Logout
                </ui-dropdown-link>
              </ui-dropdown>
            </template>
            <template v-else>
              <ui-button
                class="px-4 py-2 text-[13px] font-sans tracking-wide text-brand-dark bg-white hover:bg-brand-dark/5 rounded-lg border border-brand-dark/10 shadow-sm transition-colors"
                tag="span"
                to="/login"
                @click="login"
              >
                Login
              </ui-button>
            </template>

            <button
              class="inline-flex items-center justify-center h-10 w-10 text-brand-dark hover:bg-brand-dark/5 rounded-lg border border-brand-dark/10 sm:hidden"
              @click="menuOpen = !menuOpen"
            >
              <icon-menu class="h-5 w-5" />
            </button>
          </template>
        </div>
      </div>
      <div
        v-if="menuOpen"
        class="absolute inset-x-0 block sm:hidden z-50 bg-white py-6 border-t border-brand-light/20"
        style="top: 100%"
      >
        <app-nav @click="menuOpen = false" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppNav from "./AppNav.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import IconMenu from "@/components/icons/Menu.vue";
import UiButton from "@/components/ui/Button.vue";
import UiDropdown from "@/components/ui/Dropdown.vue";
import UiDropdownLink from "@/components/ui/DropdownLink.vue";
import IconUserCircle from "@/components/icons/UserCircle.vue";

export default defineComponent({
  name: "AppHeader",

  components: {
    AppNav,
    LoadingSpinner,
    IconMenu,
    UiButton,
    UiDropdown,
    UiDropdownLink,
    IconUserCircle,
  },

  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:authenticated"],

  data() {
    return {
      menuOpen: false,
    };
  },

  computed: {
    isLoading(): boolean {
      return this.$auth.isLoading();
    },

    isAuthenticated(): boolean {
      return this.$auth.isAuthenticated();
    },

    user(): Record<string, unknown> | undefined {
      return this.$auth.getUser();
    },
  },

  methods: {
    login() {
      this.$auth.loginWithRedirect();
      // this.isAuthenticated = !this.isAuthenticated
      // this.$emit('update:authenticated', this.isAuthenticated)
    },

    logout() {
      this.$auth.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
});
</script>
