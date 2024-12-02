import { ref, watch } from "vue";

function getLocalStorage<T>(key: string): T | null {
  const storedValue = localStorage.getItem(key);

  if (null === storedValue) {
    return null;
  }

  return JSON.parse(storedValue) as T;
}

function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string) {
  const storedValue = ref(getLocalStorage<T>(key));

  watch(storedValue, (newValue) => {
    setLocalStorage(key, newValue);
  });

  return storedValue;
}
