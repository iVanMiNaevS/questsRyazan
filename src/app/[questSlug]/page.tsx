import {questsService} from "@/services/questsService";
import {Metadata} from "next";
import styles from "./questSlug.module.scss";
import {apiUrl} from "@/services/apiConfig";
import Image from "next/image";
import SwiperUi from "@/components/swiper/swiperUi";
import {ReviewsSection} from "@/components/reviewsSection/reviewsSection";
import {reviewService} from "@/services/reviewService";
import {AlertUi} from "@/components/alertUi/alertUi";

export async function generateMetadata({
	params,
}: {
	params: Promise<{questSlug: string}>;
}): Promise<Metadata> {
	const {questSlug: slug} = await params;
	const {data: quest} = await questsService.getQuestBySlug(slug);

	return {
		title: `${quest?.title} - Погружение` || "Квест - Погружение",
		description: quest?.about || "Описание квеста",
	};
}

export default async function Page({params}: {params: Promise<{questSlug: string}>}) {
	const {questSlug: slug} = await params;
	const {
		data: quest,
		ok: okQuest,
		message: messageQuest,
	} = await questsService.getQuestBySlug(slug);
	const {
		data: reviews,
		ok: okReview,
		message: messageReview,
	} = await reviewService.getReviewsById(6, quest ? quest.id : 1);
	const characteristics = [
		{
			text: "игроков",
			info: `${quest?.minPeoples}-${quest?.maxPeoples}`,
		},
		{
			text: "время",
			info: `От ${quest?.minPrice} руб`,
		},
		{
			text: "цена",
			info: `${quest?.duration} мин`,
		},
	];
	const infoAbout = [
		{title: "Стоимость", text: quest?.priceString},
		{title: "Возрастные ограничения", text: quest?.ageRestrictions},
		{
			title: "Адрес",
			text: (
				<>
					{quest?.address} (
					<a
						target="_blank"
						href="https://yandex.ru/maps/11/ryazan/?ll=39.756227%2C54.620939&amp;mode=routes&amp;rtext=~54.620577%2C39.756296&amp;rtt=pd&amp;ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D93980634651&amp;z=17.03"
					>
						Построить маршрут
					</a>
					)
				</>
			),
		},
	];
	return (
		<>
			{quest ? (
				<>
					{!okQuest || (!okReview && <AlertUi message={messageQuest || messageReview} />)}
					<section
						className={styles.hero}
						style={{
							background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 40%, #080A0C 100%), url(${apiUrl}${quest.banner}) lightgray 50% / cover no-repeat`,
						}}
					>
						<div
							className={`container ${styles.hero__container}`}
							itemScope
							itemType="http://schema.org/Product"
						>
							<div className={styles.hero__infoContainer}>
								<div className={styles.hero__tags__title}>
									<div className={styles.hero__tags}>
										<div className={`${styles.hero__tag} ${styles.hero__age} categories`}>
											{quest.age}
										</div>
										<div
											className={`${styles.hero__tag} ${styles.hero__scary} ${
												quest.fear === "очень страшный" && styles.hero__veryScary
											} categories`}
										>
											<Image
												src="/halfDead.1ffbd541.svg"
												width={18}
												height={18}
												alt={`${quest.fear}`}
											/>
											{quest.fear}
										</div>
										<div
											className={`${styles.hero__tag} ${styles.hero__difficult} ${
												quest.difficult === "очень сложный" && styles.hero__veryDifficult
											} categories`}
										>
											<Image
												src="/pirate.50c21dd4.svg"
												width={18}
												height={18}
												alt={`${quest.difficult}`}
											/>
											{quest.difficult}
										</div>
									</div>
									<h1 className="h1" itemProp="name">
										{quest.title}
									</h1>
								</div>
								<div className={styles.hero__metaList}>
									{characteristics.map((char) => {
										return (
											<div key={char.text} className={styles.hero__meta}>
												<div className={styles.hero__title}>
													<p className="meta">{char.text}</p>
												</div>
												<p className="numbers">{char.info}</p>
											</div>
										);
									})}
								</div>
								<p itemProp="description" className="hero__description textRegular">
									{quest.about}
								</p>
							</div>
							<div className={styles.hero__btnContainer}>
								<a id="bookPnt" href="#booking" className="btn textBold">
									Забронировать
								</a>
								<a className="btn outline textBold" href="#about">
									О квесте
								</a>
							</div>
						</div>
					</section>
					<section className={styles.about}>
						<div className={`${styles.about__content} container`}>
							<div className={styles.about__header}>
								<h2 className="h2">О квесте</h2>
								<p className="textRegular">{quest.about}</p>
							</div>
							<div className={styles.about__slider}>
								<SwiperUi images={quest.gallery.map((img) => `${apiUrl + img}`)} />
							</div>
							<div className={styles.about__infoContainer}>
								<div className={styles.about__block}>
									<h3 className="h4">Специально для вас</h3>
									<ul>
										{quest.speciallies.map((spec) => {
											return (
												<li key={spec} className="textRegular">
													{spec}
												</li>
											);
										})}
									</ul>
								</div>
								<div className={`${styles.about__block} ${styles.about__list}`}>
									{infoAbout.map((info) => {
										return (
											<div
												key={info.title}
												className={`${styles.about__block} ${styles.about__full}`}
											>
												<h3 className="h4">{info.title}</h3>
												<p className="textRegular">{info.text}</p>
											</div>
										);
									})}
								</div>
								<div className={`${styles.about__block} ${styles.about__full}`}>
									<h4 style={{fontWeight: "700"}}>Категории</h4>
									<div className={styles.about__categoryList}>
										{quest.categories.map((category) => {
											return (
												<div key={category} className={styles.about__category}>
													<div className={styles.about__circle}></div>
													<p className="category">{category}</p>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</section>
					{reviews ? <ReviewsSection initialReviews={reviews} /> : "Отзывов пока что нет"}
				</>
			) : (
				<div className="container">
					<p>"Информации пока что нет"</p>
				</div>
			)}
		</>
	);
}
