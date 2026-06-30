<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'

const props = defineProps<{
  city: string
  temperature: number
  precipitation: number
  windspeed: number
  time: string
}>()
</script>

<template>
  <div class="flex flex-col items-center text-center w-full max-w-sm">
    <h1 class="text-2xl font-semibold tracking-widest uppercase opacity-80 mb-6">
      {{ props.city }}
    </h1>
    <WeatherIcon
      :precipitation="props.precipitation"
      :time="props.time"
      class="w-36 h-36 drop-shadow-2xl mb-4"
    />
    <p class="text-9xl font-thin leading-none mb-8">{{ Math.round(props.temperature) }}°</p>
    <div class="flex gap-8 text-sm opacity-75">
      <div class="flex flex-col items-center gap-1">
        <span class="font-medium tracking-wide uppercase text-xs">Wind</span>
        <span class="text-base">{{ props.windspeed }} km/h</span>
      </div>
      <div class="w-px bg-white/30" />
      <div class="flex flex-col items-center gap-1">
        <span class="font-medium tracking-wide uppercase text-xs">Precipitation</span>
        <span class="text-base">{{ props.precipitation }} mm</span>
      </div>
    </div>
  </div>
</template>
