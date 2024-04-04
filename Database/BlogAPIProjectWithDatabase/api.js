import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import axios from "axios";

dotenv.config();

const app = express();
const port = 4000;
const host = "0.0.0.0";
const API_URL = `http://${host}:4000`;

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
db.connect();

async function getAllPosts() {
  try {
    const result = await db.query("SELECT * FROM posts");
    const posts = result.rows;
    return posts;
  } catch (error) {
    console.log(error.message);
  }
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>")
});

// GET all posts
app.get("/posts", async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE id=$1", [
      req.params.id,
    ]);
    const post = result.rows[0];
    res.json(post);
  } catch (error) {
    res.status(404).send("Post cannot be found!");
  }
});

// POST a new post
app.post("/posts", async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };
    const result = await db.query(
      "INSERT INTO posts(title, content, author, date) VALUES ($1, $2, $3, $4)",
      [post.title, post.content, post.author, post.date]
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", async (req, res) => {
  try {
    let post = await axios.get(`${API_URL}/posts/${req.params.id}`);

    if (req.body.title) {
      await db.query("UPDATE posts SET title = $1 WHERE id = $2", [
        req.body.title,
        req.params.id,
      ]);
    }
    if (req.body.content) {
      await db.query("UPDATE posts SET content = $1 WHERE id = $2", [
        req.body.content,
        req.params.id,
      ]);
    }
    if (req.body.author) {
      await db.query("UPDATE posts SET author = $1 WHERE id = $2", [
        req.body.author,
        req.params.id,
      ]);
    }

    post = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.status(200).json(post.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM posts WHERE id = $1",
    [req.params.id]
    )
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(404).send("Post not found!");
  }
});

app.listen(port, host, () => {
  console.log(`API is running at http://${host}:${port}`);
});
