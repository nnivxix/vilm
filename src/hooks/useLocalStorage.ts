/**
 * @description Only string can be accepted
 * @param key
 * @see https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
 */

function useLocalStorage(key: string) {
	const item = localStorage.getItem(key) ?? "";

	function setItem(value: string) {
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
