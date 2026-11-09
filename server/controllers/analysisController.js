
import { randomUUID } from "node:crypto";
import mammoth from "mammoth";

import db from "../config/database.js";
import { analysisInputSchema } from "../validators/analysisSchema.js";
import { generateMatchReport } from "../services/aiService.js";

// Convert MySQL JSON columns into JavaScript arrays.
function serialize(row) {
  if (!row) return null;

  const parseJSON = (value) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  };

  return {
    ...row,
    matchingSkills: parseJSON(row.matchingSkills),
    skillGaps: parseJSON(row.skillGaps),
    interviewQuestions: parseJSON(row.interviewQuestions)
  };
}

// CREATE ANALYSIS
export async function createAnalysis(req, res, next) {
  try {
    let resumeText = req.body.resume || "";
    let pdfBuffer = null;

    // Handle uploaded PDF or DOCX.
    if (req.file) {
      const ext = req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      if (ext === "pdf") {
        pdfBuffer = req.file.buffer;
      } else if (ext === "docx") {
        const extracted = await mammoth.extractRawText({
          buffer: req.file.buffer
        });

        resumeText = extracted.value;
      } else {
        return res.status(400).json({
          error: "Unsupported resume file format."
        });
      }
    }

    // Validate candidate and job details.
    // Validate candidate and job details.
  const input = analysisInputSchema.parse({
    ...req.body,
    resume: pdfBuffer ? "" : resumeText
  }); 

    if (!resumeText.trim() && !pdfBuffer) {
      return res.status(400).json({
        error: "Please provide resume text or upload a resume."
      });
    }

    // Send resume and job description to Gemini.
    const result = await generateMatchReport({
      candidateName: input.candidateName,
      role: input.role,
      jobDescription: input.jobDescription,
      resumeText,
      pdfBuffer
    });

    const analysis = {
      id: randomUUID(),
      candidateName: input.candidateName,
      role: input.role,
      ...result,
      analyzedAt: new Date()
    };

    // Save analysis in MySQL.
    await db.execute(
      `INSERT INTO analysis (
        id,
        candidateName,
        role,
        matchScore,
        summary,
        matchingSkills,
        skillGaps,
        interviewQuestions,
        analyzedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        analysis.id,
        analysis.candidateName,
        analysis.role,
        analysis.matchScore,
        analysis.summary,
        JSON.stringify(analysis.matchingSkills),
        JSON.stringify(analysis.skillGaps),
        JSON.stringify(analysis.interviewQuestions),
        analysis.analyzedAt
      ]
    );

    res.status(201).json({ analysis });

  } catch (error) {
    next(error);
  }
}

// GET ALL ANALYSES
export async function listAnalysis(req, res, next) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM analysis ORDER BY analyzedAt DESC"
    );

    res.json({
      analysis: rows.map(serialize)
    });

  } catch (error) {
    next(error);
  }
}

// GET ANALYSIS BY ID
export async function getAnalysis(req, res, next) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM analysis WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: "Analysis not found"
      });
    }

    res.json({
      analysis: serialize(rows[0])
    });

  } catch (error) {
    next(error);
  }
}

// DELETE ANALYSIS
export async function deleteAnalysis(req, res, next) {
  try {
    const [result] = await db.execute(
      "DELETE FROM analysis WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Analysis not found"
      });
    }

    res.status(204).end();

  } catch (error) {
    next(error);
  }
}
