const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
  } catch (errer) {
    console.log(error);
  }

  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log(req.body);
  res.send("Success");
});

app.listen(4000, () => {
  console.log("Listening on post 4000");
});
