import { Component } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // TODO: send to error tracking (Sentry etc.) when backend is live
    console.error("CricSense ErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="font-display text-xl text-white mb-2">Something went wrong</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-xs">
          CricSense hit an unexpected error. Try refreshing or go back home.
        </p>

        {/* Error detail — only in dev */}
        {import.meta.env.DEV && this.state.error && (
          <pre className="text-left text-xs text-red-400 bg-red-500/10 border border-red-500/20
                          rounded-xl p-3 mb-6 max-w-sm w-full overflow-auto max-h-32">
            {this.state.error.message}
          </pre>
        )}

        <div className="flex gap-3">
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                       transition-all active:scale-95"
            style={{ background: "#FF6B2B", color: "#ffffff" }}>
            <RefreshCw size={14} />
            Try Again
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                       transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.06)",
                     color: "#cbd5e1",
                     border: "1px solid rgba(255,255,255,0.1)" }}>
            <Home size={14} />
            Home
          </Link>
        </div>
      </div>
    );
  }
}
