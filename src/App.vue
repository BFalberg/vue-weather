<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<template>
  <AppNav />
  <main class="min-h-screen bg-linear-to-b from-sky-400 to-blue-700 text-white pb-16">
    <RouterView />
  </main>
</template>

<style scoped></style>
