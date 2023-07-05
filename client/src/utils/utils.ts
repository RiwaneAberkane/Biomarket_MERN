export const getObjectFromLocalStorage = (key: string) => {
    const storedItem = localStorage.getItem(key);
  
    if (storedItem )return storedItem
  }