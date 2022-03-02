export const assign = <T>(target: T, ...sources: Partial<T>[]): T => {
  return sources.reduce<T>((prev, current) => {
    return Object.assign(prev, current);
  }, target);
};
