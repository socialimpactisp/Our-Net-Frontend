<template>
  <div>
    <div
      v-if="error"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 class="text-xl font-bold text-red-600 mb-4">An Error Occurred</h2>
        <p class="text-gray-700 mb-4">{{ error.message }}</p>
        <div class="text-right">
          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            aria-label="Dismiss error message"
            @click="resetError"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
    <slot v-if="!error" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface ErrorBoundaryState {
  error: Error | null;
}

export default defineComponent({
  name: "ErrorBoundary",

  data(): ErrorBoundaryState {
    return {
      error: null,
    };
  },

  errorCaptured(err: unknown): boolean {
    if (err instanceof Error) {
      this.error = err;
    } else {
      this.error = new Error(String(err));
    }
    return false;
  },

  methods: {
    resetError(): void {
      this.error = null;
    },
  },
});
</script>
