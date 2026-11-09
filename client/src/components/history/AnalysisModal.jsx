import { X } from "lucide-react";
import MatchReport from "../analysis/MatchReport";

export default function AnalysisModal({ report, onClose }) {
  if (!report) return null;
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="modal"><div className="modal-title"><b>Saved analysis</b><button className="close-btn" onClick={onClose}><X size={18}/></button></div>
      <div className="modal-scroll"><MatchReport report={report}/></div>
    </div>
  </div>;
}