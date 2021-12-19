const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// Get all books
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.title != null && req.query.title !== "") {
    searchOptions.title = new RegExp(req.query.title, "i");
  }
  if (req.query.description != null && req.query.description !== "") {
    searchOptions.description = new RegExp(req.query.description, "i");
  }
  if (req.query.author != null && req.query.author !== "") {
    searchOptions.author = req.query.author;
  }
  try {
    const books = await Book.find(searchOptions).populate("author").exec();
    res.status(200).send({ data: books });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while obtaining all books.",
    });
  }
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  let bookID = req.params.id;

  try {
    const book = await Book.findById(bookID).populate("author").exec();
    if (book) {
      res.status(200).send({ data: book });
    } else {
      res
        .status(404)
        .send({ message: `Book with ID: ${bookID} does not exist.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while obtaining an book with ID: ${bookID}.`,
    });
  }
});

// Create a new book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  });

  try {
    const newBook = await book.save();
    res.status(201).send({ message: "Book has been created.", data: newBook });
  } catch (err) {
    console.log("ERR '/':", err);
    res.status(500).send({
      message: err.message || "An error occurred while creating a book.",
    });
  }
});

//   Delete a book by ID
router.delete("/:id", async (req, res) => {
  let bookID = req.params.id;

  try {
    let book = await Book.findById(bookID);
    if (book) {
      await book.remove();
      res
        .status(200)
        .send({ message: `Book with ID: ${bookID} has been deleted.` });
    } else {
      res
        .status(404)
        .send({ message: `Book with ID: ${bookID} does not exist.` });
    }
  } catch (err) {
    console.log("ERR '/':", err);
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while deleting an book with ID: ${bookID}.`,
    });
  }
});

//   Update book by ID
router.patch("/:id", async (req, res) => {
  let bookID = req.params.id;

  try {
    let book = await Book.findById(bookID);
    console.log("AUTHOR", bookID, book);
    if (book) {
      if (req.body.title) book.title = req.body.title;
      if (req.body.description) book.description = req.body.description;
      if (req.body.author && req.body.author.length)
        book.author = req.body.author;
      await book.save();
      res.status(201).send({ message: "Book has been updated.", data: book });
    } else {
      res
        .status(404)
        .send({ message: `Book with ID: ${bookID} does not exist.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while updating an book with ID: ${bookID}.`,
    });
  }
});

module.exports = router;
