const express = require("express");
const articlesRouter = require("./routes/articles");
const mongoose = require("mongoose");
const app = express();
let Articles = require("./models/articles");

mongoose
  .connect("mongodb://localhost:27017/blog", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log("error", err.message));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/articles", articlesRouter);

app.get("/", async (req, res) => {
  let articles = await Articles.find({});
  console.log(req.headers);
  res.render("index", { articles: articles });
});
app.listen(8000);
