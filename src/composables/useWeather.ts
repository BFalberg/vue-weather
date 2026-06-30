import { ref, watchEffect, type Ref } from 'vue'
import type { WeatherResponse, HourlyData } from '@/types/weather'

export function useWeather(longitude: Ref<string>, latitude: Ref<string>) {
  const data = ref<HourlyData[] | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchWeather() {
    loading.value = true
    error.value = null

    try {
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', latitude.value)
      url.searchParams.set('longitude', longitude.value)
      url.searchParams.set('hourly', 'temperature_2m,windspeed_10m,precipitation')
      url.searchParams.set('temperature_unit', 'celsius')
      url.searchParams.set('timezone', 'Europe/Copenhagen')
      //   url.searchParams.set("f", "GeoJSON");

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = transformWeatherData(await response.json())
    } catch (err) {
      error.value = err as Error
      console.error('Error fetching weather data:', error.value)
    } finally {
      loading.value = false
    }
  }

  function transformWeatherData(rawData: WeatherResponse): HourlyData[] {
    const transformedData = rawData.hourly.time.map((time: string, index: number) => ({
      time,
      temperature: rawData.hourly.temperature_2m[index],
      windspeed: rawData.hourly.windspeed_10m[index],
      precipitation: rawData.hourly.precipitation[index],
    }))

    return transformedData as HourlyData[]
  }

  watchEffect(() => {
    fetchWeather()
  })

  return { data, loading, error }
}
