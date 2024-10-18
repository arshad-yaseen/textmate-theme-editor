export const tryParseJSON = (jsonString: string): unknown => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};
