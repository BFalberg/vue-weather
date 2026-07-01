<script setup lang="ts">
import type { DailyWeather } from '@/types/weather'
import { formatDayLabel, formatFullLabel } from '@/utils/time'
import WeatherIcon from './WeatherIcon.vue'
import { computed } from 'vue';

const props = defineProps<{
  weatherData: DailyWeather[]
}>()

const formattedDays = computed(() => {
    return props.weatherData.map(day => ({
        ...day,
        dayLabel: formatDayLabel(day.date),
        fullLabel: formatFullLabel(day.date),
        hours: day.hours.map(hour => ({
            ...hour,
            displayTime: hour.time.slice(11, 16),
            displayTemperature: Math.round(hour.temperature),
            displayPrecipitation: hour.precipitation
        }))

    }))
});

</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="day in formattedDays"
      :key="day.date"
      class="flex flex-col bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
    >
      <div class="flex items-center px-5 py-3 gap-4">
        <span class="text-sm font-medium">{{ day.dayLabel }}</span>
        <span class="text-xs opacity-50">{{ day.fullLabel }}</span>
      </div>

      <div class="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
        <div
          v-for="hour in day.hours"
          :key="hour.time"
          class="flex flex-col items-center gap-1 min-w-13 text-center shrink-0"
        >
          <span class="text-xs opacity-60">{{ hour.displayTime }}</span>
          <WeatherIcon :precipitation="hour.precipitation" :time="hour.time" class="w-6 h-6" />
          <span class="text-sm font-medium">{{ hour.displayTemperature }}°</span>
          <span class="text-xs opacity-50">{{ hour.displayPrecipitation }} mm</span>
        </div>
      </div>
    </div>
  </div>
</template>
