// Load module dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// Config the app, include middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Config DB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

// Load routes resolvers
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");

// Routes
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.all("*", (req, res) =>
  res
    .status(404)
    .send({ message: "You've tried reaching a route that doesn't exist." })
);

app.listen(process.env.PORT || 3000);
