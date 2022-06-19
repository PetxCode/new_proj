const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;
const { google } = require("googleapis");

const CLIENT_ID =
	"82971075879-ggobptvsrs7jdbvq2nnimko81u7kd14d.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const CLIENT_REDIRECT = "https://developers.google.com/oauthplayground";
const CLIENT_TOKEN =
	"1//04YhL3w7ECXsFCgYIARAAGAQSNwF-L9IrikJTxQiAXsYXRbvh_2NPk8OjpOMls7RvfredWA8oAhWcNY2TB3lrc6moOn2ybiY_SFo";

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	CLIENT_REDIRECT
);

const sendMail = async () => {
	try {
		oAuth2Client.setCredentials({ refresh_token: CLIENT_TOKEN });
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "codelaboti@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refresh_token: CLIENT_TOKEN,
				accessToken:
					"ya29.a0ARrdaM-UoA8a9rP0V2A4XRqw0pQXHKIfw86M7lZa5W_dRGxk7yONdkWZQZ0Y2tuswoaD_FER2zx4j7-vECQNzcyx8N81PLKilGeIMi3is-KXbuU62lY2mIgwPe1REZO0yeLuvCfvM3YG8fzleoIyAfq9ZNGB",
			},
		});

		const mailOptions = {
			from: `A Friendly Message 🍾 <codelaboti@gmail.com>`,
			to: "brighterdayscodelab@gmail.com",
			subject: "Just a check",
			text: "Are we ready for an Awesome experence????",
			html: `<h2> This is just a simple test <a href="https://google.com" >Visit here!</a> </h2>`,
		};

		const result = transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "This is the Home Page, let's do this!!!!" });
});

app.get("/send", (req, res) => {
	sendMail()
		.then((result) => console.log("Email has been sent", result))
		.catch((err) => console.log(err.message));
	res.json({ message: "This is the Home Page, let's do this!!!!" });
});

app.listen(port, () => {
	console.log("server is up");
});

module.exports = app;
