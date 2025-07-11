import {IQuest} from "./quests.interface";

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
	questId: number;
	status: "public";
	// "Quest.Id": number;
	// "Quest.Title": string;
	// "Quest.Description": string;
	// "Quest.Slug": string;
	// "Quest.Banner": string;
	// "Quest.Rating": number;
}
