import { ref, watchEffect, type Ref } from 'vue'
import type { GeocodeResponse } from '@/types/geocode'

export function useGeocode(longitude: Ref<string>, latitude: Ref<string>) {
  const data = ref<GeocodeResponse | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchGeocode() {
    loading.value = true
    error.value = null

    try {
      const url = new URL('https://api.bigdatacloud.net/data/reverse-geocode-client')
      url.searchParams.append('longitude', longitude.value)
      url.searchParams.append('latitude', latitude.value)
      url.searchParams.append('localityLanguage', 'en')

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const geocodeData = await response.json()

      data.value = {
        id: `${geocodeData.countryCode}-${geocodeData.city}`,
        city: geocodeData.city,
        longitude: geocodeData.longitude,
        latitude: geocodeData.latitude,
      } as GeocodeResponse
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
