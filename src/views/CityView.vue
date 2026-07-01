<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WeatherMain from '@/components/WeatherMain.vue'

const route = useRoute()
const latitude = computed(() => route.params.lat as string)
const longitude = computed(() => route.params.lon as string)
const name = computed(() => route.params.name as string | undefined)
</script>

<template>
  <div class="px-4 py-12">
    <div class="max-w-xl mx-auto">
      <WeatherMain :latitude="latitude" :longitude="longitude" :name="name" />
    </div>
  </div>
</template>
