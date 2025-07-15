"use client";

import React, {useState} from "react";
import styles from "./questSlug.module.scss";
import {ISlot} from "@/types/quests.interface";
import {Modal} from "@/components/Modal/modal";
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

	const [selectTarriff, setSelectTariff] = useState(tariffs[0]);

	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isRed, setIsRed] = useState(false);

	function formatTimeAndDateFromISO(isoString: string): {time: string; date: string} {
		const date = new Date(isoString);

		// Форматируем время (00:00)
		const time = date
			.toLocaleTimeString("ru-RU", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(/\D(\d)\D/, "0$1"); // Добавляем ведущий ноль если нужно

		// Форматируем дату (16 июля)
		const dateStr = date.toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
		});

		return {
			time: time.padStart(5, "0"), // Гарантируем формат 00:00
			date: dateStr,
		};
	}
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
			<Modal
				isOpen={open}
				headertext={modalType === "active" ? questTitle : "Данное время уже забронировано"}
				onClose={() => {
					setOpen(false);
				}}
				onSubmit={() => {}}
				textCloseButton="Отменить"
				textSubmitButton={modalType === "active" ? "Забронировать" : ""}
			>
				<div>
					{modalType === "active" ? (
						<div className="">
							<div className={styles.bookingModal__infoContainer}>
								<p className={`textRegular ${styles.bookingModal__gray}`}>{selectTarriff.title}</p>
								<p className="numbers">{selectTarriff.price} руб</p>
								<div className={styles.bookingModal__date}>
									<p className={`textRegular ${styles.bookingModal__gray}`}>
										{formatTimeAndDateFromISO(selectSlot?.date).time}
									</p>
									<p className={`textRegular ${styles.bookingModal__gray}`}>
										{formatTimeAndDateFromISO(selectSlot?.date).date}
									</p>
								</div>
							</div>
							<div className={styles.bookingModal__forms}>
								<input
									type="text"
									placeholder="Имя и фамилия"
									value={author}
									onChange={(e) => {
										setAuthor(e.target.value);
									}}
									className={`${styles.bookingModal__forms__input} textRegular`}
								/>
								<div className={styles.bookingModal__forms__selectWrapp}>
									<select
										value={selectTarriff.id}
										className="textRegular"
										onChange={(e) => {
											setSelectTariff(
												tariffs.find((tariff) => Number(e.target.value) === tariff.id) || tariffs[0]
											);
										}}
									>
										{tariffs.map((option) => (
											<option key={option.id} className="textRegular" value={option.id}>
												{option.title}
											</option>
										))}
									</select>
									<div className={styles.bookingModal__forms__row}>
										<svg
											width="13"
											height="20"
											viewBox="0 0 13 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12.6834 17.65L5.05004 10L12.6834 2.35L10.3334 0L0.333374 10L10.3334 20L12.6834 17.65Z"
												fill="#fff"
											></path>
										</svg>
									</div>
								</div>
								<div className={styles.bookingModal__formRow}>
									<input
										required
										name="phone"
										placeholder="Телефон"
										className={`${styles.bookingModal__forms__input} textRegular`}
										inputMode="tel"
										autoComplete="tel"
										value={phone}
										onChange={(e) => {
											setPhone(e.target.value);
										}}
									></input>
									<input
										placeholder="Email"
										type="email"
										className={`${styles.bookingModal__forms__input} textRegular`}
										name="email"
										required
										autoComplete="email"
										inputMode="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									></input>
								</div>
								<textarea
									rows={1}
									onChange={(e) => setText(e.target.value)}
									value={text}
									placeholder="Комментарий"
									className={`${styles.bookingModal__forms__input} textRegular`}
									name="comment"
									required
									inputMode="text"
								></textarea>
								<div className={styles.bookingModal__forms__checkBox}>
									<input
										name="cb"
										type="checkbox"
										id="access_review"
										checked={isChecked}
										onChange={(e) => setIsChecked(e.target.checked)}
									/>
									<label className="textRegular" htmlFor="access_review">
										<span style={isRed ? {color: "red"} : {}}>
											Даю согласие на обработку моих персональных данных в соотвествии с политикой
											обработки ПД.
										</span>
									</label>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</Modal>
		</div>
	);
};
