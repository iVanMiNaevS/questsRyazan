export const apiUrl = "https://test.outouch.ru";

export type ServiceResponse<T> = {
	data: T | undefined;
	message: string;
	ok: boolean;
};
