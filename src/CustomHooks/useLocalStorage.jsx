import { useState } from "react";

export const useLocalStorage = (key) => {
  const [storedValues, setStoredValues] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      alert(`Error:
        ${error.message}
Failed to read from localStorage`);

      return [];
    }
  });

  const storeValues = (value) => {
    try {
      setStoredValues(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      alert(`Error:
        ${error.message}
Failed to save to localStorage`);
    }
  };

  return [storedValues, storeValues];
};
