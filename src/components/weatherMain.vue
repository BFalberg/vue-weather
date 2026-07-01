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
</script>

<template>
  <div class="px-4 py-12">
    <div
      v-if="weatherLoading || geocodeLoading"
      class="flex-1 flex items-center text-xl opacity-70"
    >
      Loading...
    </div>
    <div v-else-if="weatherError" class="text-red-200 text-sm">
      {{ weatherError.message }}
    </div>
    <template v-else-if="currentHour && geocodeData && weatherData">
      <WeatherToday
        :currentLocation="geocodeData"
        :city="geocodeData.city"
        :temperature="currentHour.temperature"
        :precipitation="currentHour.precipitation"
        :windspeed="currentHour.windspeed"
        :time="currentHour.time"
      />
      <div class="w-full mt-12">
        <WeatherForecast :weatherData="weatherData" />
      </div>
    </template>
  </div>
</template>
