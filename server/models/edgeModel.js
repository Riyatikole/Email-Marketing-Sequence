const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const edgeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },

  target: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
  },
});

const Edge = mongoose.model("Edge", edgeSchema);

module.exports = Edge;
