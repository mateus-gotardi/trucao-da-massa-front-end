export const saveStateInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStateFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getStateFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return null;
};
