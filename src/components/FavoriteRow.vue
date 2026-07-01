<script setup lang="ts">
import { computed } from 'vue'
import type { Favorite } from '@/types/favorite'
import { useWeather } from '@/composables/useWeather'
import WeatherIcon from './WeatherIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ favorite: Favorite }>()

const lon = computed(() => String(props.favorite.longitude))
const lat = computed(() => String(props.favorite.latitude))

function select(result: Favorite) {
  void router.push(
    `/city/${result.latitude}/${result.longitude}/${encodeURIComponent(result.city)}`,
  )
}

const { currentHour, loading } = useWeather(lon, lat)
</script>

<template>
  <button @click="select(props.favorite)" class="flex items-center justify-between min-h-20">
    <span class="text-lg font-bold uppercase tracking-widest">{{ favorite.city }}</span>
    <span class="text-lg flex items-center">
      <template v-if="loading"
        ><WeatherIcon :precipitation="0" :time="new Date().toISOString()" class="size-8" />
        --°</template
      >
      <template v-else-if="currentHour">
        <WeatherIcon
          :precipitation="currentHour.precipitation"
          :time="currentHour.time"
          class="size-8"
        />
        {{ Math.round(currentHour.temperature) }}°
      </template>
    </span>
  </button>
</template>
