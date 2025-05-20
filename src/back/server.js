const express = require("express");
const cors = require("cors");
const axios = require("axios");
const apiKey = "AIzaSyCZCK3qK7tgbDsr9-xWhba6-xhJZDwpuSc";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
const arr = [];

app.get("/home", (req, res) => {
  res.status(200).json(arr);
});
app.post("/", async (req, res) => {
  const { url, category } = req.body;

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

    arr.push({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      likes: video.statistics.likeCount,
      views: video.statistics.viewCount,
      link: url,
      category: category,
    });
  } catch (error) {
    console.error("cannot fetch data", error);
    res.status(500).send("Failed to fetch video data");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
