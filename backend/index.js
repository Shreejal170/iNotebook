//mongodb://localhost:27017/
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const connectToMongo = require("./db");
const app = express();

(async () => {
  try {
    await connectToMongo();
    console.log("**SUCCESSFULLY CONNECTED**");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
})();

const port = 5000;
app.get("/", (req, res) => {
  res.send("Hello Srizal");
});
app.use(cors());
app.use(express.json()); //middle ware to decode json file
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
