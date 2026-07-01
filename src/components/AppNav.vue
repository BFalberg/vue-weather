<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex items-center justify-center fixed bottom-6 z-10 w-full px-4">
    <div
      class="flex items-center justify-between w-full bg-black/25 px-6 py-4 rounded-full backdrop-blur-lg text-white text-sm font-medium max-w-xl mx-auto"
    >
      <RouterLink to="/" active-class="opacity-100" class="opacity-50">Home</RouterLink>
      <div class="opacity-50">Search</div>
      <RouterLink to="/favorites" active-class="opacity-100" class="opacity-50"
        >Favorites</RouterLink
      >
    </div>
  </nav>
</template>
