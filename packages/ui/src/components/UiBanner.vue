<template>
  <div class="relative py-16" :class="{ 'bg-inverted': inverted }">
    <div class="max-w-screen-2xl mx-auto px-6">
      <hgroup
        class="text-center"
        :class="{ 'text-inverted-foreground': inverted }"
      >
        <h1 class="text-5xl font-black tracking-tight"><slot></slot></h1>
        <div
          v-if="$slots.content"
          class="mt-4 text-xl font-medium flex flex-col gap-4"
        >
          <slot name="content"></slot>
        </div>
      </hgroup>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ inverted?: boolean }>(), { inverted: true });
</script>
