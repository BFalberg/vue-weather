<script setup lang="ts">
import { toRef } from 'vue'
import { useWeather } from '@/composables/useWeather'
import { useGeocode } from '@/composables/useGeocode'
import WeatherToday from '@/components/WeatherToday.vue'
import WeatherForecast from '@/components/WeatherForecast.vue'

const props = defineProps<{
  longitude: string
  latitude: string
}>()

const lon = toRef(props, 'longitude')
const lat = toRef(props, 'latitude')

const {
  data: weatherData,
  currentHour,
  loading: weatherLoading,
  error: weatherError,
} = useWeather(lon, lat)
const { data: geocodeData, loading: geocodeLoading } = useGeocode(lon, lat)

const loadingLocation = { id: '', city: 'Loading...', longitude: 0, latitude: 0 }
</script>

<template>
  <div v-if="weatherLoading || geocodeLoading" class="animate-pulse pointer-events-none">
    <WeatherToday
      :currentLocation="loadingLocation"
      :temperature="0"
      :precipitation="0"
      :windspeed="0"
      :time="new Date().toISOString()"
    />
  </div>
  <div v-else-if="weatherError" class="text-red-200 text-sm">
    {{ weatherError.message }}
  </div>
  <template v-else-if="currentHour && geocodeData && weatherData">
    <WeatherToday
      :currentLocation="geocodeData"
      :temperature="currentHour.temperature"
      :precipitation="currentHour.precipitation"
      :windspeed="currentHour.windspeed"
      :time="currentHour.time"
    />
    <div class="w-full mt-12">
      <WeatherForecast :weatherData="weatherData" />
    </div>
  </template>
</template>
