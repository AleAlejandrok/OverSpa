interface ErrorParams {
	status: number;
}

export function Error (params: ErrorParams) {
	return (<h1>{params.status}</h1>)
}