import formidable from "formidable";
import { Request,Response } from "express";

const uploadDir = "uploads";

export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 1024 ** 2 * 200, // the default limit is 1KB * 200
	filter: (part) => part.mimetype?.startsWith("image/") || false,
});

export function formidable_promise(req: Request) {
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if ({ err }.err !== null) {
				reject({ err });
			}
			if (
				JSON.stringify({ files }.files) !== "{}" &&
				JSON.stringify({ fields }.fields) !== "{}"
			) {
				// formidable exist file && formidable exist fields
				resolve({ fields, files });
			} else if (JSON.stringify({ fields }.fields) !== "{}") {
				// formidable does not exist file but exist fields
				resolve({ fields });
			} else if (JSON.stringify({ files }.files) !== "{}") {
				// formidable does not exist fields but exist file
				resolve({ files });
			}
		});
	});
}
type formResult = {
	fields?: any;
	files?: any;
};
export function transfer_formidable_into_obj(form_result: formResult) {
	let result = {};

	if (form_result.hasOwnProperty("fields")) {
		result = Object.assign(result, form_result.fields);
	}
	if (form_result.hasOwnProperty("files")) {
		let obj = {};
		let files = form_result.files;
		for (let k in files) {
			// console.log(files[k].newFilename)
			// console.log(k)
			Object.assign(obj, { [`${k}`]: files[k].newFilename });
		}
		result = Object.assign(result, obj);
	}
	return result;
}
