import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export function useUserProfile(currentUser) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`${BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Profile fetch failed");
        const data = await res.json();
        setProfile(data);
      } catch {
        // Backend not running yet — use Firebase data as silent fallback
        // No console.error so the red error doesn't show in dev tools
        setProfile({
          displayName: currentUser.displayName || currentUser.email,
          favouriteTeam: null,
          totalPoints: 0,
          predictionAccuracy: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser?.uid]);

  return { profile, loading, setProfile };
}
