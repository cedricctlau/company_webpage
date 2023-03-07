import formidable from "formidable";

const uploadDir = "uploads";

const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 1024 ** 2 * 200, // the default limit is 1KB * 200
	filter: (part) => part.mimetype?.startsWith("image/") || false,
});

const app = express();

app.post("/contact", (req, res) => {
	form.parse(req, (err, fields, files) => {
		console.log({ err, fields, files });
		res.redirect("/");
	});
});
