"use client";

import {useState} from "react";
import {reviewService} from "@/services/reviewService";
import {ReviewCard} from "@/components/reviewCard/reviewCard";
import styles from "./reviewSection.module.scss";
import {IReview, IReviewsData} from "@/types/reviews.interface";
import {AlertUi} from "@/components/alertUi/alertUi";
import {ReviewModal} from "./reviewModal";
import {ReviewMobileSlider} from "./reviewMobileSlider";
import {IQuestFull} from "@/types/quests.interface";

export const ReviewsSection = ({
	initialReviews,
	quest,
}: {
	initialReviews: IReview[];
	quest?: IQuestFull;
}) => {
	const [reviews, setReviews] = useState(initialReviews || []);
	const [count, setCount] = useState(12);
	const [hasMore, setHasMore] = useState(initialReviews);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [ok, setOk] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const loadMoreReviews = async () => {
		setIsLoading(true);
		try {
			if (quest?.id) {
				console.log("by id");
				const {data, ok, message} = await reviewService.getReviewsById(count, quest.id);
				setErrorMessage(message);
				setOk(ok);
				if (ok && data) {
					setReviews(() => [...(data || [])]);
					setHasMore(data);
					setCount((prev) => prev + 6);
				}
			} else {
				const {data, ok, message} = await reviewService.getReviews(count);
				setErrorMessage(message);
				setOk(ok);
				if (ok && data) {
					setReviews(() => [...(data.reviews || [])]);
					setHasMore(data.reviews);
					setCount((prev) => prev + 6);
				}
			}
		} catch (error) {
			console.error("Error loading more reviews:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className={styles.review}>
			<ReviewModal onOpen={setIsOpen} isOpen={isOpen} quest={quest} />
			{!ok && <AlertUi message={errorMessage} />}
			<div className="container">
				<div className={styles.review__header}>
					<h2 className="h2">Отзывы</h2>
					<button
						className="btn textBold"
						onClick={() => {
							setIsOpen(true);
						}}
					>
						Оставить отзыв
					</button>
				</div>

				<div className={styles.review__cardWrapp}>
					{reviews.length > 0
						? reviews.map((review, index) => (
								<ReviewCard info={review} key={review.id + index + review.date} />
						  ))
						: "Отзывов пока что нет"}
				</div>
				<ReviewMobileSlider />
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
