<template>
  <div class="prose">
    <slot></slot>
  </div>
</template>

<style>
.prose {
  @apply max-w-screen-md mx-auto;
}

.prose p,
.prose ul,
.prose ol {
  @apply my-6;
}

.prose ul,
.prose ol {
  @apply pl-6;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose ul.indent,
.prose ol.indent {
  @apply list-none pl-4;
}

.prose ul ul,
.prose ol ol {
  @apply my-0;
}

.prose ul li,
.prose ol li {
  @apply leading-relaxed;
}

.prose ul ul li,
.prose ol ol li {
  @apply my-0;
}

.prose h4 {
  @apply text-xl font-bold;
}

.prose strong {
  @apply font-bold;
}

.prose a {
  @apply underline;
}

.prose a:hover {
  @apply text-brand;
}

.prose small {
  @apply text-sm text-gray-700;
}
</style>
