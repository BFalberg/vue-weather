import { ref, watchEffect, type Ref } from "vue";

export function useWeather(city: Ref<string>) {
  const data = ref(null);
  const loading = ref(false);

  watchEffect(async () => {
    loading.value = true;
    data.value = await fetchWeather(city.value);
    loading.value = false;
  });

  return { data, loading };
}
