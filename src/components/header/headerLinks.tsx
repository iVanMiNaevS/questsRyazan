"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FC} from "react";
interface Props {
	links: {text: string; href: string}[];
}

const HeaderLinks: FC<Props> = ({links}) => {
	const path = usePathname();
	return (
		<>
			{links.map((link) => {
				return (
					<Link
						key={link.href}
						href={link.href}
						className={`link ${path === link.href && "active"}`}
					>
						{link.text}
					</Link>
				);
			})}
		</>
	);
};

export default HeaderLinks;
