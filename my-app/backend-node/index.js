const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Support large base64 images

// POST /api/redesign: Forward to Python backend
app.post("/api/redesign", async (req, res) => {
  try {
    const { image, prompt } = req.body;

    const response = await axios.post("http://localhost:5000/redesign", {
      image,
      prompt,
    });

    res.json({ image: response.data.image });
  } catch (error) {
    console.error("Error forwarding to Python AI backend:", error.message);
    res.status(500).json({ error: "Redesign failed" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Node.js API server running on port ${PORT}`);
});
