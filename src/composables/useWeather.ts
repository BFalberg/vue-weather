import { ref, computed, watchEffect, type Ref } from 'vue'
import type { WeatherResponse, HourlyData, DailyWeather } from '@/types/weather'
import { currentHourPrefix } from '@/utils/time'

export function useWeather(longitude: Ref<string>, latitude: Ref<string>) {
  const data = ref<DailyWeather[] | null>(null)
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
      url.searchParams.set('timezone', 'auto')
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

  function transformWeatherData(rawData: WeatherResponse): DailyWeather[] {
    const hourlyData: HourlyData[] = rawData.hourly.time.map((time: string, index: number) => ({
      time,
      temperature: rawData.hourly.temperature_2m[index]!,
      windspeed: rawData.hourly.windspeed_10m[index]!,
      precipitation: rawData.hourly.precipitation[index]!,
    }))

    const days = hourlyData.reduce(
      (dailyData, hour) => {
        const [date] = hour.time.split('T')

        if (!date) {
          return dailyData
        }

        if (!dailyData[date]) {
          dailyData[date] = []
        }

        dailyData[date].push(hour)
        return dailyData
      },
      {} as Record<string, HourlyData[]>,
    )

    const transformedData: DailyWeather[] = Object.entries(days).map(([date, hours]) => ({
      date,
      hours,
    }))

    return transformedData
  }

  const currentHour = computed<HourlyData | null>(() => {
    if (!data.value) return null
    const nowPrefix = currentHourPrefix()
    for (const day of data.value) {
      const hour = day.hours.find((h) => h.time.slice(0, 13) >= nowPrefix)
      if (hour) return hour
    }
    return data.value[0]?.hours[0] ?? null
  })

  watchEffect(() => {
    void fetchWeather()
  })

  return { data, currentHour, loading, error }
}
