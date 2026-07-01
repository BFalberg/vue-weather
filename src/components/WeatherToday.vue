<script setup lang="ts">
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { useFavoriteStore } from '@/stores/favorite'
import type { GeocodeResponse } from '@/types/geocode'
import { Heart } from '@lucide/vue'

const favoriteStore = useFavoriteStore()

const props = defineProps<{
  currentLocation: GeocodeResponse
  temperature: number
  precipitation: number
  windspeed: number
  time: string
}>()

const isFav = computed(() => favoriteStore.isFavorite(props.currentLocation.id))

function toggleFavorite() {
  if (isFav.value) {
    favoriteStore.removeFavorite(props.currentLocation.id)
  } else {
    favoriteStore.addFavorite(props.currentLocation)
  }
}
</script>

<template>
  <div class="flex flex-col items-center text-center w-full relative">
    <div class="grid grid-cols-3 justify-center mb-6">
      <div></div>
      <h1 class="text-2xl font-semibold tracking-widest uppercase opacity-80">
        {{ props.currentLocation.city }}
      </h1>
      <button @click="toggleFavorite" class="justify-self-end">
        <Heart :fill="isFav ? 'white' : 'none'" />
      </button>
    </div>
    <WeatherIcon
      :precipitation="props.precipitation"
      :time="props.time"
      class="w-36 h-36 drop-shadow-2xl mb-4"
    />
    <p class="text-9xl font-thin leading-none mb-8">{{ Math.round(props.temperature) }}°</p>
    <div class="flex gap-8 text-sm opacity-75">
      <div class="flex flex-col items-center gap-1">
        <span class="font-medium tracking-wide uppercase text-xs">Wind</span>
        <span class="text-base">{{ props.windspeed }} m/s</span>
      </div>
      <div class="w-px bg-white/30" />
      <div class="flex flex-col items-center gap-1">
        <span class="font-medium tracking-wide uppercase text-xs">Precipitation</span>
        <span class="text-base">{{ props.precipitation }} mm</span>
      </div>
    </div>
  </div>
</template>
