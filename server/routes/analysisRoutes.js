import { Router } from "express";
import { createAnalysis, deleteAnalysis, getAnalysis, listAnalysis } from "../controllers/analysisController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post(
  "/",
  upload.single("resume"),
  createAnalysis
);

router.get("/", listAnalysis);
router.get("/:id", getAnalysis);
router.delete("/:id", deleteAnalysis);
export default router;