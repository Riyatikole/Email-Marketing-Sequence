require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const nodeRoutes = require("./routes/node");
const edgeRoutes = require("./routes/edge");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/node", nodeRoutes);
app.use("/api/getnodes", nodeRoutes);
app.use("/api/edges", edgeRoutes);
app.use("/api/getedges", edgeRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});
