export interface ISlot {
	id: number;
	questId: number;
	status: string;
	date: string;
	tariffs: ITariff[];
}

export interface ITariff {
	id: number;
	slotId: number;
	title: string;
	price: number;
}

export interface IBookingFormData {
	fio: string;
	phone: string;
	email: string;
	price: number;
	comment: string;
	questId: number;
	date: string;
}
