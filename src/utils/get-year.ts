const getYear = (date: string) => {
	return date?.split("-")[0] ?? "";
};

export default getYear;
