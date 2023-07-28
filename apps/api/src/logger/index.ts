export function getLogger() {
	return {
		info: (message: string) => {
			console.log(message);
		},

		error: (message: string | Error) => {
			console.error(message);
		},
	};
}
