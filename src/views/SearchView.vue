<script setup lang="ts">
import { useGeocodeSearch } from '@/composables/useGeocodeSearch'
import type { GeocodeSearchResult } from '@/types/geocodeSearch'
import { useRouter } from 'vue-router'

const { query, results, loading } = useGeocodeSearch()
const router = useRouter()

function select(result: GeocodeSearchResult) {
  void router.push(`/city/${result.latitude}/${result.longitude}`)
}
</script>

<template>
  <div class="px-4 py-12 max-w-xl mx-auto">
    <h1 class="text-2xl font-semibold tracking-widest uppercase opacity-80 mb-6 text-center">
      Search
    </h1>
    <input
      v-model="query"
      type="text"
      placeholder="City name..."
      class="w-full bg-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 outline-none focus:bg-white/15 transition-colors"
      autofocus
    />
    <div v-if="loading" class="mt-4 text-sm opacity-50 text-center">Searching...</div>
    <ul v-else-if="results.length" class="mt-3 flex flex-col divide-y divide-white/10">
      <li v-for="result in results" :key="result.id">
        <button
          class="w-full flex items-center justify-between py-3 text-left"
          @click="select(result)"
        >
          <span class="font-medium">{{ result.name }}</span>
          <span class="text-sm opacity-50"
            >{{ result.admin1 ? `${result.admin1}, ` : '' }}{{ result.country_code }}</span
          >
        </button>
      </li>
    </ul>
    <div v-else-if="query.length >= 2" class="mt-4 text-sm opacity-50 text-center">
      No results found.
    </div>
  </div>
</template>
