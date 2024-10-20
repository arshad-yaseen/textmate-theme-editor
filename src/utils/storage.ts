export const setStorage = (key: string, value: unknown): void => {
  if (typeof localStorage === "undefined") return;

  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};

export const getStorage = <T = unknown>(key: string): T | null => {
  if (typeof localStorage === "undefined") return null;

  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return value as unknown as T;
  }
};

export const removeStorage = (key: string) => {
  if (typeof localStorage === "undefined") return;

  localStorage.removeItem(key);
};
