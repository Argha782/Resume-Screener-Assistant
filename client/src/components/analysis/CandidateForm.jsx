export default function CandidateForm({ candidateName, setCandidateName, role, setRole }) {
  return <div className="panel candidate-panel">
    <label className="field-label">CANDIDATE NAME</label>
    <input value={candidateName} onChange={e => setCandidateName(e.target.value)} placeholder="Candidate name"/>
    <label className="field-label role-label">JOB ROLE</label>
    <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer"/>
  </div>;
}