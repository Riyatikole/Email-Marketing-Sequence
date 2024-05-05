const router = require("express").Router();
const { nodes, getnodes } = require("../controllers/nodeController")

router.post("/", nodes);
router.get("/", getnodes);


module.exports = router;