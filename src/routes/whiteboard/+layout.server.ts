import type { LayoutServerLoad } from "./$types";

// Replace auth-required load with a no-auth default load
export const load: LayoutServerLoad = async () => {
	const weekStatus = {
		week1_2: false,
		week3_4: false,
		week5_6: false,
		week7_8: false,
		week9_10: false,
	};

	return {
		userID: null,
		userName: "test",
		weekStatus,
	};
};
