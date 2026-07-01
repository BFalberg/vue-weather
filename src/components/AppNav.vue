<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home, Search, Heart } from '@lucide/vue'
</script>

<template>
  <nav class="flex items-center justify-center fixed bottom-6 z-10 w-full px-4">
    <div
      class="grid grid-cols-3 gap-4 w-full bg-black/25 px-6 rounded-full backdrop-blur-lg text-white text-sm font-medium max-w-max mx-auto"
    >
      <RouterLink
        to="/"
        active-class="opacity-100"
        class="opacity-50 flex flex-col items-center gap-1 min-w-16 py-4"
        ><Home class="size-6"
      /></RouterLink>
      <RouterLink
        to="/search"
        active-class="opacity-100"
        class="opacity-50 flex flex-col items-center gap-1 min-w-16 py-4"
        ><Search class="size-6"
      /></RouterLink>
      <RouterLink
        to="/favorites"
        active-class="opacity-100"
        class="opacity-50 flex flex-col items-center gap-1 min-w-16 py-4"
        ><Heart class="size-6"
      /></RouterLink>
    </div>
  </nav>
</template>
