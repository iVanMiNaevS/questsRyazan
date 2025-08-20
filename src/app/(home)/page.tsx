import { Metadata } from "next";
import styles from "./home.module.scss";
import Link from "next/link";
import SwiperUi from "@/components/swiper/swiperUi";
import { QuestCard } from "@/components/questCard/questCard";
import { questsService } from "@/services/questsService";
import { AlertUi } from "@/components/alertUi/alertUi";
import { reviewService } from "@/services/reviewService";
import { ReviewsSection } from "@/components/reviewsSection/reviewsSection";
import { AppRoutes } from "@/utils/linksToPages";

export const metadata: Metadata = {
	title: "Погружение - Квесты Рязань",
	description:
		"Квесты в Рязани. Погружение - это уникальная организация, специализирующаяся на проведении захватывающих квестов-перформансов.",
};

export default async function Home() {
	const images = [
		`${process.env.NEXT_PUBLIC_APP_URL}/about_1.aab016b4.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_2.d8ec977d.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_3.b10aa9be.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_4.95e1e0ea.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_5.807f67a9.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_6.314ff98e.webp`,
		`${process.env.NEXT_PUBLIC_APP_URL}/about_7.ddfeea40.webp`,
	];
	const {
		data: quests,
		ok: okQuests,
		message: messageQuests,
	} = await questsService.getQuests();
	const {
		data: reviews,
		ok: okReview,
		message: messageReview,
	} = await reviewService.getReviews(6);
	return (
		<>
			{!okQuests ||
				(!okReview && <AlertUi message={messageQuests || messageReview} />)}

			<section className={styles.hero}>
				<div className={styles.hero__video}>
					<video autoPlay loop muted>
						<source src="/videos/hero-bg-video-quest.mp4" type="video/mp4" />
					</video>
					<div className={styles.hero__bg}></div>
				</div>
				<div
					className={`container`}
					style={{ position: "relative", zIndex: "2" }}
				>
					<div className={styles.hero__textWrap}>
						<h1 className="h1">Погружение. Квесты в Рязани</h1>
						<p className="textRegular">
							Погружение - это уникальная организация, специализирующаяся на
							проведении захватывающих квестов-перформансов. Наша задача -
							погрузить участников в увлекательные и эмоциональные приключения,
							полные загадок, тайн и невероятных испытаний.
						</p>
					</div>
					<div className={styles.hero__btns}>
						<a href="#quests" className="btn textBold">
							Выбрать квест
						</a>
						<Link href={AppRoutes.RATING} className="btn outline textBold">
							Рейтинг
						</Link>
					</div>
				</div>
			</section>
			<section className={styles.quests} id="quests">
				<div className="container">
					<h2 className="h2">Квесты</h2>
					<div className={styles.quests__questsWrapp}>
						{quests
							? quests.quests.map((quest) => (
									<QuestCard key={quest.id} info={quest} />
							  ))
							: "Квесты не найдены"}
					</div>
				</div>
			</section>
			<section className={styles.about}>
				<div className="container">
					<h2 className="h2">О нас</h2>
					<p className="textRegular">
						Мы стремимся создать неповторимые сценарии, где каждая деталь
						тщательно продумана. Каждый квест - это настоящая история, в которой
						участники становятся главными героями. Мы создаем особую атмосферу,
						в которой присутствует ощущение реальности и адреналина.
					</p>
					<SwiperUi images={images} />
				</div>
			</section>

			{reviews ? (
				<ReviewsSection initialReviews={reviews.reviews} />
			) : (
				"Отзывов пока что нет"
			)}
		</>
	);
}
