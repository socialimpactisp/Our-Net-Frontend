<template>
  <component :is="is" class="hover:underline" v-bind="$attrs">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

type Props = {
  is?: string;
};

withDefaults(defineProps<Props>(), {
  is: "a",
});
</script>
