const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// Get all authors
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.firstName != null && req.query.firstName !== "") {
    searchOptions.firstName = new RegExp(req.query.firstName, "i");
  }
  if (req.query.lastName != null && req.query.lastName !== "") {
    searchOptions.lastName = new RegExp(req.query.lastName, "i");
  }
  try {
    let authors = await Author.find(searchOptions);
    res.status(200).send({ data: authors });
  } catch (err) {
    console.log("ERR '/':", err);
    res.status(500).send({
      message: err.message || "An error occurred while obtaining all authors.",
    });
  }
});

// Get an author by ID
router.get("/:id", async (req, res) => {
  let authorID = req.params.id;
  try {
    let author = await Author.findById(authorID);
    if (author) {
      res.status(200).send({ data: author });
    } else {
      res
        .status(404)
        .send({ message: `Author with ID: ${authorID} does not exist.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while obtaining an author with ID: ${authorID}.`,
    });
  }
});

// Create a new author
router.post("/", async (req, res) => {
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  try {
    const newAuthor = await author.save();
    res
      .status(201)
      .send({ message: "Author has been created.", data: newAuthor });
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while creating an author.",
    });
  }
});

// Delete an author by ID
router.delete("/:id", async (req, res) => {
  let authorID = req.params.id;

  try {
    let author = await Author.findById(authorID);
    if (author) {
      await author.remove();
      res
        .status(200)
        .send({ message: `Author with ID: ${authorID} has been deleted.` });
    } else {
      res
        .status(404)
        .send({ message: `Author with ID: ${authorID} does not exist.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while deleting an author with ID: ${authorID}.`,
    });
  }
});

//   Update author by ID
router.patch("/:id", async (req, res) => {
  let authorID = req.params.id;

  try {
    let author = await Author.findById(authorID);
    if (author) {
      if (req.body.firstName) author.firstName = req.body.firstName;
      if (req.body.lastName) author.lastName = req.body.lastName;
      await author.save();
      res
        .status(201)
        .send({ message: "Author has been updates.", data: author });
    } else {
      res
        .status(404)
        .send({ message: `Author with ID: ${authorID} does not exist.` });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `An error occurred while updating an author with ID: ${authorID}.`,
    });
  }
});

module.exports = router;
