export function formatDate(value) {
  return new Date(value).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false
  });
}

export function getScoreLabel(score) {
  if (score >= 80) return "Strong match";
  if (score >= 60) return "Moderate match";
  return "Low match";
}