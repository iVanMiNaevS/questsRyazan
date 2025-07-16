import type {Metadata} from "next";
import {Roboto, Anonymous_Pro} from "next/font/google";
import "./globals.scss";
import Header from "@/components/header/header";
import {Footer} from "@/components/footer/footer";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["cyrillic", "latin"],
});

const anonymousPro = Anonymous_Pro({
	variable: "--font-anonymous",
	weight: ["400", "700"],
	subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
	title: "Погружение - Квесты Рязань",
	description:
		"Квесты в Рязани. Погружение - это уникальная организация, специализирующаяся на проведении захватывающих квестов-перформансов.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${anonymousPro.variable} antialiased`}>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
