export interface FormData {
	name: string;
	email: string;
	age: string;
	department: string;
	experience: string;
}

export interface FormErrors {
	name?: string;
	email?: string;
	age?: string;
	department?: string;
	experience?: string;
}

export interface SelectItem {
	label: string;
	value: string;
}

export interface User extends FormData {
	id: string;
	createdAt: string;
}

export type Route = 'home' | 'form' | 'users' | 'edit-user';