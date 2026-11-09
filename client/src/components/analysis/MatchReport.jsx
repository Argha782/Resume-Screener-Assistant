
import { Check, CircleAlert, CircleHelp } from "lucide-react";
import ScoreBadge from "../common/ScoreBadge";
import { getScoreLabel } from "../../utils/formatDate";

export default function MatchReport({ report }) {
  if (!report) return null;

  const score = report.matchScore;

const scoreColor =
  score >= 80 ? "#10b981" :
  score >= 60 ? "#f59e0b" :
  "#ef4444";

const ringBackground = `conic-gradient(${scoreColor} 0% ${score}%, #292e3a ${score}% 100%)`;

  return (
    <div className="report-wrap">
      <div className="report-heading">
        <div>
          <div className="eyebrow">MATCH REPORT</div>
          <h2>
            {report.candidateName} <span>· {report.role}</span>
          </h2>
        </div>

        <ScoreBadge score={score} />
      </div>

      <div className="panel report-panel">
        <div className="score-summary">
          <div
            className="score-ring"
            style={{
              "--score": `${score}%`,
              background: ringBackground
            }}
          >
            <div>
              <strong style={{ color: scoreColor }}>
                {score}
              </strong>
              <small>OUT OF 100</small>
            </div>
          </div>

          <p>{report.summary}</p>
        </div>

        <div className="report-columns">
          <div>
            <div className="section-label">TOP MATCHING SKILLS</div>
            <div className="skill-list">
              {(report.matchingSkills || []).slice(0, 5).map((skill, i) => (
                <div className="skill-item" key={i}>
                  <Check size={15} />
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-label">GAPS</div>
            <div className="gap-list">
              {(report.skillGaps || []).slice(0, 3).map((gap, i) => (
                <div className="gap-item" key={i}>
                  <CircleAlert size={15} />
                  {gap}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="questions-section">
          <div className="section-label">
            SUGGESTED INTERVIEW QUESTIONS
          </div>

          <div className="question-grid">
            {(report.interviewQuestions || []).slice(0, 3).map((q, i) => (
              <div className="question-card" key={i}>
                <b>
                  <CircleHelp size={14} /> QUESTION {i + 1}
                </b>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
