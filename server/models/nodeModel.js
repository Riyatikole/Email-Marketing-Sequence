const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const nodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  data: {
    label: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        
      },
  },
  position: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  type: {
    type: String,
    // required: true
  },
  contentType: {
    type: String,
    // required: true
  },
  user: {
    type: ObjectId,
    required: true,
  },
});

const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
