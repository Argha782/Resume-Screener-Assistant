
import "dotenv/config";
import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysisRoutes.js";
import { checkDatabaseConnection } from "./config/database.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-screener-assistant-5sylljd7a-argha-sahas-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json({ limit: "1mb" }));

app.use("/api/analysis", analysisRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Resume Screener API is running" });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Invalid request",
      details: err.issues
    });
  }

  console.error(err.message);

  res.status(500).json({
    error: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await checkDatabaseConnection();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
