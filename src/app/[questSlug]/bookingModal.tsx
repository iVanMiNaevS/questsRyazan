import React, {useState} from "react";
import styles from "./questSlug.module.scss";
import {formatTimeAndDateFromISO} from "@/utils/converDateFromIso";
import {Modal} from "@/components/Modal/modal";
import {ISlot} from "@/types/booking.interface";
import {bookingService} from "@/services/bookingService";

type props = {
	open: boolean;
	onClose: () => void;
	modalType: "active" | "notActive";
	selectSlot: ISlot;
	tariffs: {
		id: number;
		slotId: number;
		title: string;
		price: number;
	}[];
	questTitle: string;
};

export const BookingModal = ({
	open,
	onClose,
	modalType,
	selectSlot,
	tariffs,
	questTitle,
}: props) => {
	const [selectTarriff, setSelectTariff] = useState(tariffs[0]);

	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isRed, setIsRed] = useState(false);
	return (
		<Modal
			isOpen={open}
			headertext={modalType === "active" ? questTitle : "Данное время уже забронировано"}
			onClose={onClose}
			onSubmit={() => {
				if (isChecked) {
					bookingService.postBooking({
						fio: author,
						phone,
						email,
						price: selectTarriff.price,
						comment: text,
						questId: selectSlot.questId,
						date: new Date().toISOString(),
					});
					onClose();
					setIsRed(false);
					setIsChecked(false);
				} else {
					setIsRed(true);
				}
			}}
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
	);
};
