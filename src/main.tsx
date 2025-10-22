import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";

// Envuelvo la app en el Provider para que toda la app tenga acceso al store

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error('No se encontró el elemento con id "root"');
}

createRoot(rootElement).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
