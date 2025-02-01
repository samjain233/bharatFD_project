import "dotenv/config";
import express from "express";
import connectDB from "./db/conn.js";

connectDB();
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import api from "./routes/api.route.js";
app.use("/api", api);

app.get("/", (req, res) => {
  res.json({ hello: "sam" });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("app listening on port : " + port);
});
