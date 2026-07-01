<script setup lang="ts">
import { useLocation } from '@/composables/useLocation'
import WeatherMain from '@/components/WeatherMain.vue'

const { latitude, longitude, loading, error } = useLocation()
</script>

<template>
  <div class="px-4 py-12">
    <div v-if="loading" class="flex items-center justify-center mb-6">
      <h1 class="text-2xl font-semibold tracking-widest uppercase opacity-80">Loading...</h1>
    </div>
    <div v-else-if="error" class=" ">
      <p class="text-red-200 text-sm">{{ error.message }}</p>
    </div>
    <div v-else class="max-w-xl mx-auto">
      <WeatherMain :latitude="latitude" :longitude="longitude" />
    </div>
  </div>
</template>
