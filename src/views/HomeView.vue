<script setup lang="ts">
import { useLocation } from '@/composables/useLocation'
import WeatherMain from '@/components/WeatherMain.vue'

const { latitude, longitude, loading, error } = useLocation()
</script>

<template>
  <div v-if="loading" class="text-xl opacity-70">Locating...</div>
  <div v-else-if="error" class=" ">
    <p class="text-red-200 text-sm">{{ error.message }}</p>
  </div>
  <div v-else class="max-w-xl mx-auto">
    <WeatherMain :latitude="latitude" :longitude="longitude" />
  </div>
</template>
