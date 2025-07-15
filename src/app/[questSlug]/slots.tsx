import React from "react";
import styles from "./questSlug.module.scss";
import {ISlot} from "@/types/quests.interface";
export const Slots = ({slots}: {slots: ISlot[]}) => {
	function formatTimeFromISO(isoString: string): string {
		const date = new Date(isoString);
		return date.toLocaleTimeString("ru-RU", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	}
	return (
		<div className={styles.booking__list}>
			{slots.map((slot) => {
				return (
					<div key={slot.id} className={styles.booking__card}>
						<p className="numbers">{formatTimeFromISO(slot.date)}</p>
						<p className="textRegular">{slot.tariffs[0].price} руб</p>
					</div>
				);
			})}
		</div>
	);
};
