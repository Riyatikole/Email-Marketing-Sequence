const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
   source: {
    type: String,
    required: true
    },
   
    target: {
        type: String,
        required: true
    }
});

const Edge = mongoose.model('Edge', edgeSchema);

module.exports = Edge;

