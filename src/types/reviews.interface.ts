import {IQuest, IQuestFull} from "./quests.interface";

export interface IReviewsData {
	reviews: IReview[];
	page: number;
	canLoad: boolean;
}

export interface IReview {
	id: number;
	author: string;
	score: number;
	date: string;
	text: string;
	questId: number;
	status: string;
	quest: IQuest;
}

export interface IReviewFormData {
	id: number;
	author: string;
	score: number;
	date: string;
	text: string;
	slug: string;
	status: "public";
}
