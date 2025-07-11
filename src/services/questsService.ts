import {IQuestData} from "@/types/quests.interface";
import {apiUrl} from "./apiUrl";

export const questsService = {
	getQuests: async () => {
		try {
			const response = await fetch(`${apiUrl}/api/Quest/getMinimalList`, {
				headers: {
					Authorization:
						"a4e27aabab1a1564292e92d1761f61b2bfc13dd1b65cd1066879272c1d1b3aa8843f959ca5d3abfdb4a1919fcf9d0673466e7645b50a4d00418f0dd5a22c2ea9",
				},
			});
			const quests: IQuestData = await response.json();
			return {data: quests, message: "ok"};
		} catch (error) {
			return {data: undefined, message: error};
		}
	},
};
