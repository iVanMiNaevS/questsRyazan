"use client";
import React, {useEffect, useRef, useState} from "react";
import styles from "./reviewCard.module.scss";
import Image from "next/image";
import {IReview} from "@/types/reviews.interface";
import {formatDateFromISO} from "@/utils/converDateFromIso";
type props = {
	info: IReview;
};
export const ReviewCard = ({info}: props) => {
	const [isClamped, setIsClamped] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const textRef = useRef<HTMLParagraphElement>(null);

	// Проверяем, обрезан ли текст
	useEffect(() => {
		const checkOverflow = () => {
			if (textRef.current) {
				const hasOverflow = textRef.current.scrollHeight > textRef.current.clientHeight;
				setIsClamped(hasOverflow);
			}
		};

		checkOverflow();
		window.addEventListener("resize", checkOverflow);

		return () => window.removeEventListener("resize", checkOverflow);
	}, []);

	const toggleExpand = () => setIsExpanded(!isExpanded);
	return (
		<div className={styles.review}>
			<div>
				<div className={styles.review__header}>
					<p className="textBold">{info.author}</p>
					<div className={styles.review__skulls}>
						{Array(5)
							.fill(0)
							.map((_, index) => {
								return index < info.score ? (
									<svg
										key={index}
										className={styles.skull}
										width="16"
										height="17"
										viewBox="0 0 16 17"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M6.99992 11H8.99992L7.99992 9.00004L6.99992 11ZM5.66659 9.16671C6.03325 9.16671 6.34725 9.03626 6.60859 8.77537C6.86992 8.51449 7.00037 8.20049 6.99992 7.83337C6.99948 7.46626 6.86903 7.15249 6.60859 6.89204C6.34814 6.6316 6.03414 6.50093 5.66659 6.50004C5.29903 6.49915 4.98525 6.62982 4.72525 6.89204C4.46525 7.15426 4.33459 7.46804 4.33325 7.83337C4.33192 8.19871 4.46259 8.51271 4.72525 8.77537C4.98792 9.03804 5.3017 9.16849 5.66659 9.16671ZM10.3333 9.16671C10.6999 9.16671 11.0139 9.03626 11.2753 8.77537C11.5366 8.51449 11.667 8.20049 11.6666 7.83337C11.6661 7.46626 11.5357 7.15249 11.2753 6.89204C11.0148 6.6316 10.7008 6.50093 10.3333 6.50004C9.9657 6.49915 9.65192 6.62982 9.39192 6.89204C9.13192 7.15426 9.00125 7.46804 8.99992 7.83337C8.99859 8.19871 9.12925 8.51271 9.39192 8.77537C9.65459 9.03804 9.96837 9.16849 10.3333 9.16671ZM3.99992 15.1667V12.3334C3.56659 12.1445 3.18592 11.8918 2.85792 11.5754C2.52992 11.2589 2.25214 10.9005 2.02459 10.5C1.79703 10.0996 1.62481 9.67182 1.50792 9.21671C1.39103 8.7616 1.33281 8.30049 1.33325 7.83337C1.33325 6.07782 1.95548 4.63893 3.19992 3.51671C4.44437 2.39449 6.04437 1.83337 7.99992 1.83337C9.95548 1.83337 11.5555 2.39449 12.7999 3.51671C14.0444 4.63893 14.6666 6.07782 14.6666 7.83337C14.6666 8.30004 14.6084 8.76115 14.4919 9.21671C14.3755 9.67226 14.2033 10.1 13.9753 10.5C13.7473 10.9 13.4695 11.2585 13.1419 11.5754C12.8144 11.8923 12.4337 12.1449 11.9999 12.3334V15.1667H9.99992V13.8334H8.66659V15.1667H7.33325V13.8334H5.99992V15.1667H3.99992Z"></path>
									</svg>
								) : (
									<svg
										key={index}
										className={styles.skullWhite}
										width="16"
										height="17"
										viewBox="0 0 16 17"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M6.99992 11H8.99992L7.99992 9.00004L6.99992 11ZM5.66659 9.16671C6.03325 9.16671 6.34725 9.03626 6.60859 8.77537C6.86992 8.51449 7.00037 8.20049 6.99992 7.83337C6.99948 7.46626 6.86903 7.15249 6.60859 6.89204C6.34814 6.6316 6.03414 6.50093 5.66659 6.50004C5.29903 6.49915 4.98525 6.62982 4.72525 6.89204C4.46525 7.15426 4.33459 7.46804 4.33325 7.83337C4.33192 8.19871 4.46259 8.51271 4.72525 8.77537C4.98792 9.03804 5.3017 9.16849 5.66659 9.16671ZM10.3333 9.16671C10.6999 9.16671 11.0139 9.03626 11.2753 8.77537C11.5366 8.51449 11.667 8.20049 11.6666 7.83337C11.6661 7.46626 11.5357 7.15249 11.2753 6.89204C11.0148 6.6316 10.7008 6.50093 10.3333 6.50004C9.9657 6.49915 9.65192 6.62982 9.39192 6.89204C9.13192 7.15426 9.00125 7.46804 8.99992 7.83337C8.99859 8.19871 9.12925 8.51271 9.39192 8.77537C9.65459 9.03804 9.96837 9.16849 10.3333 9.16671ZM3.99992 15.1667V12.3334C3.56659 12.1445 3.18592 11.8918 2.85792 11.5754C2.52992 11.2589 2.25214 10.9005 2.02459 10.5C1.79703 10.0996 1.62481 9.67182 1.50792 9.21671C1.39103 8.7616 1.33281 8.30049 1.33325 7.83337C1.33325 6.07782 1.95548 4.63893 3.19992 3.51671C4.44437 2.39449 6.04437 1.83337 7.99992 1.83337C9.95548 1.83337 11.5555 2.39449 12.7999 3.51671C14.0444 4.63893 14.6666 6.07782 14.6666 7.83337C14.6666 8.30004 14.6084 8.76115 14.4919 9.21671C14.3755 9.67226 14.2033 10.1 13.9753 10.5C13.7473 10.9 13.4695 11.2585 13.1419 11.5754C12.8144 11.8923 12.4337 12.1449 11.9999 12.3334V15.1667H9.99992V13.8334H8.66659V15.1667H7.33325V13.8334H5.99992V15.1667H3.99992Z"></path>
									</svg>
								);
							})}
					</div>
				</div>
				<p
					ref={textRef}
					className={`textRegular ${styles.review__text} ${!isExpanded ? styles.clamped : ""}`}
				>
					{info.text}
				</p>
				{isClamped && (
					<button onClick={toggleExpand} className={styles.toggleButton}>
						{isExpanded ? "скрыть отзыв" : "читать весь отзыв"}
					</button>
				)}
			</div>
			<div className={styles.review__footer}>
				<p className="categories">{formatDateFromISO(info.date)}</p>
				<a
					className="categories"
					href="https://yandex.ru/maps/11/ryazan/?ll=39.756355%2C54.620570&mode=poi&poi%5Bpoint%5D=39.756296%2C54.620577&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D93980634651&tab=reviews&z=21"
					target="_blank"
					rel="noopener noreferrer"
				>
					подробнее на Яндекс
				</a>
			</div>
		</div>
	);
};
