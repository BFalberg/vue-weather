<script setup lang="ts">
import type { DailyWeather } from '@/types/weather'
import { formatDayLabel, formatFullLabel } from '@/utils/time'
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  weatherData: DailyWeather[]
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="day in weatherData"
      :key="day.date"
      class="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
    >
      <div class="flex items-center px-5 py-3 gap-4">
        <span class="text-sm font-medium">{{ formatDayLabel(day.date) }}</span>
        <span class="text-xs opacity-50">{{ formatFullLabel(day.date) }}</span>
      </div>

      <div class="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
        <div
          v-for="hour in day.hours"
          :key="hour.time"
          class="flex flex-col items-center gap-1 min-w-13 text-center shrink-0"
        >
          <span class="text-xs opacity-60">{{ hour.time.slice(11, 16) }}</span>
          <WeatherIcon :precipitation="hour.precipitation" :time="hour.time" class="w-6 h-6" />
          <span class="text-sm font-medium">{{ Math.round(hour.temperature) }}°</span>
          <span class="text-xs opacity-50">{{ hour.precipitation }} mm</span>
        </div>
      </div>
    </div>
  </div>
</template>
