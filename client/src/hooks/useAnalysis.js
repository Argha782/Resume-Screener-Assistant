import { useEffect, useState } from "react";
import { analysisApi } from "../services/api";

export function useAnalysis() {
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const data = await analysisApi.list();
        setAnalysis(data.analysis || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, []);

  return { analysis, loading, error };
}