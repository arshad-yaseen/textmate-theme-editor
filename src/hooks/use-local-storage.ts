import { useState, useCallback } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: SetValue<T>) => void] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = useCallback(
    (valueOrFn: SetValue<T>) => {
      setLocalStorageValue((prevValue) => {
        const newValue =
          typeof valueOrFn === "function"
            ? (valueOrFn as (prevValue: T) => T)(prevValue)
            : valueOrFn;
        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    },
    [key]
  );

  return [localStorageValue, setLocalStorageStateValue];
}

export default useLocalStorage;
