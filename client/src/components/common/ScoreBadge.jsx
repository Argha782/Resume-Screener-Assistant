import { getScoreLabel } from "../../utils/formatDate";

export default function ScoreBadge({ score }) {
  const tone = score >= 80 ? "good" : score >= 60 ? "mid" : "low";
  return <span className={`score-pill ${tone}`}>{score} · {getScoreLabel(score)}</span>;
}