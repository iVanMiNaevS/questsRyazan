"use client";
import React, {useEffect, useState} from "react";
import styles from "./questSlug.module.scss";
import DateSlider from "./dateSlider";
import {Slots} from "./slots";
import {IQuestFull, ISlot} from "@/types/quests.interface";
import {bookingService} from "@/services/bookingService";
import {AlertUi} from "@/components/alertUi/alertUi";

export const BookingForm = ({quest}: {quest: IQuestFull}) => {
	const [slots, setSlots] = useState<ISlot[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [ok, setOk] = useState(true);

	async function loadSlots() {
		setIsLoading(true);
		try {
			const {data, ok, message} = await bookingService.getSlots(quest.id, selectedDate);
			setErrorMessage(message);
			setOk(ok);
			if (ok && data) {
				setSlots(data);
			}
		} catch (error) {
			console.error("Error loading more reviews:", error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		loadSlots();
	}, [selectedDate]);

	return (
		<div className={styles.booking__formContainer}>
			{!ok && <AlertUi message={errorMessage} />}
			<div className={styles.booking__dateContainer}>
				<p className="textBold">Выберите дату</p>
				<DateSlider selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
			</div>
			<div className={styles.booking__timeContainer}>
				<p className={`${styles.bookingSection__title} textBold`}>
					Выберите время <span className="textRegular">сеанс 60 минут</span>
				</p>
				{!isLoading ? (
					<Slots slots={slots} questTitle={quest.title} />
				) : (
					<p style={{textAlign: "center"}}>Загрузка...</p>
				)}
			</div>
		</div>
	);
};
