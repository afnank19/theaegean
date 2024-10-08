import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ respone: "wow" });
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
