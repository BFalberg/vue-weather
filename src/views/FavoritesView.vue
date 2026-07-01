<script setup lang="ts">
import { useFavoriteStore } from '@/stores/favorite'
import FavoriteRow from '@/components/FavoriteRow.vue'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <div class="px-4 py-12">
    <div class="max-w-xl mx-auto">
      <div class="flex items-center justify-center mb-6">
        <h1 class="text-2xl font-semibold tracking-widest uppercase opacity-80">Favorites</h1>
      </div>
      <div v-if="favoriteStore.favorites.length === 0" class="opacity-50 text-sm">
        No favorites yet. Add one from the home screen.
      </div>
      <div v-else class="flex flex-col divide-y divide-white/10">
        <FavoriteRow
          v-for="favorite in favoriteStore.favorites"
          :key="favorite.id"
          :favorite="favorite"
        />
      </div>
    </div>
  </div>
</template>
