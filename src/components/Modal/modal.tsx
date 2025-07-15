"use client";
import React from "react";
import styles from "./modal.module.scss";

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	closeOnOutsideClick?: boolean;
	className?: string;
	textSubmitButton?: string;
	textCloseButton?: string;
	headertext: string;
	onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	isOpen,
	onClose,
	closeOnOutsideClick = true,
	className = "",
	textSubmitButton,
	textCloseButton,
	headertext = "Header",
	onSubmit,
}) => {
	if (!isOpen) return null;
	if (isOpen) {
		document.body.classList.add("disableScroll");
	}
	function onCloseInner() {
		onClose();
		document.body.classList.remove("disableScroll");
	}
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			onCloseInner();
		}
	};

	return (
		<div
			className={styles.modal__container}
			onClick={handleOutsideClick}
			role="dialog"
			aria-modal="true"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (onSubmit) {
						onSubmit();
						document.body.classList.remove("disableScroll");
					}
				}}
				className={`${styles.modal} ${className}`}
			>
				<div className={styles.modal__header}>
					<p className="h3">{headertext}</p>
					<button className={styles.modal__close} onClick={onCloseInner} aria-label="Close modal">
						&times;
					</button>
				</div>
				<div className={styles.modal__content}>{children}</div>
				<div className={styles.modal__footer}>
					{textSubmitButton && (
						<button type="submit" className="btn textBold">
							{textSubmitButton}
						</button>
					)}
					{textCloseButton && (
						<button type="button" onClick={onCloseInner} className="btn outline textBold">
							{textCloseButton}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
