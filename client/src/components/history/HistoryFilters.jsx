import { Search } from "lucide-react";

export default function HistoryFilters({ search, setSearch, minScore, setMinScore, maxScore, setMaxScore }) {
  return <div className="panel filter-panel">
    <div className="search-field"><label className="field-label">SEARCH</label>
      <div className="search-wrap"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Candidate name or role..."/></div>
    </div>
    <div className="score-filter"><label className="field-label">MIN SCORE</label><input type="number" min="0" max="100" value={minScore} onChange={e => setMinScore(e.target.value)}/></div>
    <div className="score-filter"><label className="field-label">MAX SCORE</label><input type="number" min="0" max="100" value={maxScore} onChange={e => setMaxScore(e.target.value)}/></div>
  </div>;
}