import {useState} from "react";

export const useLocalStorage = (key,initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      });

      const setValues = value => {
        setStoredValue(value);
        value = window.localStorage.setItem(key, JSON.stringify(value));
      }

    return [storedValue, setValues];
}