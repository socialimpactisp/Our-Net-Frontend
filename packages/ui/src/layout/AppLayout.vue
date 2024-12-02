<template>
  <div class="flex flex-col min-h-screen h-full">
    <div>
      <slot name="header" />
    </div>

    <div class="grow flex flex-col">
      <slot />
    </div>

    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
