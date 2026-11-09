import { LoaderCircle, Sparkles } from "lucide-react";

export default function LoadingButton({ loading, children, ...props }) {
  return <button className="btn primary" disabled={loading} {...props}>
    {loading ? <LoaderCircle className="spin" size={16}/> : <Sparkles size={16}/>}
    {loading ? "Analyzing…" : children}
  </button>;
}