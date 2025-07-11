import {IQuestData} from "@/types/quests.interface";
import {apiUrl, ServiceResponse} from "./apiConfig";

export const questsService = {
	getQuests: async (): Promise<ServiceResponse<IQuestData>> => {
		try {
			if (!process.env.NEXT_PUBLIC_QUEST_API_TOKEN) {
				throw new Error("API token is not configured");
			}

			const response = await fetch(`${apiUrl}/api/Quest/getMinimalList`, {
				headers: {
					Authorization: process.env.NEXT_PUBLIC_QUEST_API_TOKEN,
				},
				next: {revalidate: 3600},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const quests: IQuestData = await response.json();
			return {data: quests, message: "ok", ok: true};
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
};
