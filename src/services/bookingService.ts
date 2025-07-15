import {ISlot} from "@/types/quests.interface";
import {apiUrl, ServiceResponse} from "./apiConfig";

export const bookingService = {
	getSlots: async (questId: number, date: string): Promise<ServiceResponse<ISlot[]>> => {
		try {
			if (!process.env.NEXT_PUBLIC_QUEST_API_TOKEN) {
				throw new Error("API token is not configured");
			}

			const response = await fetch(
				`${apiUrl}/api/Slot/getSlotsByDate?questId=${questId}&date=${date}`,
				{
					headers: {
						Authorization: process.env.NEXT_PUBLIC_QUEST_API_TOKEN,
					},
					next: {revalidate: 600},
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const slots: ISlot[] = await response.json();
			return {data: slots, message: "ok", ok: true};
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
