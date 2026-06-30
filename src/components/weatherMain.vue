<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useWeather } from '@/composables/useWeather'
import { useGeocode } from '@/composables/useGeocode'
import { currentHourPrefix } from '@/utils/time'
import WeatherToday from './weatherToday.vue'
import WeatherForecast from './weatherForecast.vue'

const props = defineProps<{
  longitude: string
  latitude: string
}>()

const lon = toRef(props, 'longitude')
const lat = toRef(props, 'latitude')

const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(lon, lat)
const { data: geocodeData, loading: geocodeLoading } = useGeocode(lon, lat)

const currentWeather = computed(() => {
  if (!weatherData.value) return null
  const nowPrefix = currentHourPrefix()
  return weatherData.value.find((h) => h.time.slice(0, 13) >= nowPrefix) ?? weatherData.value[0]
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-sky-400 to-blue-700 text-white flex flex-col items-center px-4 py-12"
  >
    <div
      v-if="weatherLoading || geocodeLoading"
      class="flex-1 flex items-center text-xl opacity-70"
    >
      Loading...
    </div>
    <div v-else-if="weatherError" class="text-red-200 text-sm">
      {{ weatherError.message }}
    </div>
    <template v-else-if="currentWeather && geocodeData && weatherData">
      <WeatherToday
        :city="geocodeData.city"
        :temperature="currentWeather.temperature"
        :precipitation="currentWeather.precipitation"
        :windspeed="currentWeather.windspeed"
        :time="currentWeather.time"
      />
      <div class="w-full max-w-xl mt-12">
        <WeatherForecast :weatherData="weatherData" />
      </div>
    </template>
  </div>
</template>
