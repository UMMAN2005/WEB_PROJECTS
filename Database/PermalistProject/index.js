import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT id, title FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Permalist",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    await db.query("INSERT INTO items (title) VALUES ($1) ", [item])
    res.redirect("/");
  } catch (error) {
    console.log(error)
  }
});

app.post("/edit", async (req, res) => {
  try {
    const updatedItemId = req.body.updatedItemId;
    const updatedItemTitle = req.body.updatedItemTitle;
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedItemTitle, updatedItemId]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  try {
    const deleteItemId = req.body.deleteItemId;
    await db.query("DELETE FROM items WHERE id = $1", [deleteItemId]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
