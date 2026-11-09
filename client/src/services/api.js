import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const analysisApi = {
  create: async (formData) => {
    const { data } = await api.post("/analysis", formData);
    return data;
  },

  list: async () => {
    const { data } = await api.get("/analysis");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/analysis/${id}`);
    return data;
  },

  delete: async (id) => {
    await api.delete(`/analysis/${id}`);
  }
};