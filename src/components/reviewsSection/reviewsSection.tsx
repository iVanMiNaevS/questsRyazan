// components/ReviewsSection.tsx
"use client";

import {useState} from "react";
import {reviewService} from "@/services/reviewService";
import {ReviewCard} from "@/components/reviewCard/reviewCard";
import styles from "./reviewSection.module.scss";
import {IReviewsData} from "@/types/reviews.interface";
import {AlertUi} from "@/components/alertUi/alertUi";
import {ReviewModal} from "./reviewModal";

export const ReviewsSection = ({initialReviews}: {initialReviews: IReviewsData}) => {
	const [reviews, setReviews] = useState(initialReviews.reviews || []);
	const [count, setCount] = useState(6);
	const [hasMore, setHasMore] = useState(initialReviews.reviews);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [ok, setOk] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const loadMoreReviews = async () => {
		setIsLoading(true);
		try {
			const {data, ok, message} = await reviewService.getReviews(count);
			setErrorMessage(message);
			setOk(ok);
			if (ok && data) {
				setReviews((prev) => [...prev, ...(data.reviews || [])]);
				setHasMore(data.reviews);
				setCount((prev) => prev + 6);
			}
		} catch (error) {
			console.error("Error loading more reviews:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className={styles.review}>
			<ReviewModal onOpen={setIsOpen} isOpen={isOpen} />
			{!ok && <AlertUi message={errorMessage} />}
			<div className="container">
				<div className={styles.review__header}>
					<h2 className="h2">Отзывы</h2>
					<button
						className="btn textBold"
						onClick={() => {
							setIsOpen(true);
							document.body.classList.add("disableScroll");
						}}
					>
						Оставить отзыв
					</button>
				</div>

				<div className={styles.review__cardWrapp}>
					{reviews.length > 0
						? reviews.map((review, index) => <ReviewCard info={review} key={review.id + index} />)
						: "Отзывов пока что нет"}
				</div>

				{hasMore && (
					<div className={styles.review__btnCont}>
						<button onClick={loadMoreReviews} className="btn outline textBold" disabled={isLoading}>
							{isLoading ? "Загрузка..." : "Показать ещё..."}
						</button>
					</div>
				)}
			</div>
		</section>
	);
};
