import "dotenv/config";
import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";

const app = express();
const upload = multer();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt
    });

    const text = response.text;

    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { prompt } = req.body;
    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ];

    if (prompt) {
      contents.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
    });

    const text = response.text;

    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-from-document", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Document is required" });
    }

    const { prompt } = req.body;
    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ];

    if (prompt) {
      contents.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
    });

    const text = response.text;

    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio is required" });
    }

    const { prompt } = req.body;
    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ];

    if (prompt) {
      contents.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
    });

    const text = response.text;

    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
