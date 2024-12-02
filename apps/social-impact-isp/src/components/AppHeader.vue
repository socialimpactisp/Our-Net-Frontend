<template>
  <header class="relative sm:sticky sm:top-0 sm:z-20 bg-brand w-full mx-auto">
    <div class="max-w-screen-2xl w-full mx-auto px-4 sm:px-6">
      <div class="flex items-center py-4 md:space-x-10 h-28 sm:h-30">
        <div class="inline-flex items-center">
          <router-link to="/" class="inline-flex h-20">
            <app-logo-dark />
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
              width="w-8"
              height="h-8"
            />
          </template>
          <template v-else>
            <template v-if="isAuthenticated">
              <ui-dropdown>
                <template #trigger>
                  <ui-button tag="span" outline rounded has-icon>
                    <icon-user-circle
                      class="h-6 mr-3 hover:text-white focus:text-white text-white"
                    />
                    My Account
                  </ui-button>
                </template>

                <span
                  class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left transition text-gray-400 overflow-hidden"
                >
                  {{ user.name }}
                </span>

                <div class="border-t border-gray-100 my-1" />

                <ui-dropdown-link
                  tag="span"
                  @click="$router.push(`/account/${user.nickname}`)"
                >
                  My Account
                </ui-dropdown-link>

                <div class="border-t border-white my-1" />

                <ui-dropdown-link @click="logout"> Logout </ui-dropdown-link>
              </ui-dropdown>
            </template>
            <template v-else>
              <ui-button
                class="sm:inline-flex"
                tag="span"
                to="/login"
                outline
                rounded
                @click="login"
              >
                Login
              </ui-button>
            </template>

            <div
              class="inline-flex text-white sm:hidden h-6 w-6 cursor-pointer"
              @click="menuOpen = !menuOpen"
            >
              <icon-menu />
            </div>
          </template>
        </div>
      </div>
      <div
        v-if="menuOpen"
        class="absolute inset-x-0 block sm:hidden z-50 bg-white py-6 border-t"
        style="top: 100%"
      >
        <app-nav @click="menuOpen = false" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLogoDark from "./AppLogoDark.vue";
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
    AppLogoDark,
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
