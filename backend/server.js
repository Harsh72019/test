const express = require("express");
const bodyParser = require("body-parser");
const { translate } = require("@vitalets/google-translate-api");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text to translate is missing." });
    }

    const translation = await translate(text, { to: "fr" }); //Converting text to french
    const translatedText = translation.text; //Extracting the converted text

    res.json({
      success: true,
      original: text,
      translation: translatedText,
    }); //Sending the text in json format
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({
      success: false,
      message: `Translation failed due to ${error.message}`,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Author : Harsh Bali
// Date Modified : 21-02-2024
// Since it is small code i didn't created seperate folders like controller , routes and app.js
