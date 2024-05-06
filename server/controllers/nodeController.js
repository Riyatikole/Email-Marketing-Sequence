const Node = require("../models/nodeModel")
const mongoose = require('mongoose');


module.exports.nodes = async (req, res) => {
  
    try {
        const nodesData = req.body;
    
        const savedNodes = [];
    
        // Iterate over each node data
        for (const nodeData of nodesData) {
            // Check if a node with the same ID exists in the database
            const existingNode = await Node.findOne({ id: nodeData.id });
    
            if (existingNode) {
                // If the node exists, update its data and position
                existingNode.data = nodeData.data;
                existingNode.position = nodeData.position;
                existingNode.type = nodeData.type;
    
                const updatedNode = await existingNode.save();
                savedNodes.push(updatedNode);
            } else {
                // If the node doesn't exist, create a new node
                const newNode = new Node({
                    id: nodeData.id,
                    data: nodeData.data,
                    position: nodeData.position,
                    type: nodeData.type,
                    contentType: nodeData.contentType,
                    user: new mongoose.Types.ObjectId(req.user._id)

                });
    
                const savedNode = await newNode.save();
                savedNodes.push(savedNode);
            }
        }
    
        res.status(201).json(savedNodes);
    } catch (error) {
        console.error('Error saving nodes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
}

module.exports.getnodes = async (req, res) => {
    try {
       
        const userId = new mongoose.Types.ObjectId(req.user._id);
        // Retrieve nodes from the database
        const nodes = await Node.find({ user: userId });

        // Send the nodes data as the response
        res.status(200).json(nodes);
    } catch (error) {
        console.error('Error retrieving nodes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}