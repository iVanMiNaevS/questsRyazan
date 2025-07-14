import {IReview} from "@/types/reviews.interface";
import React, {useEffect, useId, useState} from "react";
import styles from "./reviewSection.module.scss";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {ReviewCard} from "../reviewCard/reviewCard";
import {reviewService} from "@/services/reviewService";
import {AlertUi} from "../alertUi/alertUi";

export const ReviewMobileSlider = () => {
	const [reviews, setReviews] = useState<IReview[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const id = useId();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const {data, ok, message} = await reviewService.getReviews(35);
				if (!ok) throw new Error(message);
				setReviews(data?.reviews || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки");
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, []);
	if (loading) return <div className={styles.container}>Загрузка...</div>;
	if (error) return <AlertUi message={error} />;
	return (
		<div className={`swiper-container-${id} ${styles.containerSlider}`}>
			<Swiper
				modules={[Navigation]}
				navigation={{
					nextEl: `.swiper-container-${id} .custom-swiper-button-next`,
					prevEl: `.swiper-container-${id} .custom-swiper-button-prev`,
				}}
				spaceBetween={20}
				slidesPerView={1}
			>
				{reviews.length > 0
					? reviews.map((review, index) => (
							<SwiperSlide key={index + review.date}>
								<ReviewCard info={review} />
							</SwiperSlide>
					  ))
					: "Нет отзывов"}
			</Swiper>

			<div className={styles.slider__nav}>
				<button className={`${styles.navButton} ${styles.prev} custom-swiper-button-prev`}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="1">
							<path
								d="M14 7L9 12L14 17"
								strokeWidth="1.33333"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</g>
					</svg>
				</button>
				<button className={`${styles.navButton} ${styles.next} custom-swiper-button-next`}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="1">
							<path
								d="M14 7L9 12L14 17"
								strokeWidth="1.33333"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</g>
					</svg>
				</button>
			</div>
		</div>
	);
};
