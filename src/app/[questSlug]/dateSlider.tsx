"use client";
import styles from "./questSlug.module.scss";
import {useState} from "react";

function formatDatePartsRu(dateStr: string) {
	const date = new Date(dateStr);
	const day = date.getDate();
	const weekday = date.toLocaleDateString("ru-RU", {weekday: "short"}).toUpperCase();
	return {day, weekday};
}

function getMonthNameRu(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("ru-RU", {month: "long"});
}

export default function DateSlider() {
	const [startIndex, setStartIndex] = useState(0);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const generateDates = (start: number, count: number) => {
		const dates: string[] = [];
		const today = new Date();

		for (let i = 0; i < count; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + start + i);
			dates.push(date.toISOString().split("T")[0]);
		}

		return dates;
	};

	const dates = generateDates(startIndex, 14);
	const firstMonth = getMonthNameRu(dates[0]);
	const lastMonth = getMonthNameRu(dates[dates.length - 1]);

	return (
		<div className={styles.booking__dateList}>
			<div className={styles.booking__list}>
				{dates.map((date) => {
					const {day, weekday} = formatDatePartsRu(date);

					const isActive = selectedDate === date;

					return (
						<button
							key={date}
							onClick={() => setSelectedDate(date)}
							className={`${styles.booking__block} ${isActive ? styles.booking__active : ""}`}
						>
							<p className="numbers">{day}</p>
							<p
								className={`textRegular ${
									weekday === "СБ" || weekday === "ВС" ? styles.booking__wekend : ""
								}`}
							>
								{weekday}
							</p>
						</button>
					);
				})}
			</div>

			<div className={styles.booking__controls}>
				<div className={styles.booking__control}>
					<button onClick={() => setStartIndex((prev) => Math.max(0, prev - 15))}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14 7L9 12L14 17"
								stroke="#E73030"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<p className="textRegular">{firstMonth}</p>
				</div>

				<div className={styles.booking__control}>
					<button onClick={() => setStartIndex((prev) => prev + 15)}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{transform: "rotate(180deg)"}}
						>
							<path
								d="M14 7L9 12L14 17"
								stroke="#E73030"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<p className="textRegular">{lastMonth}</p>
				</div>
			</div>
		</div>
	);
}
