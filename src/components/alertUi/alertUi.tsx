// components/ui/alert.tsx
"use client";

import {ReactNode} from "react";
import styles from "./alertUi.module.scss";

type AlertProps = {
	message: ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	className?: string;
};

export const AlertUi = ({message, dismissible = false, onDismiss, className = ""}: AlertProps) => {
	return (
		<div className={`${styles.alert} ${className}`} role="alert">
			<div className={styles.message}>{message}</div>

			{dismissible && (
				<button onClick={onDismiss} className={styles.closeButton} aria-label="Close alert">
					<span className={styles.closeIcon}>X</span>
				</button>
			)}
		</div>
	);
};
