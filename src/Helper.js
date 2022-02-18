export const convert = (arr) => {
	const res = {};
	arr.forEach((el) => {
		const key = `${el.year}`;
		if (!res[key]) {
			res[key] = { ...el, count: 0 };
		}
		res[key].count += 1;
	});
	return Object.values(res);
};

