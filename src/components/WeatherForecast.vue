<script setup lang="ts">
import { computed } from 'vue'
import type { HourlyData } from '@/types/weather'
import { formatDayLabel, formatFullLabel } from '@/utils/time'
import WeatherIcon from './WeatherIcon.vue'

const props = defineProps<{
  weatherData: HourlyData[]
}>()

const dailyData = computed(() => {
  const groups: Record<string, HourlyData[]> = {}

  for (const item of props.weatherData) {
    const date = item.time.slice(0, 10)
    if (!groups[date]) groups[date] = []
    groups[date].push(item)
  }

  return Object.entries(groups).map(([date, hours]) => {
    const temps = hours.map((h) => h.temperature)
    const totalPrecip = hours.reduce((sum, h) => sum + h.precipitation, 0)

    return {
      date,
      dayLabel: formatDayLabel(date),
      fullLabel: formatFullLabel(date),
      maxTemp: Math.round(Math.max(...temps)),
      minTemp: Math.round(Math.min(...temps)),
      avgHourlyPrecip: totalPrecip / hours.length,
    }
  })
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="day in dailyData"
      :key="day.date"
      class="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3"
    >
      <span class="w-20 text-sm font-medium">
        {{ day.dayLabel }}
        <span class="block text-xs opacity-50">{{ day.fullLabel }}</span>
      </span>
      <WeatherIcon
        :precipitation="day.avgHourlyPrecip"
        :time="day.date + 'T12:00:00'"
        class="w-8 h-8 mx-auto"
      />
      <div class="ml-auto flex items-center gap-4 text-sm">
        <span class="opacity-50">{{ day.minTemp }}°</span>
        <div class="w-16 h-1 rounded-full bg-white/20">
          <div class="h-full rounded-full bg-white/70" style="width: 60%" />
        </div>
        <span class="font-semibold">{{ day.maxTemp }}°</span>
      </div>
    </div>
  </div>
</template>
