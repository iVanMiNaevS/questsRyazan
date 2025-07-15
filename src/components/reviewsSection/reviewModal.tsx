"use client";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Modal} from "../Modal/modal";

import styles from "./reviewSection.module.scss";
import {SkullRating} from "./skullRating";
import {reviewService} from "@/services/reviewService";

type props = {
	onOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	questId?: number;
};

export const ReviewModal: React.FC<props> = ({onOpen, isOpen, questId}) => {
	const optionsQuets = [
		{value: "25", label: "Поворот не туда"},
		{value: "26", label: "Техасская резня бензопилой"},
		{value: "27", label: "Оно"},
		{value: "28", label: "Пропавшие в лесу"},
		{value: "56", label: "Ночной Порт"},
		{value: "57", label: "Цех №13"},
		{value: "58", label: "Мясник"},
		{value: "59", label: "Бездна"},
	];
	const [selectQuest, setSelectQuest] = useState(
		!questId
			? optionsQuets[0].label
			: optionsQuets.find((option) => Number(option.value) === questId)?.label
	);
	const [score, setScore] = useState(1);
	const [selectQuestId, setSelectQuestId] = useState(
		!questId
			? optionsQuets[0].value
			: optionsQuets.find((option) => Number(option.value) === questId)?.value
	);
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isRed, setIsRed] = useState(false);
	return (
		<Modal
			onSubmit={(e) => {
				e.preventDefault();
				if (isChecked) {
					reviewService.postReviews({
						id: 1,
						author,
						text,
						score,
						date: new Date().toISOString(),
						status: "public",
						questId: 3,
					});
					onOpen(false);
				} else {
					setIsRed(true);
				}
			}}
			textSubmitButton="Отправить"
			textCloseButton="Отменить"
			headertext="Оставить отзыв"
			closeOnOutsideClick
			onClose={() => {
				onOpen(false);
				document.body.classList.remove("disableScroll");
			}}
			isOpen={isOpen}
		>
			<div className={styles.modal__contentWrapp}>
				<p className="textRegular" style={{color: "var(--lightGrey)", marginTop: "10px"}}>
					{selectQuest}
				</p>
				<div className={styles.rating}>
					<p className="textBold">Рейтинг</p>
					<SkullRating rating={score} setRating={setScore} />
				</div>
				<div className={styles.modal__forms}>
					<div className={styles.modal__forms__selectWrapp}>
						<select
							value={selectQuestId}
							className="textRegular"
							onChange={(e) => {
								setSelectQuest(e.target.options[e.target.selectedIndex].text);
								setSelectQuestId(e.target.value);
							}}
						>
							{optionsQuets.map((option) => (
								<option key={option.value} className="textRegular" value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<div className={styles.modal__forms__row}>
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
					<input
						type="text"
						placeholder="Имя и фамилия"
						value={author}
						onChange={(e) => {
							setAuthor(e.target.value);
						}}
						className={`${styles.modal__forms__input} textRegular`}
					/>
					<textarea
						rows={6}
						onChange={(e) => setText(e.target.value)}
						value={text}
						placeholder="Комментарий"
						className={`${styles.modal__forms__input} textRegular`}
						name="comment"
						required
						inputMode="text"
					></textarea>
					<div className={styles.modal__forms__checkBox}>
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
		</Modal>
	);
};
