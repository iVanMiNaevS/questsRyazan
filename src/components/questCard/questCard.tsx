import Image, {StaticImageData} from "next/image";
import React from "react";
import CardImage from "@/../public/banner.webp";
import styles from "./questCard.module.scss";
import Link from "next/link";
import {IQuest} from "@/types/quests.interface";
import {apiUrl} from "@/services/apiConfig";
import {AppRoutes} from "@/utils/linksToPages";

type props = {
	info: IQuest;
};

export const QuestCard = ({info}: props) => {
	return (
		<div className={styles.quest__card}>
			<Image
				width={1080}
				height={0}
				src={`${apiUrl}${info.banner}`}
				alt="s"
				className={styles.quest__card__img}
			/>
			<h3 className="h4">{info.title}</h3>
			<p className="textRegular">{info.description}</p>
			<Link prefetch href={AppRoutes.questBySlug(info.slug)} className="btn textBold">
				Подробнее
			</Link>
		</div>
	);
};
