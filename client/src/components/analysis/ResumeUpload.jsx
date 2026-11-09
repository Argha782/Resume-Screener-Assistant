
import { Upload, X, FileText } from "lucide-react";

export default function ResumeUpload({
  value,
  onChange,
  file,
  onFileChange
}) {
  async function handleFile(selectedFile) {
    if (!selectedFile) return;

    const ext = selectedFile.name.split(".").pop().toLowerCase();

    if (!["txt", "md", "pdf", "docx"].includes(ext)) {
      alert("Only PDF, DOCX, TXT and MD files are supported.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      return;
    }

    if (["txt", "md"].includes(ext)) {
      try {
        onChange(await selectedFile.text());
        onFileChange(null);
      } catch {
        alert("Unable to read the selected text file.");
      }
    } else {
      onChange("");
      onFileChange(selectedFile);
    }
  }

  function removeFile() {
    onFileChange(null);
  }

  return (
    <div className="panel document-panel">
      <div className="doc-head">
        <b>Resume</b>

        <label className="upload-btn">
          <Upload size={14} /> Upload
          <input
            type="file"
            accept=".txt,.md,.pdf,.docx"
            hidden
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>

        {file && (
          <div
            title={file.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 9px",
              border: "1px solid var(--border)",
              borderRadius: "7px",
              maxWidth: "220px",
              minWidth: 0
            }}
          >
            <FileText size={14} />

            <span style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "12px"
            }}>
              {file.name}
            </span>

            <button
              type="button"
              onClick={removeFile}
              title="Remove file"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                color: "var(--text)",
                background: "transparent",
                cursor: "pointer",
                padding: "2px",
                flexShrink: 0
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="hint" style={{ marginTop: "8px", marginBottom: "12px" }}>
        PDF, DOCX, TXT or MD — Maximum file size 10 MB
      </div>

      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onFileChange(null);
        }}
        placeholder="Paste candidate resume here..."
      />

      <div className="char-count">
        {file ? `Uploaded: ${file.name}` : `${value.length} characters`}
      </div>
    </div>
  );
}
