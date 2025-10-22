import {
	type User,
	addNewUser,
	deleteUserById,
	type userId,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: userId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser };
};
