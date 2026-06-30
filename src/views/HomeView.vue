<script setup lang="ts">
import WeatherMain from '@/components/weatherMain.vue'
import { useLocation } from '@/composables/useLocation'

const { latitude, longitude, loading, error } = useLocation()
</script>

<template>
  <div
    v-if="loading"
    class="min-h-screen bg-linear-to-b from-sky-400 to-blue-700 text-white flex items-center justify-center text-xl opacity-70"
  >
    Locating...
  </div>
  <div
    v-else-if="error"
    class="min-h-screen bg-linear-to-b from-sky-400 to-blue-700 text-white flex items-center justify-center"
  >
    <p class="text-red-200 text-sm">{{ error.message }}</p>
  </div>
  <WeatherMain v-else :latitude="latitude" :longitude="longitude" />
</template>
