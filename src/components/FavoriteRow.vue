<script setup lang="ts">
import { computed } from 'vue'
import type { Favorite } from '@/types/favorite'
import { useWeather } from '@/composables/useWeather'

const props = defineProps<{ favorite: Favorite }>()

const lon = computed(() => String(props.favorite.longitude))
const lat = computed(() => String(props.favorite.latitude))

const { currentHour, loading } = useWeather(lon, lat)
</script>

<template>
  <div class="flex items-center justify-between py-3">
    <span class="text-base font-medium">{{ favorite.city }}</span>
    <span class="text-base opacity-70">
      <template v-if="loading">—</template>
      <template v-else-if="currentHour">{{ Math.round(currentHour.temperature) }}°</template>
    </span>
  </div>
</template>
