import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useUserProfile } from "./hooks/useUserProfile";

import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import StatsPage from "./pages/StatsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CommentaryPage from "./pages/CommentaryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";


// ─── Scroll To Top on Route Change ───────────────────────────────────────────
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

// ─── Auth Context ─────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

// ─── Protected Route ──────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <FullPageSpinner />;
  return currentUser ? children : <Navigate to="/login" replace />;
};

// ─── Public Only Route ────────────────────────────────────────────────────────
const PublicOnlyRoute = ({ children, fallback = null }) => {
  const { currentUser, loading, needsTeamSetup } = useAuth();
  if (loading) return <FullPageSpinner />;
  if (currentUser && !needsTeamSetup) return fallback ? fallback : <Navigate to="/" replace />;
  return children;
};

// ─── Full Page Spinner ────────────────────────────────────────────────────────
const FullPageSpinner = () => (
  <div className="min-h-screen bg-base flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser]       = useState(null);
  const [loading, setLoading]               = useState(true);
  const [needsTeamSetup, setNeedsTeamSetup] = useState(false);

  const { profile, setProfile } = useUserProfile(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      profile,
      setProfile,
      needsTeamSetup,
      setNeedsTeamSetup,
    }}>
      <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>

          {/* ── Root: Landing for guests, /home for logged-in ── */}
          <Route path="/" element={
            <PublicOnlyRoute fallback={<Navigate to="/home" replace />}>
              <LandingPage />
            </PublicOnlyRoute>
          } />

          {/* ── With navbar + footer ── */}
          <Route element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="commentary" element={<CommentaryPage />} />
            <Route
              path="profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ── Full screen — no navbar ── */}
          <Route path="/match/:id" element={<MatchPage />} />
          <Route path="/match/:id/chat" element={<ChatPage />} />
          <Route path="/login"    element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
    </AuthContext.Provider>
  );
}
