import { Eye, Search } from "lucide-react";
import ScoreBadge from "../common/ScoreBadge";
import { formatDate } from "../../utils/formatDate";

export default function HistoryTable({ analysis, onView, loading }) {
  if (loading) return <div className="panel empty-state">Loading analysis…</div>;
  return <div className="panel table-panel"><div className="history-table">
    <div className="table-head"><span>Candidate</span><span>Role</span><span>Match score</span><span>Analyzed</span><span/></div>
    {analysis.map(item => <div className="table-row" key={item.id}>
      <b>{item.candidateName}</b>
      <div className="role-cell"><span>{item.role}</span><small>{item.summary}</small></div>
      <div><ScoreBadge score={item.matchScore}/></div>
      <span className="date-cell">{formatDate(item.analyzedAt)}</span>
      <button className="icon-btn" aria-label="View analysis" onClick={() => onView(item.id)}><Eye size={16}/></button>
    </div>)}
    {!analysis.length && <div className="empty-state"><Search size={22}/><b>No analysis found</b><span>Try changing your filters or create a new analysis.</span></div>}
  </div></div>;
}