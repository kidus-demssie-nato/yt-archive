const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const pool = require("./db.js");
const apiKey = process.env.API_KEY;
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
const arr = [];

app.get("/home", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM links ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log("cant fetch links", err);
    res.status(500).JSON("error fetching");
  }
});
app.post("/", async (req, res) => {
  const { url, category } = await req.body;

  const lar = arr.some((p) => {
    return p.link === url;
  });

  if (!url) {
    return res.status(404).send("please enter a link");
  }

  if (lar) {
    return res.status(409).send("video already exist");
  }

  const getvideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      } else {
        return parsedUrl.searchParams.get("v");
      }
    } catch {
      return null;
    }
  };
  const videoId = getvideoId(url);
  if (!videoId) {
    return res.status(400).send("Invalid or unsupported YouTube URL");
  }

  if (!videoId) {
    return res.status(404).send("video not found");
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoId,
          key: apiKey,
        },
      }
    );
    const video = response.data.items[0];

    const insert = await pool.query(
      `insert into links(title, thumbnail, likes, views, link, categories)
  values($1, $2, $3, $4, $5, $6)
  returning *`,
      [
        video.snippet.title,
        video.snippet.thumbnails.high.url,
        video.statistics.likeCount,
        video.statistics.viewCount,
        url,
        category,
      ]
    );

    res.json(insert.rows[0]);
  } catch (error) {
    console.error("cannot fetch data", error);
    res.status(500).JSON("Failed to fetch video data");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
