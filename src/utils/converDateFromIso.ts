export const formatDateFromISO = (isoDate: string): string => {
	try {
		const date = new Date(isoDate);

		// Проверка на валидность даты
		if (isNaN(date.getTime())) {
			throw new Error("Invalid date");
		}

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	} catch (error) {
		console.error("Error formatting date:", error);
		return "Invalid date";
	}
};
