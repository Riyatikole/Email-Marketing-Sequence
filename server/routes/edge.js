const router = require("express").Router();
const { edges, getedges } = require("../controllers/edgeController")

router.post("/", edges);
router.get("/", getedges);

module.exports = router;