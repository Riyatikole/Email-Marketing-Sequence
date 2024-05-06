const Edge = require("../models/edgeModel");
const mongoose = require("mongoose");

module.exports.edges = async (req, res) => {
  try {
    const edgesData = req.body;

    const edgesToSave = edgesData.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      user: new mongoose.Types.ObjectId(req.user._id),
    }));

    for (const edge of edgesToSave) {
      const existingEdge = await Edge.findOne({ id: edge.id, user: new mongoose.Types.ObjectId(req.user._id)  });
      if (!existingEdge) {
        await Edge.create(edge);
      }
    }

    res.status(200).json({ message: "Edges saved successfully" });
  } catch (error) {
    console.error("Error saving edges:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getedges = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
   
    const edges = await Edge.find({ user: userId });

    res.status(200).json(edges);
  } catch (error) {
    console.error("Error retrieving nodes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
