import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 2000) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => value && setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return { debounceValue, setDebounceValue };
};
