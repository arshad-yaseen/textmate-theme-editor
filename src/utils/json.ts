export const tryParseJSON = (
  jsonString: unknown
): Record<string, unknown> | null => {
  try {
    return JSON.parse(jsonString as string);
  } catch {
    return null;
  }
};
