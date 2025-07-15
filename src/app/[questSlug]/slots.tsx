"use client";

import React, {useState} from "react";
import styles from "./questSlug.module.scss";
import {ISlot} from "@/types/booking.interface";
import {formatTimeAndDateFromISO} from "@/utils/converDateFromIso";
import {BookingModal} from "./bookingModal";
export const Slots = ({slots, questTitle}: {slots: ISlot[]; questTitle: string}) => {
	const [open, setOpen] = useState(false);
	const [modalType, setModalType] = useState<"active" | "notActive">("notActive");

	const tariffs = [
		{id: 1, slotId: 25, title: "2-4 человека", price: 3000},
		{id: 2, slotId: 26, title: "5 человек", price: 4000},
		{id: 3, slotId: 27, title: "6 человек", price: 4500},
	];

	const [selectSlot, setSelectSlot] = useState<ISlot>({
		id: 26122,
		questId: 25,
		status: "свободно",
		date: "2025-07-16T00:00:00",
		tariffs,
	});

	return (
		<div className={styles.booking__list}>
			{slots.length !== 0 ? (
				slots.map((slot) => {
					return (
						<div
							key={slot.id}
							onClick={() => {
								setOpen(true);
								setModalType("active");
								setSelectSlot(slot);
							}}
							className={styles.booking__card}
						>
							<p className="numbers">{formatTimeAndDateFromISO(slot.date).time}</p>
							<p className="textRegular">{slot.tariffs[0].price} руб</p>
						</div>
					);
				})
			) : (
				<p className="textBold" style={{marginTop: "10px"}}>
					Слотов для бронирования нет
				</p>
			)}
			<div
				onClick={() => {
					setOpen(true);
					setModalType("active");
					setSelectSlot({
						id: 26122,
						questId: 25,
						status: "свободно",
						date: "2025-07-16T00:00:00",
						tariffs,
					});
				}}
				className={styles.booking__card}
			>
				<p className="numbers">19:00</p>
				<p className="textRegular">3000 руб</p>
			</div>
			<div
				onClick={() => {
					setOpen(true);
					setModalType("notActive");
				}}
				className={`${styles.booking__card} ${styles.booking__cardNotActive}`}
			>
				<p className="numbers">19:00</p>
				<p className="textRegular">3000 руб</p>
			</div>
			<BookingModal
				open={open}
				modalType={modalType}
				onClose={() => setOpen(false)}
				selectSlot={selectSlot}
				tariffs={tariffs}
				questTitle={questTitle}
			/>
		</div>
	);
};
