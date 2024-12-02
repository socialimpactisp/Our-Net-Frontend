<template>
  <nav
    :aria-labelledby="heading ? `footer-${heading}` : undefined"
    class="flex flex-col items-center sm:items-start"
  >
    <h2
      v-if="heading"
      :id="`footer-${heading}`"
      class="uppercase font-bold text-xs leading-6 tracking-widest"
    >
      {{ heading }}
    </h2>
    <slot />
  </nav>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

type Props = {
  heading?: string;
};

defineProps<Props>();
</script>
