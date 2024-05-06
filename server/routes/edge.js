const router = require("express").Router();
const { edges, getedges } = require("../controllers/edgeController")
const {decodeToken} = require("../controllers/authController")

router.post("/", decodeToken, edges);
router.get("/", decodeToken, getedges);

module.exports = router;