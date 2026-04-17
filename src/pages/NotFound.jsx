import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]
                    text-center px-4 gap-3">
      <p className="font-serif text-8xl font-bold text-gray-200 leading-none">404</p>
      <h1 className="text-xl font-bold text-gray-800">Page Not Found</h1>
      <p className="text-sm text-gray-400 mb-3">
        Looks like this friendship doesn't exist yet.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 bg-leaf hover:bg-forest
                   text-white px-5 py-2.5 rounded-lg text-sm font-semibold
                   transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-leaf/30"
      >
        <Home size={15} /> Go Home
      </button>
    </div>
  );
}
