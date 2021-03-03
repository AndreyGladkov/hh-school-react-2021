import { useState, useEffect } from 'react';

export default function useLocalStorage(key) {
  const [currentValue, setCurrentValue] = useState(() =>
    localStorage.getItem(key),
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setCurrentValue(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, currentValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [key, currentValue]);

  return [currentValue, setCurrentValue];
}
