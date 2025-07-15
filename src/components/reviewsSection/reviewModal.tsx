"use client";
import React, {Dispatch, SetStateAction, useEffect, useId, useState} from "react";
import {Modal} from "../Modal/modal";

import styles from "./reviewSection.module.scss";
import {SkullRating} from "./skullRating";
import {reviewService} from "@/services/reviewService";
import {IQuestFull} from "@/types/quests.interface";
import {questsService} from "@/services/questsService";
import {generateRandomId} from "@/utils/generateRandomId";

type props = {
	onOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	quest?: IQuestFull;
};

export const ReviewModal: React.FC<props> = ({onOpen, isOpen, quest}) => {
	const [optionsQuets, setOptionsQuets] = useState<{value: string; label: string}[]>([]);
	const [selectQuest, setSelectQuest] = useState(quest && quest.title);
	const [score, setScore] = useState(1);
	const [selectQuestSlug, setSelectQuestSlug] = useState(quest && quest.slug);
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isRed, setIsRed] = useState(false);
	console.log(quest);
	useEffect(() => {
		questsService.getQuests().then((res) => {
			if (res.data) {
				setOptionsQuets(
					res.data.quests.map((quest) => {
						return {value: quest.slug, label: quest.title};
					})
				);
				if (!quest) {
					setSelectQuest(res.data.quests[0].title);
					setSelectQuestSlug(res.data.quests[0].slug);
				}
			}
		});
	}, []);

	return (
		<Modal
			onSubmit={() => {
				if (isChecked) {
					if (selectQuestSlug)
						reviewService.postReviews({
							id: generateRandomId(),
							author,
							text,
							score,
							date: new Date().toISOString(),
							status: "public",
							slug: selectQuestSlug,
						});
					onOpen(false);
					setIsRed(false);
					setIsChecked(false);
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
							value={selectQuestSlug}
							className="textRegular"
							onChange={(e) => {
								setSelectQuest(e.target.options[e.target.selectedIndex].text);
								setSelectQuestSlug(e.target.value);
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
