"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image, {StaticImageData} from "next/image";
import styles from "./swiperUi.module.scss";

type props = {
	images: (StaticImageData | string)[];
};

export default function SwiperUi({images}: props) {
	return (
		<div className={styles.container}>
			<Swiper
				modules={[Navigation]}
				navigation={{
					nextEl: ".custom-swiper-button-next",
					prevEl: ".custom-swiper-button-prev",
				}}
				spaceBetween={20}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					600: {
						slidesPerView: 2,
					},
					1000: {
						slidesPerView: 3,
					},
				}}
			>
				{images.map((src, index) => (
					<SwiperSlide key={index}>
						<Image
							width={1080}
							height={810}
							src={src}
							alt={`Slide ${index + 1}`}
							className="w-full h-[300px] object-cover rounded-xl"
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<button
				className={`custom-swiper-button-prev ${styles.navButton} ${styles.prev}`}
				aria-label="Назад"
			>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
							fill="#fe3607"
						></path>{" "}
					</g>
				</svg>
			</button>

			<button
				className={`custom-swiper-button-next ${styles.navButton} ${styles.next}`}
				aria-label="Вперёд"
			>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
							fill="#fe3607"
						></path>{" "}
					</g>
				</svg>
			</button>
		</div>
	);
}
