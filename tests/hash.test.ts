import { checkPassword, hashPassword } from "../src/helpers/hash";

const correctPW = {
	original: "aSpecificPassword@ff20!",
	hashedInDB: "$2y$10$AEZ6GaMCWKrAnSrR5l6sTeaykXdn7dfu.dvs9plgqwChfem3WHZh2",
	hashedForTesting:
		"$2y$10$K9NUFcZLzRY4nsCB/uxooe0uo8v7R6Bi95pYs21gu6oruy2D7lE4O",
};
const wrongPassword = "anotherPassword@^3^@";

test("having the same password 10 times gives 10 different hashes", async () => {
	let hashedPWs: string[] = [];
	let checkDifferentHashes = true;
	for (let i = 0; i < 10; i++) {
		let hash = await hashPassword(correctPW.original);
		hashedPWs.forEach(async (hashedPW) => {
			checkDifferentHashes = checkDifferentHashes && hash !== hashedPW;
			hashedPWs.push(hash);
		});
	}
	expect(checkDifferentHashes).toBeTruthy();
});

test("providing a correct password should return true", async () => {
	const check = await checkPassword(correctPW.original, correctPW.hashedInDB);
	expect(check).toBeTruthy();
});
test("providing a correct password should return false", async () => {
	const check = await checkPassword(wrongPassword, correctPW.hashedInDB);
	expect(check).toBeFalsy();
});
