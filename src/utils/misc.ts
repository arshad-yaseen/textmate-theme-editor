export const assignRef = <T>(
  ref: React.MutableRefObject<T> | ((instance: T) => void) | null,
  instance: T
) => {
  if (ref) {
    if ("current" in ref) {
      ref.current = instance;
    }

    if (typeof ref === "function") {
      ref(instance);
    }
  }
};
