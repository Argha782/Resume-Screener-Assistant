import "dotenv/config";
import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysisRoutes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/analysis", analysisRoutes);

app.use((err, req, res, next) => {
  if (err.name === "ZodError") return res.status(400).json({ error: "Invalid request", details: err.issues });
  console.error(err.message);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});