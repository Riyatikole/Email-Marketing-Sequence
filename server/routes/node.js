const router = require("express").Router();
const { nodes, getnodes } = require("../controllers/nodeController")
const {decodeToken} = require("../controllers/authController")

router.post("/", decodeToken, nodes);
router.get("/", decodeToken, getnodes);


module.exports = router;