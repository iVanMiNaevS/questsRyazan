import Image from "next/image";
import styles from "./rating.module.scss";
import {questsService} from "@/services/questsService";
import {QuestCardRating} from "@/components/questCardRating/questCardRating";
import {AlertUi} from "@/components/alertUi/alertUi";

export default async function Page() {
	const {data: quests, ok: okQuests, message: messageQuests} = await questsService.getQuests();
	return (
		<div>
			{!okQuests && <AlertUi message={messageQuests} />}
			<section className={styles.hero}>
				<div className={`container`}>
					<div className={styles.hero__textWrapp}>
						<h1 className="h1">Народный рейтинг</h1>
						<p className="textRegular">
							Составление рейтинга квестов — это процесс, который учитывает множество факторов,
							чтобы объективно оценить качество и популярность каждого квеста. Основой для рейтинга
							часто становятся отзывы участников. Они делятся своими впечатлениями о сюжете,
							декорациях, актёрской игре (если она присутствует), уровне сложности и общем
							погружении в атмосферу. Каждая из этих категорий может быть оценена по шкале,
							например, от 1 до 5, чтобы сформировать средний балл.
						</p>
					</div>
				</div>
			</section>
			<section className={styles.quests}>
				<div className="container">
					<h2 className="h2">Рейтинг квестов</h2>
					<div className="quests__wrapp">
						{quests
							? quests.quests.map((quest) => {
									return <QuestCardRating key={quest.id} info={quest} />;
							  })
							: "Квестов пока что нет"}
					</div>
				</div>
			</section>
		</div>
	);
}
