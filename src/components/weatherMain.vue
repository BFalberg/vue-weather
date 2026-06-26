<script setup lang="ts">
import { useWeather } from "@/composables/useWeather";
import { toRef } from "vue";

const props = defineProps<{
  longitude: string;
  latitude: string;
}>();

const lon = toRef(props, "longitude");
const lat = toRef(props, "latitude");

const { data, loading, error } = useWeather(lon, lat);
</script>

<template>
  <div v-if="loading">
    <p>Loading weather data...</p>
  </div>
  <div v-else-if="error">
    <p>Error loading weather data: {{ error }}</p>
  </div>
  <div v-else>
    <h2>Weather Information</h2>
    <div class="flex items-start gap-4 overflow-x-scroll">
      <div v-for="item in data" :key="item.time" class="flex flex-col gap-2 items-center min-w-max">
        <p>Time: {{ item.time }}</p>
        <p>Temperature: {{ item.temperature }}°</p>
        <p>Precipitation: {{ item.precipitation }}mm</p>
        <p>Wind Speed: {{ item.windspeed }} km/h</p>
      </div>
    </div>
  </div>
</template>
