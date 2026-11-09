
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateForm from "../components/analysis/CandidateForm";
import JobDescriptionInput from "../components/analysis/JobDescriptionInput";
import ResumeUpload from "../components/analysis/ResumeUpload";
import LoadingButton from "../components/common/LoadingButton";
import { analysisApi } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setError("");

    if (
      !candidateName.trim() ||
      !role.trim() ||
      !jobDescription.trim() ||
      (!resume.trim() && !resumeFile)
    ) {
      setError(
        "Please complete candidate name, role, job description and resume."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("candidateName", candidateName.trim());
      formData.append("role", role.trim());
      formData.append("jobDescription", jobDescription.trim());

      if (resumeFile) {
        formData.append("resume", resumeFile);
      } else {
        formData.append("resume", resume);
      }

      const result = await analysisApi.create(formData);

      navigate(`/report/${result.analysis.id}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        "Unable to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="eyebrow">SCREENING</div>

      <h1>New match analysis</h1>

      <p className="lead">
        Enter candidate details, paste the job description and provide a
        candidate resume. The assistant generates a match report and saves
        it to your history.
      </p>

      <div className="candidate-wrap">
        <CandidateForm
          candidateName={candidateName}
          setCandidateName={setCandidateName}
          role={role}
          setRole={setRole}
        />
      </div>

      <div className="input-grid">
        <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
        />

        <ResumeUpload
          value={resume}
          onChange={setResume}
          file={resumeFile}
          onFileChange={setResumeFile}
        />
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="actions">
        <LoadingButton
          loading={loading}
          onClick={handleAnalyze}
        >
          Analyze match
        </LoadingButton>
      </div>
    </section>
  );
}
