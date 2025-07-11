"use client";
import React from "react";
import styles from "./modal.module.scss";

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	closeOnOutsideClick?: boolean;
	className?: string;
	textSubmitButton: string;
	textCloseButton: string;
	headertext: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	isOpen,
	onClose,
	closeOnOutsideClick = true,
	className = "",
	textSubmitButton = "text",
	textCloseButton = "text",
	headertext = "Header",
	onSubmit,
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
			<form onSubmit={onSubmit} className={`${styles.modal} ${className}`}>
				<div className={styles.modal__header}>
					<p className="h3">{headertext}</p>
					<button className={styles.modal__close} onClick={onClose} aria-label="Close modal">
						&times;
					</button>
				</div>
				<div className={styles.modal__content}>{children}</div>
				<div className={styles.modal__footer}>
					<button type="submit" className="btn textBold">
						{textSubmitButton}
					</button>
					<button type="button" onClick={onClose} className="btn outline textBold">
						{textCloseButton}
					</button>
				</div>
			</form>
		</div>
	);
};
