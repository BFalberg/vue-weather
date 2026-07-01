<script setup lang="ts">
import { useRoute } from 'vue-router'
import WeatherMain from '@/components/WeatherMain.vue'

const route = useRoute()
const latitude = route.params.lat as string
const longitude = route.params.lon as string
</script>

<template>
  <div class="px-4 py-12">
    <div class="max-w-xl mx-auto">
      <WeatherMain :latitude="latitude" :longitude="longitude" />
    </div>
  </div>
</template>
