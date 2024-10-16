export const deepObjectMerge = <T>(
  partial: Partial<T> | undefined,
  fallback: T
): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = { ...fallback };

  for (const key in partial) {
    if (typeof partial[key] === "object" && !Array.isArray(partial[key])) {
      if (
        fallback[key] &&
        typeof fallback[key] === "object" &&
        !Array.isArray(fallback[key])
      ) {
        merged[key] = deepObjectMerge(
          partial[key] as Partial<T> | undefined,
          fallback[key] as T
        );
      } else {
        merged[key] = { ...partial[key] };
      }
    } else {
      merged[key] = partial[key];
    }
  }

  return merged;
};
