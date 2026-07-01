import { ref, watch } from 'vue'
import type { GeocodeSearchResult, GeocodeSearchResponse } from '@/types/geocodeSearch'

export function useGeocodeSearch() {
  const query = ref('')
  const results = ref<GeocodeSearchResult[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function search(name: string) {
    if (name.length < 2) {
      results.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
      url.searchParams.set('name', name)
      url.searchParams.set('count', '5')
      url.searchParams.set('language', 'en')
      url.searchParams.set('format', 'json')

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data: GeocodeSearchResponse = await response.json()
      results.value = data.results ?? []
    } catch (err) {
      error.value = err as Error
      results.value = []
    } finally {
      loading.value = false
    }
  }

  let debounceTimer: ReturnType<typeof setTimeout>

  watch(query, (newQuery) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => void search(newQuery), 300)
  })

  return { query, results, loading, error }
}
