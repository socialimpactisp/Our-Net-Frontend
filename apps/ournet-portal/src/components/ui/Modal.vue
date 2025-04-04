<template>
  <teleport to="body">
    <transition
      leave-active-class="duration-200"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
    >
      <div
        v-show="isActive"
        class="fixed z-50 inset-0 px-4 py-6 sm:px-0 sm:flex sm:items-center sm:justify-center"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="isActive"
            class="fixed inset-0 transform transition-all"
            @click="close"
          >
            <div class="absolute inset-0 bg-gray-300 opacity-75" />
          </div>
        </transition>

        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="isActive"
            class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full"
            :class="maxWidthClass"
          >
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";

interface maxWidthClassTemplate {
  [key: string]: string;
}

export default defineComponent({
  name: "UiModal",

  props: {
    active: Boolean,
    disableClose: Boolean,
    maxWidth: {
      type: String,
      default: "2xl",
    },
  },

  emits: ["update:active"],

  data() {
    return {
      isActive: this.active || false,
      animating: true,
    };
  },

  computed: {
    maxWidthClass(): string {
      const template: maxWidthClassTemplate = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        "2xl": "sm:max-w-2xl",
      };

      return template[this.maxWidth];
    },
  },

  watch: {
    active(value) {
      this.isActive = value;
    },
    isActive(value) {
      nextTick(() => {
        if (value && this.$el && this.$el.focus) {
          this.$el.focus();
        }
      });
    },
  },

  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },

  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  },

  methods: {
    close() {
      if (!this.disableClose) {
        this.$emit("update:active", false);
      }
    },

    keyPress(event: KeyboardEvent) {
      const key = event.key;
      if (this.isActive && (key === "Escape" || key === "Esc")) this.close();
    },

    afterEnter() {
      this.animating = false;
    },

    beforeLeave() {
      this.animating = true;
    },
  },
});
</script>
