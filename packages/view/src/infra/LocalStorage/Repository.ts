import { Item } from "./types";

export const createRepository = (prefixName: string) => {
  const localStorage = window.localStorage;
  const generateKey = (key: string) => `${prefixName}__${key}`;
  const getItem = <T>(key: string): T | undefined => {
    const restoreItem = localStorage.getItem(generateKey(key));
    if (!restoreItem) {
      return undefined;
    }
    try {
      const item: Item<T> = JSON.parse(restoreItem);
      return item.value;
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };
  const saveItem = <T>(key: string, value: T) => {
    const item: Item<T> = { value };
    localStorage.setItem(generateKey(key), JSON.stringify(item));
  };
  const removeItem = (key: string) => {
    localStorage.removeItem(generateKey(key));
  };
  return {
    getItem,
    removeItem,
    saveItem,
  };
};
