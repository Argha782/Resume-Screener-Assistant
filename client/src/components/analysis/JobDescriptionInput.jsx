
export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="panel document-panel">
      <div className="doc-head">
        <b>Job description</b>
      </div>

      <div
        className="hint"
        style={{ marginTop: "8px", marginBottom: "12px" }}
      >
        Paste the job description below
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste job description here..."
      />

      <div className="char-count">
        {value.length} characters
      </div>
    </div>
  );
}

