<template>
  <footer
    :class="{
      'bg-inverted text-inverted-foreground': inverted,
      'bg-background text-foreground': !inverted,
    }"
  >
    <app-container>
      <div
        class="flex flex-col items-center sm:flex-row sm:items-start gap-12 py-24"
      >
        <div>
          <img :src="logo" :alt="company" class="w-[200px]" />
        </div>
        <div
          class="grow flex flex-col items-center sm:flex-row sm:items-start gap-6"
        >
          <slot />
        </div>
        <div class="text-center">
          &copy; {{ year }} {{ company }}. All rights reserved.
        </div>
      </div>
    </app-container>
  </footer>
</template>

<script lang="ts" setup>
import AppContainer from "../layout/AppContainer.vue";

const year = new Date().getFullYear();

defineOptions({ inheritAttrs: false });

type Props = {
  company: string;
  logo: string;
  inverted?: boolean;
};

withDefaults(defineProps<Props>(), {
  inverted: false,
});
</script>
