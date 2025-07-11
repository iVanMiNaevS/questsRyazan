export interface IQuestData {
	quests: IQuest[];
	page: number;
	canLoad: boolean;
}

export interface IQuest {
	id: number;
	title: string;
	description: string;
	slug: string;
	banner: string;
	rating: number;
}
