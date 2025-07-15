import {apiUrl, ServiceResponse} from "./apiConfig";
import {IReview, IReviewFormData, IReviewsData} from "@/types/reviews.interface";
import {questsService} from "./questsService";

export const reviewService = {
	getReviews: async (count: number = 6): Promise<ServiceResponse<IReviewsData>> => {
		try {
			if (!process.env.NEXT_PUBLIC_QUEST_API_TOKEN) {
				throw new Error("API token is not configured");
			}

			const response = await fetch(`${apiUrl}/api/Review/getList?count=${count}`, {
				headers: {
					Authorization: process.env.NEXT_PUBLIC_QUEST_API_TOKEN,
				},
				next: {revalidate: 3600},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const review: IReviewsData = await response.json();
			return {data: review, message: "ok", ok: true};
		} catch (error) {
			let errorMessage = "Unknown error occurred";

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === "string") {
				errorMessage = error;
			}

			return {data: undefined, message: errorMessage, ok: false};
		}
	},
	getReviewsById: async (count: number = 6, id: number): Promise<ServiceResponse<IReview[]>> => {
		try {
			if (!process.env.NEXT_PUBLIC_QUEST_API_TOKEN) {
				throw new Error("API token is not configured");
			}

			const response = await fetch(
				`${apiUrl}/api/Review/getListByQuestId?questId=${id}&count=${count}`,
				{
					headers: {
						Authorization: process.env.NEXT_PUBLIC_QUEST_API_TOKEN,
					},
					next: {revalidate: 3600},
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const review: IReview[] = await response.json();
			return {data: review, message: "ok", ok: true};
		} catch (error) {
			let errorMessage = "Unknown error occurred";

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === "string") {
				errorMessage = error;
			}

			return {data: undefined, message: errorMessage, ok: false};
		}
	},
	postReviews: async (data: IReviewFormData) => {
		const {data: questData, ok, message} = await questsService.getQuestBySlug(data.slug);
		try {
			if (questData) {
				const formData = new FormData();
				formData.append("Id", data.id.toString());
				formData.append("Author", data.author);
				formData.append("Score", data.score.toString());
				formData.append("Date", data.date);
				formData.append("Text", data.text);
				formData.append("Status", data.status);
				formData.append("QuestId", questData.id.toString());
				formData.append("Quest.Id", questData.id.toString());
				formData.append("Quest.Title", questData.title);
				formData.append("Quest.Description", questData.about);
				formData.append("Quest.Slug", questData.slug);
				formData.append("Quest.Banner", questData.banner);
				formData.append("Quest.Rating", questData.rating.toString());
				if (!process.env.NEXT_PUBLIC_QUEST_API_TOKEN) {
					throw new Error("API token is not configured");
				}

				const response = await fetch(`${apiUrl}/api/Review/addFromClient`, {
					method: "POST",
					body: formData,
					headers: {
						Authorization: process.env.NEXT_PUBLIC_QUEST_API_TOKEN,
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				return {message: "ok", ok: true};
			} else {
				throw new Error(`HTTP error! status: ${message}`);
			}
		} catch (error) {
			let errorMessage = "Unknown error occurred";

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === "string") {
				errorMessage = error;
			}

			return {message: errorMessage, ok: false};
		}
	},
};
