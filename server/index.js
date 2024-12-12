import express from "express";

import { getShortUrl, getUrls, incrementClickCount } from "./database";
import { customAlphabet } from "nanoid";
import template from "./template";

const app = express();

app.use(express.json());
app.use(cors());

const generateShortUrl = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  5
);

app.get("/urls", async (req, res) => {
  try {
    const urls = await getUrls();
    res.send(urls);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addUrl", async (req, res) => {
  const { original_url, expiresInMinutes } = req.body;

  if (!original_url || !isUrl(original_url)) {
    return res.status(400).json({ error: "Please provide a valid URL" });
  }
  if (!expiresInMinutes) {
    return res.status(400).json({ error: "Please provide an expiration time" });
  }

  try {
    const shortCode = generateShortUrl();
    const expiresAt = expiresInMinutes
      ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
      : null;
    const result = await createUrl(original_url, shortCode, expiresAt);
    res.status(201).send(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const results = await getShortUrl(shortCode);
    if (results.length === 0) {
      return res.status(404).json({ error: "URL not found" });
    }

    const url = results[0];

    if (url.expires_at < new Date()) {
      return res.status(404).send({ template });
    }
    await incrementClickCount(url.id);

    res.redirect(url.original_url);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteUrl/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUrl(id);

    const urls = await getUrls();
    io.emit("urlsUpdated", urls);

    res.status(200).send(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
