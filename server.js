// Load module dependencies
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

// Config the app, include middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config DB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

// Load routes resolvers
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");

// Routes
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.all("*", (req, res) =>
  res
    .status(404)
    .send({ message: "You've tried reaching a route that doesn't exist." })
);

app.listen(process.env.PORT || 3000);
