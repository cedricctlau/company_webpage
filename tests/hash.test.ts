import { checkPassword, hashPassword } from "../src/helpers/hash";

const password = "aSpecificPassword@ff20!";
const hashFromExtSource =
	"$2y$10$AEZ6GaMCWKrAnSrR5l6sTeaykXdn7dfu.dvs9plgqwChfem3WHZh2";
const wrongPassword = "anotherPassword@^3^@";

test("having the same password 10 times gives 10 different hashes", async () => {
	let hashedPWs: string[] = [];
	let checkDifferentHashes = true;
	for (let i = 0; i < 10; i++) {
		let hash = await hashPassword(password);
		hashedPWs.forEach(async (hashedPW) => {
			checkDifferentHashes = checkDifferentHashes && hash !== hashedPW;
			hashedPWs.push(hash);
		});
	}
	expect(checkDifferentHashes).toBeTruthy();
});

test("providing a correct password should return true", async () => {
	const check = await checkPassword(password, hashFromExtSource);
	expect(check).toBeTruthy();
});
test("providing a correct password should return false", async () => {
	const check = await checkPassword(wrongPassword, hashFromExtSource);
	expect(check).toBeFalsy();
});
