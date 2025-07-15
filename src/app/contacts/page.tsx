import Image from "next/image";
import styles from "./contacts.module.scss";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Контакты - Погружени",
	description:
		"Квесты в Рязани. Погружение - это уникальная организация, специализирующаяся на проведении захватывающих квестов-перформансов.",
};

export default function Page() {
	const contactLinks = [
		{
			icon: "/map.c372de5c.svg",
			alt: "Адрес",
			className: styles.contact__link,
			content: (
				<a
					className="link"
					href="https://yandex.ru/maps/11/ryazan/?ll=39.756227%2C54.620939&amp;mode=routes&amp;rtext=~54.620577%2C39.756296&amp;rtt=pd&amp;ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D93980634651&amp;z=17.03"
					target="_blank"
					itemProp="address"
				>
					Театральная площадь, 4
				</a>
			),
		},
		{
			icon: "/phone.f33ca72e.svg",
			alt: "Телефон",
			className: styles.contact__link,
			content: (
				<>
					<a itemProp="telephone" className="link" href="tel:+79209705853" target="_blank">
						+7 (920) 970-58-53
					</a>
					<a href="http://wa.me/+79209705853" target="_blank">
						<svg
							width="18px"
							height="18px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
								fill="#ffffff"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
					<a href="https://t.me/kvestrzn" target="_blank">
						<svg
							width="18px"
							height="18px"
							fill="#ffffff"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"></path>
						</svg>
					</a>
				</>
			),
		},
		{
			icon: "/clock.e14f8d28.svg",
			alt: "Время работы",
			className: styles.contact__link,
			content: <p className="link">ежедневно, 10:00–00:00</p>,
		},
		{
			icon: "/vk.50b0da9f.svg",
			alt: "VK",
			className: styles.contact__link,
			content: (
				<a className="link" href="https://vk.com/rznkvest" target="_blank">
					vk.com/rznkvest
				</a>
			),
		},
	];
	return (
		<section className={styles.contact}>
			<div className="container">
				<div className="" itemScope itemType="http://schema.org/Organization">
					<h1 className="h1" style={{marginBottom: "70px"}}>
						Контакты
					</h1>
					<div className={styles.contact__container}>
						<div className={styles.contact__text}>
							<div className={styles.contact__links}>
								{contactLinks.map((link, index) => (
									<div className={link.className} key={index}>
										<Image src={link.icon} width={18} height={18} alt={link.alt} />
										{link.content}
									</div>
								))}
							</div>
							<div className={styles.contact__review}>
								<iframe
									style={{border: "none"}}
									src="https://yandex.ru/sprav/widget/rating-badge/93980634651?type=rating"
								></iframe>
							</div>
							<a className={styles.contact_mirKvestov}>
								<img
									src="https://razan.mir-kvestov.ru/widgets/9010/img"
									width="210"
									alt="Отзывы на Квест в реальности Поворот не туда (Погружение)"
									title="Отзывы на Квест в реальности Поворот не туда (Погружение)"
								/>
							</a>
						</div>
						<div className={styles.contact__map}>
							<iframe
								src="https://yandex.ru/map-widget/v1/?ll=39.757303%2C54.620702&amp;mode=poi&amp;poi%5Bpoint%5D=39.756296%2C54.620577&amp;poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D93980634651&amp;z=18.38"
								width="560"
								height="400"
								style={{border: "none"}}
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
