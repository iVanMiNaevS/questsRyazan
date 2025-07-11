import {Metadata} from "next";
import styles from "./home.module.scss";
import Link from "next/link";
import Image from "next/image";
import CardImage from "@/../public/banner.webp";
import SwiperUi from "@/components/swiper/swiperUi";
import {text} from "stream/consumers";
import {ReviewCard} from "@/components/reviewCard/reviewCard";
import {QuestCard} from "@/components/questCard/questCard";
import {questsService} from "@/services/questsService";

export const metadata: Metadata = {
	title: "Погружение - Квесты Рязань",
	description:
		"Квесты в Рязани. Погружение - это уникальная организация, специализирующаяся на проведении захватывающих квестов-перформансов.",
};

export default async function Home() {
	const images = [CardImage, CardImage, CardImage, CardImage, CardImage, CardImage];
	const reviews = [
		{name: "Иван", reviewCount: 4, text: "Отличный квест, погружение ПОЛНОЕ🔥", date: "26.03.2025"},
		{
			name: "Иван",
			reviewCount: 4,
			text: "все понравилось! было интересно! вообще не страшно и хорошо провели время! спасибо за впечатления!",
			date: "26.03.2025",
		},
		{
			name: "Иван",
			reviewCount: 4,
			text: "Очень красивые локации, актеры и музыкальное сопровождение ещё круче!",
			date: "26.03.2025",
		},
		{
			name: "Иван",
			reviewCount: 4,
			text: "Безумно страшно, но так интересно . мы были на уровне хард и это просто бомба, такой экстрим. За игру меня 2 раза поднимали на плечо и тащили, вырезали аппендицит, били. Это вообще пушка. Приду еще ни один раз",
			date: "26.03.2025",
		},
	];
	const {data: quests} = await questsService.getQuests();
	return (
		<>
			<section className={styles.hero}>
				<div className={styles.hero__video}>
					<video autoPlay loop muted>
						<source src="/videos/hero-bg-video-quest.mp4" type="video/mp4" />
					</video>
					<div className={styles.hero__bg}></div>
				</div>
				<div className="container" style={{position: "relative", zIndex: "2"}}>
					<div className={styles.hero__textWrap}>
						<h1 className="h1">Погружение. Квесты в &nbsp;Рязани</h1>
						<p className="textRegular">
							Погружение - это уникальная организация, специализирующаяся на проведении
							захватывающих квестов-перформансов. Наша задача - погрузить участников в увлекательные
							и эмоциональные приключения, полные загадок, тайн и невероятных испытаний.
						</p>
					</div>
					<div className={styles.hero__btns}>
						<a href="#quests" className="btn textBold">
							Выбрать квест
						</a>
						<Link href={"/rating"} className="btn outline textBold">
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
							? quests.quests.map((quest) => <QuestCard key={quest.id} info={quest} />)
							: "Квесты не найдены"}
					</div>
				</div>
			</section>
			<section className={styles.about}>
				<div className="container">
					<h2 className="h2">О нас</h2>
					<p className="textRegular">
						Мы стремимся создать неповторимые сценарии, где каждая деталь тщательно продумана.
						Каждый квест - это настоящая история, в которой участники становятся главными героями.
						Мы создаем особую атмосферу, в которой присутствует ощущение реальности и адреналина.
					</p>
					<SwiperUi images={images} />
				</div>
			</section>
			<section className={styles.review}>
				<div className="container">
					<div className={styles.review__header}>
						<h2 className="h2">Отзывы</h2>
						<button className="btn textBold">Оставить отзыв</button>
					</div>
					<div className={styles.review__cardWrapp}>
						{reviews.map((review, index) => (
							<ReviewCard info={review} key={index} />
						))}
					</div>
					<div className={styles.review__btnCont}>
						<button className="btn outline textBold">Показать ещё...</button>
					</div>
				</div>
			</section>
		</>
	);
}
