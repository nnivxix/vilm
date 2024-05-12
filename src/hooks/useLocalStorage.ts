/**
 * @description Only string can be accepted
 * @param key
 * @see {@link https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/ How to Use localStorage with React Hooks to Set and Get Items}
 */

function useLocalStorage(key: string) {
	const item = localStorage.getItem(key) ?? "";

	function setItem(value: string) {
		if (value != typeof "string") {
			throw Error("value must be string");
		}

		localStorage.setItem(key, value);
	}

	function removeItem() {
		localStorage.removeItem(key);
	}

	function clear() {
		localStorage.clear();
	}
	return {
		item,
		setItem,
		removeItem,
		clear,
	};
}

export default useLocalStorage;
