import { ref, watchEffect, type Ref } from 'vue'
import type { GeocodeResponse } from '@/types/geocode'

type NominatimReverseResponse = {
  address: {
    city?: string
    town?: string
    village?: string
    county?: string
  }
}

export function useGeocode(longitude: Ref<string>, latitude: Ref<string>, enabled?: Ref<boolean>) {
  const data = ref<GeocodeResponse | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchGeocode() {
    if (enabled && !enabled.value) return
    if (!longitude.value || !latitude.value) return

    loading.value = true
    error.value = null

    try {
      const url = new URL('https://nominatim.openstreetmap.org/reverse')
      url.searchParams.set('lat', latitude.value)
      url.searchParams.set('lon', longitude.value)
      url.searchParams.set('format', 'json')
      url.searchParams.set('accept-language', 'en')

      const response = await fetch(url, {
        headers: { 'User-Agent': 'vue-weather-app' },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const nominatimData: NominatimReverseResponse = await response.json()
      const addr = nominatimData.address
      const city = addr.city ?? addr.town ?? addr.village ?? addr.county ?? 'Unknown'

      data.value = {
        id: `${latitude.value}-${longitude.value}`,
        city,
        longitude: parseFloat(longitude.value),
        latitude: parseFloat(latitude.value),
      }
    } catch (err) {
      error.value = err as Error
      console.error('Error fetching geocode data:', error.value)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    void fetchGeocode()
  })

  return { data, loading, error }
}
