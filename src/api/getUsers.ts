import {instances} from "./instances";


interface Page {
	limit: number;
}

export const GetUsers = async ({ limit }: Page) => {
	try {
		const response = await instances.get('users', {
			params: {
				limit: limit,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching products by filter:", error);
		throw error;
	}
}