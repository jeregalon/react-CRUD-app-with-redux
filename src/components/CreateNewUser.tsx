import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import type React from "react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();

	// Estado local para manejar errores del formulario
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mt-4">
			<Title>Crear Nuevo Usuario</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Nombre" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="Github" />

				{/*Button debe ir dentro de Form*/}
				<div>
					<Button type="submit" className="mt-4 cursor-pointer">
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge color="green">Guardado correctamente</Badge>
						)}
						{result === "ko" && (
							<Badge color="red">Error en el formulario</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
