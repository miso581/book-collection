const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
