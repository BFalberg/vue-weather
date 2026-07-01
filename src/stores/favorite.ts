import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Favorite } from '@/types/favorite'

export const useFavoriteStore = defineStore('favorites', () => {
  const currentFavorites = localStorage.getItem('favorites')
  const favorites = ref<Favorite[]>(
    (JSON.parse(currentFavorites || '[]') as (Favorite | null)[]).filter(
      (f): f is Favorite => f !== null,
    ),
  )

  function addFavorite(favorite: Favorite) {
    if (!favorites.value.some((fav) => fav.id === favorite.id)) {
      favorites.value.push(favorite)
    }
  }

  function removeFavorite(favoriteId: string) {
    favorites.value = favorites.value.filter((fav) => fav.id !== favoriteId)
  }

  function isFavorite(favoriteId: string): boolean {
    return favorites.value.some((fav) => fav?.id === favoriteId)
  }

  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    },
    { deep: true },
  )

  return { favorites, addFavorite, removeFavorite, isFavorite }
})
