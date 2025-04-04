<template>
  <input
    ref="input"
    class="block w-full appearance-none px-4 py-3 bg-white disabled:bg-gray-200 border border-gray-300 placeholder-gray-500 text-gray-900 leading-4 focus:outline-none focus:border-gray-200 focus:shadow-outline rounded-md transition-colors duration-150 ease-in-out"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiInput",

  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },

  emits: ["update:modelValue"],

  methods: {
    focus() {
      (this.$refs.input as HTMLInputElement).focus();
    },
  },
});
</script>
