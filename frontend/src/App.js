import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [translatedText, setTranslatedText] = useState("");

  const translate = async () => {
    try {
      const englishText = document.getElementById("englishText").value;
      if (englishText === "") {
        window.alert("Please enter something , don't keep it empty");
        return;
      }
      const response = await axios.post("https://twf-task.onrender.com/translate", {
        text: englishText,
      });
      const translated = response.data.translation;
      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="main">
      <div className="heading">English to French Translator</div>
      <div className="form">
        <input
          required
          type="text"
          placeholder="Enter English Text Here..."
          id="englishText"
        />
        <br />
        <button onClick={translate}>Translate</button>
        <br />
        <textarea
          rows="4"
          cols="50"
          id="frenchText"
          value={translatedText}
          readOnly
        />
      </div>
    </div>
  );
};

export default App;
