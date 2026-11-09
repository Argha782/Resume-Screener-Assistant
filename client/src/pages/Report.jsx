import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MatchReport from "../components/analysis/MatchReport";
import { analysisApi } from "../services/api";
import { formatDate } from "../utils/formatDate";

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    analysisApi.getById(id).then(data => setReport(data.analysis)).catch(err => setError(err.message));
  }, [id]);

  return <section>
    <button className="back-link" onClick={() => navigate("/history")}><ArrowLeft size={15}/> Back to history</button>
    {error && <div className="error-banner">{error}</div>}
    {!report && !error && <div className="panel empty-state">Loading report…</div>}
    {report && <><MatchReport report={report}/><div className="report-footer"><span>Analyzed {formatDate(report.analyzedAt)}</span></div></>}
  </section>;
}