const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to the Book collection API!" });
  } catch (err) {
    console.log("ERR '/':", err);
    res.status(500).send();
  }
});

module.exports = router;
