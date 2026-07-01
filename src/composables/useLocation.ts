import { ref } from 'vue'

const latitude = ref('')
const longitude = ref('')
const loading = ref(true)
const error = ref<Error | null>(null)

navigator.geolocation.getCurrentPosition(
  (pos) => {
    latitude.value = String(pos.coords.latitude)
    longitude.value = String(pos.coords.longitude)
    loading.value = false
  },
  (err) => {
    error.value = new Error(err.message)
    loading.value = false
  },
)

export function useLocation() {
  return { latitude, longitude, loading, error }
}
