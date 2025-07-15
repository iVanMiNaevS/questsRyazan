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

export function formatDatePartsRu(dateStr: string) {
	const date = new Date(dateStr);
	const day = date.getDate();
	const weekday = date.toLocaleDateString("ru-RU", {weekday: "short"}).toUpperCase();
	return {day, weekday};
}

export function getMonthNameRu(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("ru-RU", {month: "long"});
}

export function formatTimeAndDateFromISO(isoString: string): {time: string; date: string} {
	const date = new Date(isoString);

	const time = date
		.toLocaleTimeString("ru-RU", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
		.replace(/\D(\d)\D/, "0$1");

	const dateStr = date.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
	});

	return {
		time: time.padStart(5, "0"),
		date: dateStr,
	};
}
