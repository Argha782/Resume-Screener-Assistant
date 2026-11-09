import { useMemo, useState } from "react";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryTable from "../components/history/HistoryTable";
import AnalysisModal from "../components/history/AnalysisModal";
import { useAnalysis } from "../hooks/useAnalysis";
import { analysisApi } from "../services/api";

export default function History() {
  const { analysis, loading, error } = useAnalysis();
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState("0");
  const [maxScore, setMaxScore] = useState("100");
  const [selected, setSelected] = useState(null);
  const [modalError, setModalError] = useState("");

  const filtered = useMemo(() => analysis.filter(item => {
    const q = search.toLowerCase();
    return (!q || `${item.candidateName} ${item.role}`.toLowerCase().includes(q)) &&
      item.matchScore >= (Number(minScore) || 0) && item.matchScore <= (Number(maxScore) || 100);
  }), [analysis, search, minScore, maxScore]);

  async function viewAnalysis(id) {
    setModalError("");
    try {
      const data = await analysisApi.getById(id);
      setSelected(data.analysis);
    } catch (err) {
      setModalError(err.message);
    }
  }

  return <section>
    <div className="eyebrow">ARCHIVE</div><h1>History</h1>
    <p className="lead">Every analysis is saved automatically. Search by candidate or role, or filter by score range.</p>
    <HistoryFilters {...{search,setSearch,minScore,setMinScore,maxScore,setMaxScore}}/>
    {error && <div className="error-banner">{error}</div>}
    {modalError && <div className="error-banner">{modalError}</div>}
    <HistoryTable analysis={filtered} loading={loading} onView={viewAnalysis}/>
    <AnalysisModal report={selected} onClose={() => setSelected(null)}/>
  </section>;
}