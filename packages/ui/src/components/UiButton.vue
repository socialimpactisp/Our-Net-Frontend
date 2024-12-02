<template>
  <button
    class="border-2 leading-5"
    :class="{
      'bg-brand text-brand-foreground border-brand': theme === 'brand',
      'py-0.5 px-2 text-sm': size === 'sm',
      'py-2 px-5': size === 'md',
      'py-3 px-6 text-lg': size === 'lg',
      'bg-transparent text-current': outline === true,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    theme?: "brand" | "secondary";
    size?: "sm" | "md" | "lg";
    outline?: boolean;
  }>(),
  {
    theme: "brand",
    size: "md",
    outline: false,
  },
);
</script>
