import React, {useId} from "react";
import styles from "./swiperUi.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper/modules";
import Image, {StaticImageData} from "next/image";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	closeOnOutsideClick?: boolean;
	images: (string | StaticImageData)[];
	initialSlide?: number;
}

export const SwiperModal: React.FC<ModalProps> = ({
	images,
	isOpen,
	onClose,
	closeOnOutsideClick = true,
	initialSlide,
}) => {
	if (!isOpen) return null;

	const handleOutsideClick = (e: React.MouseEvent) => {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			onClose();
		}
	};
	return (
		<div
			className={styles.modal__container}
			onClick={handleOutsideClick}
			role="dialog"
			aria-modal="true"
		>
			<Swiper
				modules={[Navigation]}
				navigation={{
					nextEl: `.${styles.swiperButtonNext}`,
					prevEl: `.${styles.swiperButtonPrev}`,
				}}
				spaceBetween={20}
				slidesPerView={1}
				initialSlide={initialSlide}
				loop
			>
				{images.map((src, index) => (
					<SwiperSlide key={index} className={styles.customSlide}>
						<Image width={2560} height={0} src={src} alt={`Slide ${index + 1}`} />
					</SwiperSlide>
				))}
				<div className={styles.swiperButtonPrev}>
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
				</div>
				<div className={styles.swiperButtonNext}>
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
				</div>
			</Swiper>
		</div>
	);
};
