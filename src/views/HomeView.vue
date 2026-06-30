<script setup lang="ts">
import { useLocation } from '@/composables/useLocation'

const { latitude, longitude, loading, error } = useLocation()
</script>

<template>
  <div v-if="loading" class="text-xl opacity-70">Locating...</div>
  <div v-else-if="error" class=" ">
    <p class="text-red-200 text-sm">{{ error.message }}</p>
  </div>
  <WeatherMain v-else :latitude="latitude" :longitude="longitude" />
</template>
