<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useWeather } from '@/composables/useWeather'
import { useGeocode } from '@/composables/useGeocode'
import WeatherToday from '@/components/WeatherToday.vue'
import WeatherForecast from '@/components/WeatherForecast.vue'
import type { GeocodeResponse } from '@/types/geocode'

const props = defineProps<{
  longitude: string
  latitude: string
  name?: string
}>()

const lon = toRef(props, 'longitude')
const lat = toRef(props, 'latitude')

const needsGeocode = computed(() => !props.name)

const {
  data: weatherData,
  currentHour,
  loading: weatherLoading,
  error: weatherError,
} = useWeather(lon, lat)
const { data: geocodeResult, loading: geocodeLoading } = useGeocode(lon, lat, needsGeocode)

const geocodeData = computed<GeocodeResponse | null>(() => {
  if (props.name) {
    return {
      id: `${lat.value}-${lon.value}`,
      city: props.name,
      latitude: parseFloat(lat.value),
      longitude: parseFloat(lon.value),
    }
  }
  return geocodeResult.value
})

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
