import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { UserWithId } from "./users/slice";
import usersReducer, { rollbackUser } from "./users/slice";

// Middleware para persistencia de estado
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();
		next(action);

		// TODO: Hacer esto con los demás métodos
		if (type === "users/deleteUserById") {
			const userToRemove = previousState.users.find(
				(user: UserWithId) => user.id === payload,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "DELETE",
			})
				// Visualmente, el usuario ve que se elimina, antes de que aparezca eliminado en la base de datos (optimistic UI)
				.then((res) => {
					if (res.ok) {
						toast.success(`Usuario ${payload} eliminado correctamente`);
					}
					throw new Error("Error al eliminar el usuario");
				})
				.catch((err) => {
					toast.error(`Error al eliminar el usuario ${payload}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
				});
		}

		console.log(store.getState());
	};

// Sitio donde se guarda el estado global de la aplicación
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(persistanceLocalStorageMiddleware)
			.concat(syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
