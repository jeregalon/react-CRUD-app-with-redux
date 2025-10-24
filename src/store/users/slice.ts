import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

// Slice para manejar el estado de los usuarios

export type userId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: userId;
}

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Pepe",
		email: "pepe@gmail.com",
		github: "pepito",
	},
	{
		id: "2",
		name: "Laura",
		email: "laura.sanchez@example.com",
		github: "laurasanchez",
	},
	{
		id: "3",
		name: "Miguel",
		email: "miguel89@example.com",
		github: "miguelflame",
	},
	{
		id: "4",
		name: "Ana",
		email: "ana_rios@example.com",
		github: "anarios",
	},
	{
		id: "5",
		name: "Carlos",
		email: "carlos.perez@example.com",
		github: "carlosp",
	},
];

// Esto es una IIFE (Immediately Invoked Function Expression)
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users as UserWithId[];
	}
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			// Redux Toolkit usa Immer.js por debajo, lo que permite mutar el estado directamente
			state.push({ id, ...action.payload });
			// return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<userId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
				// return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
