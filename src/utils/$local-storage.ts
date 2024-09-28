"use client";
/**
 * @param key
 * @see {@link https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/ How to Use localStorage with React Hooks to Set and Get Items}
 */

function $localStorage(key: string) {
  const item = typeof window !== "undefined" ? localStorage.getItem(key) : "";

  function setItem(value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  function removeItem() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  function clear() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }
  return {
    item,
    setItem,
    removeItem,
    clear,
  };
}

export default $localStorage;
