<template>
  <div ref="dropdown" class="relative">
    <div ref="trigger" class="cursor-pointer" @click="open = !open">
      <slot name="trigger" />
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="open"
        ref="dropdownMenu"
        class="absolute z-50 mt-2 rounded-md shadow-lg"
        :class="[widthClass, alignmentClasses]"
        style="display: none"
      >
        <div
          class="rounded-md ring-1 ring-gray-500 ring-opacity-10 font-sans"
          :class="contentClasses"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type widthClassTemplate = {
  [key: string]: string;
};

export default defineComponent({
  name: "UiDropdown",

  provide() {
    return {
      close: this.close,
    };
  },

  props: {
    align: {
      type: String,
      default: "right",
    },
    width: {
      type: String,
      default: "48",
    },
    contentClasses: {
      type: Array,
      default: () => ["py-1", "bg-white"],
    },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    widthClass(): string {
      const template: widthClassTemplate = {
        "48": "w-48",
        "64": "w-64",
      };

      return template[this.width.toString()];
    },

    alignmentClasses(): string {
      if (this.align === "left") {
        return "origin-top-left left-0";
      } else if (this.align === "right") {
        return "origin-top-right right-0";
      } else {
        return "origin-top";
      }
    },
  },

  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keydown", this.closeOnEscape);
    }
  },

  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keydown", this.closeOnEscape);
    }
  },

  methods: {
    close() {
      this.open = false;
    },

    closeOnEscape(event: KeyboardEvent) {
      if (this.open && event.keyCode === 27) {
        this.close();
      }
    },

    isInWhitelist(el: EventTarget | null): boolean {
      if (el === (this.$refs.dropdownMenu as HTMLElement)) return true;
      if (el === (this.$refs.trigger as HTMLElement)) return true;

      // All children from dropdown
      if ((this.$refs.dropdownMenu as HTMLElement) !== undefined) {
        const children = (
          this.$refs.dropdownMenu as HTMLElement
        ).querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }

      // All children from trigger
      if ((this.$refs.trigger as HTMLElement) !== undefined) {
        const children = (this.$refs.trigger as HTMLElement).querySelectorAll(
          "*",
        );
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }

      return false;
    },

    clickedOutside(event: MouseEvent) {
      const target = event.target;
      if (!this.isInWhitelist(target)) {
        this.close();
      }
    },
  },
});
</script>
