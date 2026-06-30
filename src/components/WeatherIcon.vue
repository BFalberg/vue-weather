<script setup lang="ts">
import { computed } from 'vue'
import { isDay } from '@/utils/time'
import clearDayIcon from '@meteocons/svg/fill/clear-day.svg?url'
import clearNightIcon from '@meteocons/svg/fill/clear-night.svg?url'
import rainIcon from '@meteocons/svg/fill/rain.svg?url'
import drizzleIcon from '@meteocons/svg/fill/drizzle.svg?url'

const props = defineProps<{
  precipitation: number
  time: string
  class?: string
}>()

const icon = computed(() => {
  if (props.precipitation >= 5) return rainIcon
  if (props.precipitation >= 0.5) return drizzleIcon
  if (isDay(props.time)) return clearDayIcon
  return clearNightIcon
})
</script>

<template>
  <img :src="icon" alt="Weather icon" :class="props.class" />
</template>
