const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
  res.status(200).json("this works");
});

app.get("/photos", async (request, response) => {
  const subject = request.query.subject;
  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`;
  const res = await axios.get(API);
  //   console.log(res.data.results[0].urls.regular);
  //   response.status(200).json("hello");
  const photos = res.data.results.map((photo) => {
    return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,
    };
  });

  response.status(200).json(photos);
  //   console.log(res.data.results[0].urls);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
