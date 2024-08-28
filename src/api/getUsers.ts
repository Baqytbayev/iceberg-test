import {instances} from "./instances";


interface Page {
	limit: number;
	page: number
}

export const GetUsers = async ({ limit , page}: Page) => {
	try {
		const response = await instances.get('users', {
			params: {
				limit: limit,
				skip: page,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching users by filter:", error);
		throw error;
	}
}