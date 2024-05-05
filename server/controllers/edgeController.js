const Edge = require("../models/edgeModel")

module.exports.edges = async (req, res) => {
    try {
        const edgesData = req.body;

        // Assuming req.body is an array of edge objects
        const edgesToSave = edgesData.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target
        }));

        // Assuming Edge is your Mongoose model
        for (const edge of edgesToSave) {
            const existingEdge = await Edge.findOne({ id: edge.id });
            if (!existingEdge) {
                await Edge.create(edge);
            }
        }

        res.status(200).json({ message: 'Edges saved successfully' });
    } catch (error) {
        console.error('Error saving edges:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports.getedges = async (req, res) => {
    try {
        // Retrieve nodes from the database
        const edges= await Edge.find();

        // Send the nodes data as the response
        res.status(200).json(edges);
    } catch (error) {
        console.error('Error retrieving nodes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}