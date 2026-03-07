import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6">🏏</div>
      <h1 className="text-6xl font-display text-orange-400 mb-2">404</h1>
      <p className="text-2xl font-display text-white mb-3">Bowled Out!</p>
      <p className="text-gray-400 mb-8 max-w-sm">
        This page got caught at the boundary. The Oracle didn't predict this one.
      </p>
      <Link to="/" className="btn-primary">Back to Homepage</Link>
    </div>
  );
}