const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "This is the Home Page, let's do this!!!!" });
});

app.listen(port, () => {
	console.log("server is up");
});

module.exports = app;
