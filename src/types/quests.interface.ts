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

export interface IQuestFull {
	id: number;
	banner: string;
	title: string;
	age: string;
	fear: "нестрашный" | "страшный" | "очень страшный";
	difficult: "лёгкий" | "сложный" | "очень сложный";
	minPeoples: number;
	maxPeoples: number;
	duration: number;
	about: string;
	gallery: string[];
	oldGallery: string[];
	speciallies: string[];
	priceString: string;
	ageRestrictions: string;
	slug: string;
	categories: string[];
	address: string;
	addressHref: string;
	rating: number;
	metrId: string;
	isNew: boolean;
	minPrice: number;
	slots: ISlot[];
}

export interface ISlot {
	id: number;
	questId: number;
	status: string;
	date: string;
	tariffs: {
		id: number;
		slotId: number;
		title: string;
		price: number;
	}[];
}
