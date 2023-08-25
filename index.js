import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello Book My Stay!");
});

app.listen(port, () => {
  console.log(`Book My Stay server in running on ${port}`);
});
