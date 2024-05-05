const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    data: {
        label: {
            type: String,
            required: true
        }
    },
    position: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    },
    type: {
        type: String,
        // required: true
    }
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
