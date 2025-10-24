import { Toaster } from "sonner";
import { CreateNewUser } from "./components/CreateNewUser";
import ListOfUsers from "./components/ListOfUsers";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
